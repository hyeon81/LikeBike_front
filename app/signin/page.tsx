"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";

export default function Home() {
  const router = useRouter();

  return (
    <Container>
      <Image src="/images/logo.svg" alt="logo" width={231} height={36} />
      <ImageContainer
        onClick={() => {
          router.push("/");
        }}
      >
        <Image alt="login" src={"/images/kakao_login_medium_wide.png"} fill />
      </ImageContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;

  gap: 24px;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  min-height: 45px;
  background-color: #f0f0f0;
  position: relative;
  cursor: pointer;
`;
