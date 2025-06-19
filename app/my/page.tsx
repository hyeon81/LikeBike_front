"use client";

import { COLORS } from "@/constant/color";
import { Avatar, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";

export default function Home() {
  const router = useRouter();

  return (
    <Container>
      <InfoContainer>
        <Avatar />
        <Stack flexDirection="column">
          <Typography variant="body1">이름</Typography>
          <Typography color={COLORS.GRAY_DARK} variant="body2">
            이메일
          </Typography>
        </Stack>
      </InfoContainer>
      <Divider />
      <ButtonContainer
        onClick={() => {
          router.push("/my/setting");
        }}
      >
        <Image src="/icons/setting.svg" alt="setting" width={24} height={24} />
        <Typography>설정</Typography>
      </ButtonContainer>
      <ButtonContainer>
        <Image src="/icons/exit.svg" alt="logout" width={24} height={24} />
        <Typography>로그아웃</Typography>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 8px;
  padding-top: 16px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 12px;
  cursor: pointer;
`;
