import { axiosInstance } from "../axiosInstance";

export const getBikeCount = async (): Promise<number> => {
  const PATH = `/users/bike-logs/today/count`;

  const response = await axiosInstance.get(PATH);
  return response?.data?.data?.[0].count;
};
