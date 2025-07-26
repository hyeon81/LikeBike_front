import { axiosInstance } from "../axiosInstance";

export const getCourseCount = async (): Promise<number> => {
  const PATH = `/users/course-recommendations/today/count`;

  const response = await axiosInstance.get(PATH);
  console.log("Course count response:", response);
  return response?.data?.data?.[0].count;
};
