import { QuizStatus } from "@/app/quiz/page";
import Button from "../common/Button";
import { QUIZ_STATUS } from "@/constant/quiz";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import updateScore from "@/apis/user/updateScore";
import { HAS_SEEN_EXPLANATION } from "@/constant/storageName";
import { useEffect, useState } from "react";
import BubbleChat from "../common/BubbleChat";
import ButtonModal from "../common/ButtonModal";

interface Props {
  status: QuizStatus;
  setStatus: (status: QuizStatus) => void;
}

const Result = ({ status, setStatus }: Props) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const onClickCommentary = async () => {
    setShowModal(true);
    const res = localStorage.getItem(HAS_SEEN_EXPLANATION);

    if (res == dayjs().format("YYYY-MM-DD")) {
      console.log("res", res, dayjs().format("YYYY-MM-DD"));
      return;
    } else {
      localStorage.setItem(HAS_SEEN_EXPLANATION, dayjs().format("YYYY-MM-DD"));

      await updateScore(5);
      setShowModal(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full relative w-full">
      <ButtonModal
        isOpen={showModal}
        title="퀴즈 해설을 확인하고 추가 점수를 받으세요!"
        buttonText="자전거 레벨 점수 내역 보러가기"
        contents={[
          "추가 점수 5점이 자동 지급됩니다. (홈 > 자전거 레벨 점수 내역)",
          "추가 점수는 문제당 1회 지급됩니다.(최초 1회만 점수 인정)",
        ]}
        onClickButton={() => {
          setShowModal(false);
        }}
      />

      <div className="flex flex-col items-center justify-center py-10 mt-3 border-2 border-gray-lightest bg-white w-full ">
        <div
          className={`text-[160px] font-bold w-[200px] h-[200px] border-2 rounded-2xl flex items-center justify-center border-black ${status === QUIZ_STATUS.CORRECT ? "text-primary" : "text-error"}`}
        >
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
        <div className="w-full flex flex-col items-center justify-center">
          <button
            className="p-2 px-6 bg-black text-white rounded-full my-4 cursor-pointer"
            onClick={onClickCommentary}
          >
            퀴즈 해설 확인하기
          </button>
        </div>
        <div className="text-center">
          [퀴즈 해설 확인하기] 추가 점수는 문제당 1회 지급됩니다.
          <br />
          (버튼을 누른 최초 1회만 점수 인정)
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
