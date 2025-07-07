import { axiosInstance } from "./axiosInstance";

const PATH = "/quizzes";

export const getQuiz = async () => {
  try {
    const res = await axiosInstance.get(PATH);
    console.log("res", res);
  } catch (e) {
    console.error("e", e);
    throw new Error("Failed to fetch todos");
  }
};
