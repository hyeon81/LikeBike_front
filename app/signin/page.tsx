'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'

export default function Home() {
  const router = useRouter()

  return (
    <Container>
      <Image alt="logo" height={36} src="/images/logo.svg" width={231} />
      <ImageContainer
        onClick={() => {
          const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${window.location.origin}/oauth&response_type=code`
          if (kakaoLoginUrl) {
            window.location.href = kakaoLoginUrl
          } else {
            console.error('Kakao login URL is not defined.')
          }
        }}
      >
        <Image alt="login" fill src="/images/kakao_login_medium_wide.png" />
      </ImageContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;

  gap: 24px;
`

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  min-height: 45px;
  background-color: #f0f0f0;
  position: relative;
  cursor: pointer;
`
