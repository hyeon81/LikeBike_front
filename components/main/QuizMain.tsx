import styled from "styled-components";
import { useRouter } from "next/navigation";
import ScoreLabel from "./ScoreLabel";
import MainBase from "./MainBase";

const QuizMain = () => {
  const router = useRouter();

  return (
    <MainBase
      bgcolor="#00B493"
      chipTitle="주 1회"
      path="/quiz"
      title="자전거 안전 퀴즈"
    />
  );
};

export default QuizMain;
