// axiosInstance.ts

import { IResponse } from "@/types/base";

import { axiosInstance } from "../axiosInstance";
import { ICourse, ICourseCard } from "@/types/course";

interface CreateCourseRequest {
  // title?: string;
  // description: string;
  courses: ICourse[];
}

// {
//   "id": 34,
//   "title": "한강",
//   “description” : “설명“,
//   "courses": [
//         {
//           "point_id": 0,
//           "name": "출발지 이름",
//           "address": "서울시 테스트구 1번지",
//       “description” : “설명“,
//           "photo_url": "https://test.com/point_start.jpg"
//         },
//         {
//           "point_id": 1,
//           "name": "경유지 이름",
//           "address": "서울시 테스트구 2번지",
//       “description” : “설명“,
//           "photo_url": "https://test.com/point_finish.jpg"
//         },
//         {
//           "point_id": 2,
//           "name": "도착지 이름",
//           "address": "서울시 테스트구 2번지",
//       “description” : “설명“,
//           "photo_url": "https://test.com/point_finish.jpg"
//         }
//       ]
//  }

const PATH = "/users/course-recommendations";

export const createCourse = async (courseData: ICourseCard[]) => {
  const formData = new FormData();
  formData.append("title", courseData.title ?? "");
  formData.append("courses", JSON.stringify(courseData.courses ?? []));

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
