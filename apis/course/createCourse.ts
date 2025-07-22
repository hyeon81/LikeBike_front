//axiosInstance.ts

import { IResponse } from "@/types/base";
import { axiosInstance } from "../axiosInstance";

export interface CreateCourseRequest {
  content: string;
  title: string;
  img: File;
}

const PATH = "/community/posts";

export const createCourse = async (courseData: CreateCourseRequest) => {
  //   {
  //   "content": "한강공원 라이딩 코스 추천합니다!",
  //   "post_type": "general",
  //   "title": "자전거 추천 경로"
  // }
  // const formData = new FormData();
  // formData.append("content", courseData.content);
  // formData.append("title", courseData.title);
  // formData.append("img", courseData.img);

  try {
    const response = await axiosInstance.post<IResponse<any>>(
      `${PATH}`,
      // formData
      {
        content: courseData.content,
        title: courseData.title,
        post_type: "general",
      }
      // {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating course:", error);
    throw new Error("Failed to create course");
  }
};
