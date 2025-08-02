import styled from "styled-components";
import { useRouter } from "next/navigation";
import ScoreLabel from "./ScoreLabel";
import MainBase from "./MainBase";
import SCORE from "@/constant/score";

const QuizMain = () => {
  const router = useRouter();

  return (
    <MainBase
      chipTitle="매일"
      path="/quiz"
      title="자전거 안전 퀴즈"
      scoreText={`최대 ${SCORE.QUIZ_CORRECT + SCORE.HAS_SEEN_EXPLANATION}점`}
    />
  );
};

export default QuizMain;
