//axiosInstance.ts

import { IResponse } from "@/types/base";
import { axiosInstance } from "../axiosInstance";

export interface CreateCourseRequest {
  content: string;
  title: string;
  img: File;
}

const PATH = "/courses";

export const createCourse = async (courseData: CreateCourseRequest) => {
  const formData = new FormData();
  formData.append("content", courseData.content);
  formData.append("title", courseData.title);
  formData.append("img", courseData.img);

  try {
    const response = await axiosInstance.post<IResponse<any>>(
      `${PATH}`,
      formData
    );
  } catch (error) {
    console.error("Error creating course:", error);
    throw new Error("Failed to create course");
  }
};
