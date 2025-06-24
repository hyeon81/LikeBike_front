"use client";

import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export default function Home() {
  return (
    <Container>
      <div>
        <Title>오늘도 안전 퀴즈 풀고 안전한 자전거 생활 지키기</Title>
        <div>
          평소 자전거 안전 지식을 점검하고, 퀴즈를 통해 새로운 지식을 쌓아가요!
          포인트는 덤~!
        </div>
        <Link href="/quiz/start" style={{ textDecoration: "none" }}>
          <Button variant="contained">시작</Button>
        </Link>
      </div>
    </Container>
  );
}

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1;
  gap: 16px;
`;
