import { NextResponse } from 'next/server'

const ID = '22757842371d801ea0ddc7682fa53297'
const PATH = `https://api.notion.com/v1/databases/${ID}/query`

export interface NewsItem {
  title: string
  url: string
  thumbnail: string | null
  createdTime: string | null
  id: string
}

export async function GET() {
  try {
    const response = await fetch(PATH, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NOTION_SECRET_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({}),
    })

    const data = await response.json()

    const news: NewsItem[] = data?.results
      ?.map((page: any) => {
        if (!page) return undefined

        const properties = page.properties

        const titleProp = properties.제목
        if (!titleProp || titleProp.type !== 'title')
          return {
            title: '(제목 없음)',
            url: page.url,
            thumbnail: null,
            createdTime: null,
            id: page.id,
          }

        const title = titleProp.title.map((t: any) => t.plain_text).join('')

        const thumbnailProp = properties.썸네일 || properties.thumbnail
        let thumbnail: string | null = null
        if (
          thumbnailProp &&
          thumbnailProp.type === 'files' &&
          thumbnailProp.files.length > 0
        ) {
          thumbnail = thumbnailProp.files[0].file?.url || null
        }

        return {
          title,
          url: page.url,
          thumbnail,
          createdTime: properties.생성일?.created_time || null,
          id: page.id,
        }
      })
      .filter(Boolean)

    return NextResponse.json(news, { status: 200 })
  } catch (error) {
    console.error('Error fetching news from Notion:', error)
    return NextResponse.json(
      { error: 'Failed to fetch news from Notion' },
      { status: 500 },
    )
  }
}
