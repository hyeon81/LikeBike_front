"use client";

import { getQuiz } from "@/api/getQuiz";
import Correct from "@/components/quiz/Correct";
import Wrong from "@/components/quiz/Wrong";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

export const QUIZ_STATUS = {
  QUIZ: "quiz",
  CORRECT: "correct",
  WRONG: "wrong",
  COMMENTARY: "commentary",
  RESULT: "result",
};

export type QuizStatus = (typeof QUIZ_STATUS)[keyof typeof QUIZ_STATUS];

const quiz = {
  id: 1,
  question: "Q1. 위 그림 상황을 보고, 다음 중 올바른 것을 고르세요!",
  options: [
    { id: "a", text: "A. 자전거는 항상 도로의 왼쪽으로 주행해야 한다." },
    { id: "b", text: "B. 자전거는 보행자와 함께 도로를 이용해야 한다." },
    { id: "c", text: "C. 자전거는 항상 헬멧을 착용해야 한다." },
    { id: "d", text: "D. 자전거는 신호등이 없는 곳에서도 정지해야 한다." },
  ],
  answer: "c",
};

export default function Home() {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ["quiz"], queryFn: getQuiz });

  const [selectedValue, setSelectedValue] = useState("");
  const [status, setStatus] = useState<QuizStatus>(QUIZ_STATUS.QUIZ);

  const handleClick = () => {
    console.log("선택한 값:", selectedValue);
    if (selectedValue === quiz.answer) {
      setStatus(QUIZ_STATUS.CORRECT);
    } else {
      setStatus(QUIZ_STATUS.WRONG);
    }
  };

  if (status === QUIZ_STATUS.CORRECT) {
    return <Correct setStatus={setStatus} />;
  } else if (status === QUIZ_STATUS.WRONG) {
    return <Wrong setStatus={setStatus} />;
  }

  return (
    <div>
      <div>{quiz.question}</div>
      <Image
        src="/quiz/quiz1.png"
        alt="Quiz Image"
        width={500}
        height={300}
        style={{ borderRadius: "8px", margin: "16px 0" }}
      />
      <FormControl>
        <RadioGroup
          name="quiz1"
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
        >
          {quiz.options.map((v) => {
            return (
              <FormControlLabel
                key={v.id}
                value={v.id}
                control={<Radio />}
                label={v.text}
              />
            );
          })}
        </RadioGroup>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClick}
          style={{ marginTop: "16px" }}
        >
          제출
        </Button>
      </FormControl>
    </div>
  );
}
