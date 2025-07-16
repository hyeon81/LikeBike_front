import { IQuiz } from "@/types/quiz";
import { axiosInstance } from "../axiosInstance";

const PATH = "/quizzes";

export const getQuiz: () => Promise<IQuiz[] | undefined> = async () => {
  try {
    const res = await axiosInstance.get(PATH);
    console.log("res", res);

    //더미데이터 리턴
    return [
      {
        id: 1,
        question: "자전거를 타는 이유는 무엇인가요?",
        answers: ["건강을 위해", "환경 보호를 위해", "취미로", "교통 수단으로"],
        correct_answer: "건강을 위해",
        explanation: "자전거는 건강에 매우 좋습니다.",
        hint: "자전거는 운동입니다.",
      },
    ];
    return res?.data?.data;
  } catch (e) {
    console.error("e", e);
    throw new Error("Failed to fetch todos");
  }
};
