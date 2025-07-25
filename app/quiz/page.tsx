"use client";

import { attemptQuiz } from "@/apis/quiz/attemptQuiz";
import { getQuiz } from "@/apis/quiz/getQuiz";
import BubbleChat from "@/components/common/BubbleChat";
import Button from "@/components/common/Button";
import WhiteBox from "@/components/common/WhiteBox";
import Quiz from "@/components/quiz/Quiz";
import Result from "@/components/quiz/Result";
import { QUIZ_STATUS } from "@/constant/quiz";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export type QuizStatus = (typeof QUIZ_STATUS)[keyof typeof QUIZ_STATUS];

export default function Home() {
  const { data } = useQuery({ queryKey: ["quiz"], queryFn: getQuiz });
  console.log("Quiz Data:", data);
  const quiz = data?.find(
    (v) => v.display_date === dayjs().format("YYYY-MM-DD")
  );

  const [status, setStatus] = useState<QuizStatus>(QUIZ_STATUS.QUIZ);

  const isCorrect = useRef<boolean | null>(null);

  const handleClick = async (selectedValue: string) => {
    if (selectedValue == "") {
      alert("답안을 선택해주세요.");
      return;
    }

    if (quiz?.id) {
      const res = await attemptQuiz(String(quiz.id), selectedValue);
      if (res?.is_correct === true) {
        setStatus(QUIZ_STATUS.CORRECT);
        isCorrect.current = true;
      } else {
        setStatus(QUIZ_STATUS.WRONG);
        isCorrect.current = false;
      }
    }
  };

  return (
    <div>
      <div className="pb-4">
        <BubbleChat text={"이렇게 퀴즈를 풀어주세요!"} />
      </div>
      <WhiteBox>
        하루 한 번, 자전거 안전 퀴즈 풀기
        <br /> 정답을 맞히고 점수 받기 해설까지
        <br />
        확인하고 추가 점수 받기
      </WhiteBox>
      {status == QUIZ_STATUS.QUIZ && (
        <Quiz quiz={quiz} handleClick={handleClick} />
      )}
      {status === QUIZ_STATUS.CORRECT ||
        (status === QUIZ_STATUS.WRONG && (
          <div className="flex flex-col items-center justify-center h-full">
            <Result status={status} setStatus={setStatus} />
          </div>
        ))}
    </div>
  );
}
