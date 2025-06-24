"use client";

import { QuizElement } from "@/components/quiz/QuizElement";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";

const quizList = [
  {
    id: 1,
    question: "Q1. 위 그림 상황을 보고, 다음 중 올바른 것을 고르세요!",
    options: [
      { id: "a", text: "A. 자전거는 항상 도로의 왼쪽으로 주행해야 한다." },
      { id: "b", text: "B. 자전거는 보행자와 함께 도로를 이용해야 한다." },
      { id: "c", text: "C. 자전거는 항상 헬멧을 착용해야 한다." },
      { id: "d", text: "D. 자전거는 신호등이 없는 곳에서도 정지해야 한다." },
    ],
    answer: "c",
  },
  {
    id: 2,
    question: "Q2. 자전거를 타기 전에 반드시 확인해야 할 것은?",
    options: [
      { id: "a", text: "A. 자전거의 브레이크 작동 여부" },
      { id: "b", text: "B. 자전거의 색상" },
      { id: "c", text: "C. 자전거의 소음" },
      { id: "d", text: "D. 자전거의 무게" },
    ],
    answer: "a",
  },
  {
    id: 3,
    question: "Q3. 자전거를 타는 동안 가장 중요한 것은?",
    options: [
      { id: "a", text: "A. 빠르게 주행하는 것" },
      { id: "b", text: "B. 안전하게 주행하는 것" },
      { id: "c", text: "C. 다른 사람과 경주하는 것" },
      { id: "d", text: "D. 자전거를 꾸미는 것" },
    ],
    answer: "b",
  },
  {
    id: 4,
    question: "Q4. 자전거를 타는 동안 휴대폰을 사용해도 되는가?",
    options: [
      { id: "a", text: "A. 예, 항상 사용해도 된다." },
      { id: "b", text: "B. 아니오, 안전을 위해 사용하지 말아야 한다." },
      { id: "c", text: "C. 예, 신호등이 빨간불일 때만 사용해도 된다." },
      {
        id: "d",
        text: "D. 아니오, 자전거를 타는 동안은 항상 사용해야 한다.",
      },
    ],
    answer: "b",
  },
];

export default function Home() {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);

  return <QuizElement {...quizList[currentQuizIndex]} />;
}
