import { QuizStatus } from "@/app/quiz/page";
import Button from "../common/Button";
import { QUIZ_STATUS } from "@/constant/quiz";

interface Props {
  setStatus: (status: QuizStatus) => void;
}

const Correct = ({ setStatus }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <p className="mt-4 text-2xl font-bold">정답입니다!</p>
      <div className="flex items-center mt-8 gap-4 flex-row">
        <Button onClick={() => setStatus(QUIZ_STATUS.COMMENTARY)}>
          홈으로 돌아가기
        </Button>
        <Button onClick={() => setStatus(QUIZ_STATUS.RESULT)}>
          해설 보러가기
        </Button>
      </div>
    </div>
  );
};

export default Correct;
