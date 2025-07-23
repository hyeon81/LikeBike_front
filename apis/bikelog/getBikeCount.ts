import { axiosInstance } from "../axiosInstance";

export const getBikeCount = async (): Promise<number> => {
  const PATH = `/users/bike-logs/today/count`;

  const response = await axiosInstance.get(PATH);
  console.log("Bike count response:", response);
  return response?.data?.data?.count;
};
