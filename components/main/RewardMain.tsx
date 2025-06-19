import { Box, Button, Stack } from "@mui/material";
import styled from "styled-components";
import { MainBaseContainer } from "./MainBase";
import Image from "next/image";
import { useRouter } from "next/navigation";

const RewardMain = () => {
  const router = useRouter();
  return (
    <Container>
      <ContentText>
        <span>권호정</span> 님의 자전거 타기 레벨은 <span>관심인</span> 입니다.
      </ContentText>

      <LevelBox>
        <Level percentage={50} opacity={0.5} />
      </LevelBox>
      <Stack
        flexDirection={"row"}
        gap={"16px"}
        width={"100%"}
        marginTop={"16px"}
      >
        <RewardButton
          onClick={() => router.push("/reward/guide")}
          bgcolor="#969696"
        >
          <Image
            src={"/icons/notice.svg"}
            alt="notice"
            width={16}
            height={16}
          />
          <Box textAlign={"center"}>자전거 타기 레벨 안내</Box>
        </RewardButton>
        <RewardButton onClick={() => router.push("/reward")} bgcolor="#00B493">
          자전거 타기 레벨 점수 내역
        </RewardButton>
      </Stack>
    </Container>
  );
};

export default RewardMain;

const Container = styled(MainBaseContainer)`
  cursor: default;
  padding: 32px;
  background-color: rgba(230, 230, 230, 0.4);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContentText = styled.div`
  margin-bottom: 16px;
  font-weight: 500;

  span {
    text-decoration: underline;
  }
`;

const LevelBox = styled.div`
  width: 100%;
  height: 5vh;
  background-color: white;
  border: 1px solid black;
`;

const Level = styled.div<{ percentage: number; opacity: number }>`
  width: ${(props) => props.percentage}%;
  height: 100%;
  background-color: ${(props) => `rgba(0, 180, 147, ${props.opacity})`};
  border-right: 1px solid black;
`;

const RewardButton = styled(Button)<{ bgcolor: string }>`
  width: 100%;
  height: 100%;
  border-radius: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: white;
  background-color: ${(props) => props.bgcolor};
  font-size: 12px;
`;
