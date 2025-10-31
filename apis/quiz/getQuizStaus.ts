import { axiosInstance } from "../axiosInstance";

interface IQuizStatusResponse {
  attempted: boolean;
  is_correct: boolean;
}

export const getQuizStatus = async (): Promise<IQuizStatusResponse> => {
  const PATH = `/quizzes/today/status`;

  const response = await axiosInstance.get(PATH);
  return response?.data?.data?.[0];
};
