// axiosInstance.ts

import { IResponse } from "@/types/base";

import { axiosInstance } from "../axiosInstance";

export interface CreateCourseRequest {
  location_name: string;
  review: string;
  photo: File;
}

const PATH = "/users/course-recommendations";

export const createCourse = async (courseData: CreateCourseRequest) => {
  const formData = new FormData();
  formData.append("location_name", courseData.location_name);
  formData.append("review", courseData.review);
  formData.append("photo", courseData.photo);

  try {
    const response = await axiosInstance.post<IResponse<any>>(
      `${PATH}`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating course:", error);
    throw new Error("Failed to create course");
  }
};
