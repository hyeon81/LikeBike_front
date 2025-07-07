import { QUIZ_STATUS, QuizStatus } from "@/app/quiz/page";
import { Button } from "@mui/material";

interface Props {
  setStatus: (status: QuizStatus) => void;
}

const Wrong = ({ setStatus }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold">오답입니다.</h1>
      <p className="mt-4 text-lg text-gray-700">
        안타깝게도 고르신 번호는 정답이 아닙니다... 한 번 더 문제를 풀어보시는
        건 어떨까요?
      </p>
      <div className="flex flex-col items-center mt-8 gap-4 flex-row">
        <Button onClick={() => setStatus(QUIZ_STATUS.QUIZ)}>다시 풀기</Button>
        <Button onClick={() => setStatus(QUIZ_STATUS.COMMENTARY)}>
          해설 보기
        </Button>
      </div>
    </div>
  );
};

export default Wrong;
