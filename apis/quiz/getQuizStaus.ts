import { axiosInstance } from "../axiosInstance";

export const getQuizStatus = async (): Promise<number> => {
  const PATH = `/quizzes/today/status`;

  const response = await axiosInstance.get(PATH);
  console.log("Quiz status response:", response);
  return response?.data?.data?.attempted;
};
