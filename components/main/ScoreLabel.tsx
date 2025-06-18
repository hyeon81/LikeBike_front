import Image from "next/image";
import styled from "styled-components";

const ScoreLabel = () => {
  return (
    <Container>
      <Image src={"/icons/union.svg"} width={54} height={41} alt="union" />
      <Label>+10점</Label>
    </Container>
  );
};

export default ScoreLabel;

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: -4px;
  right: 28px;
`;

const Label = styled.div`
  position: absolute;
  top: 8px;
  color: #ffffff;
  font-size: 12px;
`;
