import { axiosInstance } from "../axiosInstance";

export const attemptQuiz = async (quizId: string, selectedAnswer: string) => {
  try {
    const response = await axiosInstance.post(`/quizzes/${quizId}/attempt`, {
      answer: selectedAnswer,
    });

    return response;
  } catch (error) {
    console.error("Error attempting quiz:", error);
    throw new Error("Failed to attempt quiz");
  }
};
