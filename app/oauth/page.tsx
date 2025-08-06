'use client'

import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { ACCESS_TOKEN } from '@/constant/storageName'

const OAuthPage = () => {
  const router = useRouter()
  const getCode = async () => {
    const code = new URLSearchParams(window.location.search).get('code')

    // 서버에 code 보내기
    if (code) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })

      const data = await response.json()
      console.log('data', data)

      if (response.status === 200 || response.status === 201) {
        localStorage.setItem(ACCESS_TOKEN, data.data[0].access_token)
        router.replace('/')
      } else {
        throw new Error('Failed to authenticate with OAuth')
      }
    } else {
      if (confirm('로그인에 실패했습니다. 다시 시도해주세요.')) {
        router.replace('/signin')
      }
    }
  }

  useEffect(() => {
    getCode()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <CircularProgress />
    </div>
  )
}

export default OAuthPage
