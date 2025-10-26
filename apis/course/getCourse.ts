import { IResponse } from "@/types/base";

import { axiosInstance } from "../axiosInstance";

export interface IPlaceResponse {
  address_name: string;
  description: string;
  latitude: number;
  longitude: number;
  name: string;
  photo_url: string;
  place_id: number;
  sequence_order: number;
  x: string; // 경도 (문자열 형태)
  y: string; // 위도 (문자열 형태)
}

export interface ICourseResponse {
  admin_notes: string | null;
  course_description: string;
  course_name: string;
  created_at: string; // "Sat, 25 Oct 2025 10:36:33 GMT"
  description: string;
  id: number;
  photo_url: string;
  places: IPlaceResponse[];
  points_awarded: number;
  review: string;
  reviewed_at: string | null;
  reviewed_by_admin_id: number | null;
  status: string; // 예: "pending"
  title: string;
  user_id: number;
}
const PATH = "/users/course-recommendations";

export const getCourse: () => Promise<ICourseResponse[]> = async () => {
  try {
    const response = await axiosInstance.get<IResponse<ICourseResponse[]>>(
      `${PATH}`
    );
    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching course:", error);
    throw new Error("Failed to fetch course");
  }
};
