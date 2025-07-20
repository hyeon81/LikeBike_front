import { IResponse } from "@/types/base";
import { axiosInstance } from "../axiosInstance";

interface ICourse {
  id: string;
  title: string;
  content: string;
  img_url: string;
}

const getCourse = async (courseId: string) => {
  try {
    const response = await axiosInstance.get<IResponse<any>>(
      `/courses/${courseId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching course:", error);
    throw new Error("Failed to fetch course");
  }
};
