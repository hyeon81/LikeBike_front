import { IQuiz } from "@/types/quiz";
import { axiosInstance } from "../axiosInstance";

const PATH = "/quizzes";

export const getQuiz: () => Promise<IQuiz[] | undefined> = async () => {
  try {
    const res = await axiosInstance.get(PATH);
    console.log("res", res);

    return res?.data?.data;
  } catch (e) {
    console.error("e", e);
    throw new Error("Failed to fetch todos");
  }
};
