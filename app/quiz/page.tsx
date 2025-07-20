"use client";

import { attemptQuiz } from "@/apis/quiz/attemptQuiz";
import { getQuiz } from "@/apis/quiz/getQuiz";
import Button from "@/components/common/Button";
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
  const quiz = data?.[0]; // Assuming you want the first quiz

  const [selectedValue, setSelectedValue] = useState("");
  const [status, setStatus] = useState<QuizStatus>(QUIZ_STATUS.QUIZ);
  const isCorrect = useRef<boolean | null>(null);

  const handleClick = async () => {
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

  if (status === QUIZ_STATUS.CORRECT || status === QUIZ_STATUS.WRONG) {
    //세로 중앙 정렬
    return (
      <div className="flex flex-col items-center justify-center h-full bg-amber-200">
        <Result status={status} setStatus={setStatus} />
      </div>
    );
  }

  if (status === QUIZ_STATUS.COMMENTARY) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-green-200">
        <div className="text-2xl font-bold">해설</div>
        <div className="mt-4">
          {quiz?.explanation ? quiz.explanation : "해설이 없습니다."}
        </div>

        <Button
          onClick={() =>
            setStatus(
              isCorrect.current ? QUIZ_STATUS.CORRECT : QUIZ_STATUS.WRONG
            )
          }
          style={{ marginTop: "16px" }}
        >
          이전으로 돌아가기
        </Button>
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
      <Link href={quiz?.hint_link ?? ""} className="text-blue-500 underline">
        <div className="p-2">힌트 보러 가기</div>
      </Link>
      <div>
        {quiz?.answers.map((v, idx) => (
          <div key={idx}>
            <Checkbox
              name={`answer-${idx}`}
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
