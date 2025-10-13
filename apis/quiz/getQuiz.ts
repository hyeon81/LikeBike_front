import dayjs from "dayjs";

import { IQuiz } from "@/types/quiz";

import { axiosInstance } from "../axiosInstance";

const PATH = "/quizzes";

const example = {
  answers: ["모자", "선글라스", "헬멧", "장갑"],
  display_date: "2024-07-01",
  hint_link: "https://example.com/hint",
  id: 1,
  question:
    "최근 한강 일대에서 자주 보이는 벌레 ‘이것’. 자전거를 탈 때에도 시야를 방해할 수 있는 이 벌레를 각별히 주의해야 합니다. 한 쌍이 함께 다니는 이것은 _ _ _ _ 이다",
  correct_answer: "헬멧",
  explanation:
    "자전거를 탈 때 헬멧을 착용하면 머리를 보호할 수 있어 안전합니다.",
};

export const getQuiz: () => Promise<IQuiz | undefined> = async () => {
  try {
    const res = await axiosInstance.get(PATH);

    const data = res?.data?.data;

    const quiz: IQuiz | undefined = data?.find(
      (v: IQuiz) => v.display_date === dayjs().format("YYYY-MM-DD")
    );

    return example;
  } catch (e) {
    console.error("e", e);
    throw new Error("Failed to fetch todos");
  }
};
