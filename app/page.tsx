"use client";

import { Box, Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import styled from "styled-components";

export default function Home() {
  const router = useRouter();

  return (
    <Container>
      <RewardMain>
        리워드
        <Button onClick={() => router.push("/reward/guide")}>
          자전거 타기 레벨 안내
        </Button>
        <Button onClick={() => router.push("/reward")}>
          자전거 타기 레벨 점수 내역
        </Button>
      </RewardMain>
      <Stack flexDirection="row" gap="16px">
        <BikeLogMain onClick={() => router.push("/bikelog")}>
          자전거 타기 인증
        </BikeLogMain>
        <Stack flex="1" gap="16px">
          <QuizMain onClick={() => router.push("/quiz")}>
            오늘의 안전퀴즈
          </QuizMain>
          <CourseMain onClick={() => router.push("/course")}>
            코스 추천
          </CourseMain>
        </Stack>
      </Stack>
      <NewsMain onClick={() => router.push("/news")}>새 소식</NewsMain>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: lemonchiffon;
  width: 100%;
  height: 100%;
  gap: 24px;
`;

const Base = styled.div`
  border-radius: 30px;
  background-color: skyblue;
  min-height: 200px;
  flex: 1;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RewardMain = styled(Base)`
  cursor: default;
`;

const BikeLogMain = styled(Base)``;

const QuizMain = styled(Base)``;

const NewsMain = styled(Base)``;

const CourseMain = styled(Base)``;
