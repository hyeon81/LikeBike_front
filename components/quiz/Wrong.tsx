import { QuizStatus } from "@/app/quiz/page";
import { QUIZ_STATUS } from "@/constant/quiz";
import Button from "../common/Button";

interface Props {
  setStatus: (status: QuizStatus) => void;
}

const Wrong = ({ setStatus }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-8xl font-bold">X</div>
      <p className="mt-4 text-2xl font-bold">오답입니다 ㅠㅠ</p>
      <p className="mt-2 text-lg">다음 기회에 적립을 도전하세요! </p>
      <div className="flex items-center mt-8 gap-4 flex-row">
        <Button onClick={() => setStatus(QUIZ_STATUS.QUIZ)}>다시 풀기</Button>
        <Button onClick={() => setStatus(QUIZ_STATUS.COMMENTARY)}>
          해설 보러가기
        </Button>
      </div>
    </div>
  );
};

export default Wrong;
