import { IResponse } from "@/types/base";
import { axiosInstance } from "../axiosInstance";

interface IQuizAttemptRes {
  experience_earned: number;
  is_correct: boolean;
  points_earned: number;
  reward_given: boolean;
}

export const attemptQuiz = async (quizId: string, selectedAnswer: string) => {
  try {
    const response = await axiosInstance.post<IResponse<IQuizAttemptRes>>(
      `/quizzes/${quizId}/attempt`,
      {
        answer: selectedAnswer,
      }
    );

    // 목업 데이터 리턴
    return {
      experience_earned: 10,
      is_correct: selectedAnswer === "건강을 위해", // Assuming this is the correct answer
      points_earned: 5,
      reward_given: true,
    };

    return response;
  } catch (error) {
    console.error("Error attempting quiz:", error);
    throw new Error("Failed to attempt quiz");
  }
};
