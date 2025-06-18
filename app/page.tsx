"use client";

import BikeLogMain from "@/components/main/BikeLogMain";
import CourseMain from "@/components/main/CourseMain";
import NewsMain from "@/components/main/NewsMain";
import QuizMain from "@/components/main/QuizMain";
import RewardMain from "@/components/main/RewardMain";
import { Box, Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import styled from "styled-components";

export default function Home() {
  const router = useRouter();

  return (
    <Container>
      <RewardMain />
      <Stack flexDirection="row" gap="16px" height={"100%"}>
        <BikeLogMain />
        <Stack flex="1" gap="16px">
          <QuizMain />
          <CourseMain />
        </Stack>
      </Stack>
      <NewsMain />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 24px;
`;
