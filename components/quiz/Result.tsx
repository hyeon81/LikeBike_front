import { QuizStatus } from "@/app/quiz/page";
import Button from "../common/Button";
import { QUIZ_STATUS } from "@/constant/quiz";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import updateScore from "@/apis/user/updateScore";

interface Props {
  status: QuizStatus;
  setStatus: (status: QuizStatus) => void;
}

const hasSeenExplanation = "hasSeenExplanation";
const Result = ({ status, setStatus }: Props) => {
  const router = useRouter();

  const onClickCommentary = async () => {
    setStatus(QUIZ_STATUS.COMMENTARY);
    // Assuming you want to navigate to the commentary page
    const res = localStorage.getItem(hasSeenExplanation);

    if (res === dayjs().format("YYYY-MM-DD")) {
      return;
    } else {
      localStorage.setItem(hasSeenExplanation, dayjs().format("YYYY-MM-DD"));
      // Navigate to the commentary page or perform any other action
      await updateScore(5);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center justify-center">
        <div className="text-8xl font-bold"></div>
        <p className="mt-4 text-2xl font-bold">
          {status === QUIZ_STATUS.CORRECT ? "정답입니다!" : "오답입니다!"}
        </p>
        <p className="mt-2 text-lg">
          {status === QUIZ_STATUS.CORRECT
            ? "5점 적립 완료"
            : "다음 기회에 적립을 도전하세요!"}
        </p>
        <div className="flex items-center mt-8 gap-4 flex-row">
          <Button onClick={() => router.push("/")}>홈으로 돌아가기</Button>
          <Button onClick={onClickCommentary}>해설 보러가기 (+5점)</Button>
        </div>
      </div>
    </div>
  );
};

export default Result;
