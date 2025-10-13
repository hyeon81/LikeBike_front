import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";

import { IQuiz, QUIZ_TYPE } from "@/types/quiz";

import Button from "../common/Button";
import SelectQuestion from "./SelectQuestion";
import InputQuestion from "./InputQuestion";
import OXQuestion from "./OXQuestion";

const Quiz = ({
  quiz,
  handleClick,
}: {
  quiz: IQuiz | undefined;
  handleClick: (selectedValue: string) => void;
}) => {
  const [answer, setAnswer] = useState("");
  const quizType: QUIZ_TYPE = QUIZ_TYPE.INPUT;

  // if (!quiz) {
  //   return <div className="pt-4">오늘의 퀴즈가 게시되지 않았습니다.</div>;
  // }

  console.log("quiz", quiz);
  return (
    <div className="h-full flex flex-col">
      <div className="bg-secondary-light w-full flex flex-col items-center justify-center p-4 mt-4 text-2xl font-bold default-border ">
        {dayjs().format("YYYY - MM - DD")}
      </div>
      <div className="p-6 flex flex-col default-border bg-white justify-between h-full">
        <div className="flex flex-col gap-4">
          <div>{quiz?.question ? quiz.question : "문제가 없습니다."}</div>
          {/* <Link href={quiz?.hint_link ?? ""} className="text-blue-500 underline">
        <div className="p-2">힌트 보러 가기</div>
      </Link> */}
          {quizType === QUIZ_TYPE.SELECT && (
            <SelectQuestion quiz={quiz} answer={answer} setAnswer={setAnswer} />
          )}
          {quizType === QUIZ_TYPE.INPUT && (
            <InputQuestion
              quiz={quiz}
              answer={answer}
              setAnswer={setAnswer}
              hint={quiz?.hint_link}
            />
          )}
          {quizType === QUIZ_TYPE.OX && (
            <OXQuestion quiz={quiz} answer={answer} setAnswer={setAnswer} />
          )}
        </div>
        <Button
          onClick={() => {
            if (!answer || answer === "") return;
            handleClick(answer);
          }}
          disabled={!answer || answer === ""}
        >
          정답 제출하기
        </Button>
      </div>
    </div>
  );
};

export default Quiz;
