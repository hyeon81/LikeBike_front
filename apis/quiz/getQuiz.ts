import { IQuiz } from "@/types/quiz";
import { axiosInstance } from "../axiosInstance";
import dayjs from "dayjs";

const PATH = "/quizzes";

// const example = {
//   answers: ["모자", "선글라스", "헬멧", "장갑"],
//   display_date: "2024-07-01",
//   hint_link: "https://example.com/hint",
//   id: 1,
//   question: "자전거 안전을 위해 반드시 착용해야 하는 것은?",
//   correct_answer: "헬멧",
//   explanation:
//     "자전거를 탈 때 헬멧을 착용하면 머리를 보호할 수 있어 안전합니다.",
// };

export const getQuiz: () => Promise<IQuiz | undefined> = async () => {
  try {
    const res = await axiosInstance.get(PATH);
    console.log("res", res);

    const data = res?.data?.data;

    const quiz: IQuiz | undefined =
      data?.find(
        (v: IQuiz) => v.display_date === dayjs().format("YYYY-MM-DD")
      ) ?? data?.[0];

    return quiz;
  } catch (e) {
    console.error("e", e);
    throw new Error("Failed to fetch todos");
  }
};
