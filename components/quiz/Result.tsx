import { QuizStatus } from "@/app/quiz/page";
import Button from "../common/Button";
import { QUIZ_STATUS } from "@/constant/quiz";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import updateScore from "@/apis/user/updateScore";
import { HAS_SEEN_EXPLANATION } from "@/constant/storageName";
import { useState } from "react";

interface Props {
  status: QuizStatus;
  setStatus: (status: QuizStatus) => void;
}

const Result = ({ status, setStatus }: Props) => {
  const router = useRouter();
  const [showCommentary, setShowCommentary] = useState(false);

  const onClickCommentary = async () => {
    console.log("onClickCommentary called");
    setShowCommentary(!showCommentary);
    // Assuming you want to navigate to the commentary page
    const res = localStorage.getItem(HAS_SEEN_EXPLANATION);

    if (res == dayjs().format("YYYY-MM-DD")) {
      console.log("res", res, dayjs().format("YYYY-MM-DD"));
      return;
    } else {
      localStorage.setItem(HAS_SEEN_EXPLANATION, dayjs().format("YYYY-MM-DD"));
      // Navigate to the commentary page or perform any other action
      console.log("Navigating to commentary page");
      await updateScore(5);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center justify-center">
        <div className="text-8xl font-bold">
          {status === QUIZ_STATUS.CORRECT ? "O" : "X"}
        </div>
        <p className="mt-4 text-2xl font-bold">
          {status === QUIZ_STATUS.CORRECT ? "정답입니다!" : "오답입니다!"}
        </p>
        <p className="mt-2 text-lg">
          {status === QUIZ_STATUS.CORRECT
            ? "5점 적립 완료"
            : "다음 기회에 적립을 도전하세요!"}
        </p>
        <div className="mt-4">
          <div className="cursor-pointer" onClick={onClickCommentary}>
            {showCommentary ? "▲" : "▼"} 오늘의 자전거 안전 퀴즈 해설 확인하기
          </div>
          {showCommentary && (
            <div>
              ‘러브 버그’는 암수 한 쌍이 함께 붙어 다니는! <br />
              00000
              <br /> 0000
              <br /> 00
            </div>
          )}
        </div>
        {/* <div className="flex items-center mt-8 gap-4 flex-row">
          <Button onClick={() => router.push("/")}>홈으로 돌아가기</Button>
          <Button onClick={onClickCommentary}>해설 보러가기 (+5점)</Button>
        </div> */}
      </div>
    </div>
  );
};

export default Result;
