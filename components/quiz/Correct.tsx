import { QuizStatus } from "@/app/quiz/page";
import Button from "../common/Button";
import { QUIZ_STATUS } from "@/constant/quiz";

interface Props {
  setStatus: (status: QuizStatus) => void;
}

const Correct = ({ setStatus }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold text-red-600">정답 입니다~~</h1>
      <p className="mt-4 text-lg text-gray-700">
        안전 지식 하나 추가요~! 맞추신 문제 잊지마시고, 평소 라이딩 생활에서도
        꼭 지켜주세요^0^
      </p>
      <div className="flex flex-col items-center mt-8 gap-4 flex-row">
        <Button onClick={() => setStatus(QUIZ_STATUS.COMMENTARY)}>
          정답 해설 확인하기
        </Button>
        <Button onClick={() => setStatus(QUIZ_STATUS.RESULT)}>
          적립 포인트 확인하기
        </Button>
      </div>
    </div>
  );
};

export default Correct;
