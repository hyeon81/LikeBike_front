"use client";

import { attemptQuiz } from "@/api/quiz/attemptQuiz";
import { getQuiz } from "@/api/quiz/getQuiz";
import Button from "@/components/common/Button";
import Correct from "@/components/quiz/Correct";
import Wrong from "@/components/quiz/Wrong";
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
import { useState } from "react";

export type QuizStatus = (typeof QUIZ_STATUS)[keyof typeof QUIZ_STATUS];

export default function Home() {
  const { data } = useQuery({ queryKey: ["quiz"], queryFn: getQuiz });
  const quiz = data?.[0]; // Assuming you want the first quiz

  const [selectedValue, setSelectedValue] = useState("");
  const [status, setStatus] = useState<QuizStatus>(QUIZ_STATUS.QUIZ);

  const handleClick = async () => {
    if (selectedValue == "") {
      alert("답안을 선택해주세요.");
      return;
    }

    if (quiz?.id) {
      const res = await attemptQuiz(String(quiz.id), selectedValue);

      if (res?.is_correct === true) {
        setStatus(QUIZ_STATUS.CORRECT);
      } else {
        setStatus(QUIZ_STATUS.WRONG);
      }
    }
  };

  if (status === QUIZ_STATUS.CORRECT) {
    //세로 중앙 정렬
    return (
      <div className="flex flex-col items-center justify-center h-full bg-amber-200">
        <Correct setStatus={setStatus} />
      </div>
    );
  }
  if (status === QUIZ_STATUS.WRONG) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-red-200">
        <Wrong setStatus={setStatus} />
      </div>
    );
  }

  return (
    <div>
      <div className="bg-secondary-light rounded-2xl h-[280px] w-full flex flex-col items-center justify-center ">
        <div className="text-2xl font-bold">
          {dayjs().format("MM월 DD일")} 문제
        </div>
        <div>{quiz?.question ?? ""}</div>
      </div>
      <div className="p-2">hint: {quiz?.hint ?? ""}</div>
      <div>
        {quiz?.answers.map((v, idx) => (
          <div key={idx}>
            <Checkbox
              name="quiz1"
              value={v}
              checked={selectedValue === v}
              onChange={(e) => setSelectedValue(e.target.value)}
            />
            {v}
          </div>
        ))}
      </div>
      <Button onClick={handleClick} style={{ marginTop: "16px" }}>
        제출하기
      </Button>
    </div>
  );
}
