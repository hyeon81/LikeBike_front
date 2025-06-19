import styled from "styled-components";
import ScoreLabel from "./ScoreLabel";
import { useRouter } from "next/navigation";

const MainBase = ({
  title,
  chipTitle,
  bgcolor,
  path,
}: {
  title: string;
  chipTitle: string;
  bgcolor: string;
  path: string;
}) => {
  const router = useRouter();

  return (
    <MainBaseContainer onClick={() => router.push(path)} bgcolor={bgcolor}>
      <ScoreLabel />
      <Chip>{chipTitle}</Chip>
      <Title>{title}</Title>
    </MainBaseContainer>
  );
};

export default MainBase;

export const MainBaseContainer = styled.div<{ bgcolor?: string }>`
  border-radius: 30px;
  background-color: ${(props) => props.bgcolor};
  flex: 1;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100px;
  position: relative;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
`;

const Chip = styled.div`
  background-color: #ffffff;
  padding: 3px 9px;
  border-radius: 30px;
  font-size: 12px;
`;
