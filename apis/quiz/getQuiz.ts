import { IQuiz } from "@/types/quiz";
import { axiosInstance } from "../axiosInstance";

const PATH = "/quizzes";

export const getQuiz: () => Promise<IQuiz[] | undefined> = async () => {
  try {
    const res = await axiosInstance.get(PATH);
    console.log("res", res);

    return res?.data?.data;
    //더미데이터
    // return [
    //   {
    //     answers: ["모자", "선글라스", "헬멧", "장갑"],
    //     display_date: "2024-07-01",
    //     hint_link: "https://example.com/hint",
    //     id: 1,
    //     question: "자전거 안전을 위해 반드시 착용해야 하는 것은?",
    //   },
    // ];
  } catch (e) {
    console.error("e", e);
    throw new Error("Failed to fetch todos");
  }
};
