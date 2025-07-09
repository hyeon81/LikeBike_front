import axios from "axios";

const ID = "22757842371d801ea0ddc7682fa53297";
const URL = `https://api.notion.com/v1/databases/${ID}/query`;

//Authorization: Bearer <secret_bot>

export default async function Home() {
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NOTION_SECRET_KEY}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify({}),
  });

  const data = await res.json();

  const titles = data.results.map((page: any) => {
    const properties = page.properties;
    console.log("properties", properties);
    // 제목 필드 이름 확인 (Title, 제목 등 상황에 따라 다름)
    const titleProp =
      properties.Title || properties.제목 || properties.name || properties.Name;

    if (!titleProp || titleProp.type !== "title") return "(제목 없음)";

    // 여러 개일 수도 있으니 map 처리
    return titleProp.title.map((t: any) => t.plain_text).join("");
  });

  console.log("titles", titles);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>제목</th>
            <th>생성일</th>
          </tr>
        </thead>
        {
          <tbody>
            <tr>
              <td>김철수</td>
              <td>30</td>
            </tr>
          </tbody>
        }
      </table>
    </div>
  );
}

/**
 * {
  object: 'database',
  id: '22757842-371d-801e-a0dd-c7682fa53297',
  cover: null,
  icon: null,
  created_time: '2025-07-05T06:53:00.000Z',
  created_by: { object: 'user', id: '227d872b-594c-81c7-bff8-0002ee32f706' },
  last_edited_by: { object: 'user', id: '227d872b-594c-81c7-bff8-0002ee32f706' },
  last_edited_time: '2025-07-07T16:00:00.000Z',
  title: [
    {
      type: 'text',
      text: [Object],
      annotations: [Object],
      plain_text: '새 소식',
      href: null
    }
  ],
  description: [],
  is_inline: false,
  properties: {
    '생성일': { id: 'GUoy', name: '생성일', type: 'created_time', created_time: {} },
    '썸네일': { id: '%5Bxke', name: '썸네일', type: 'files', files: {} },
    '제목': { id: 'title', name: '제목', type: 'title', title: {} }
  },
  parent: { type: 'page_id', page_id: '22957842-371d-807f-93cd-d2f211a065e9' },
  url: 'https://www.notion.so/22757842371d801ea0ddc7682fa53297',
  public_url: null,
  archived: false,
  in_trash: false,
  request_id: 'cc395629-bea5-459a-a0fb-37ce35c344f6'
}
 */
