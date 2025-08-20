import { IResponse } from "@/types/base";

import { axiosInstance } from "../axiosInstance";

interface ICourse {
  created_at: string;
  id: number;
  location_name: string;
  photo_url: string;
  points_awarded: number;
  review: string;
  reviewed_at: string | null;
  reviewed_by_admin_id: number | null;
  status: string;
  user_id: number;
  admin_notes: string | null;
}

const PATH = "/users/course-recommendations";

export const getCourse: () => Promise<ICourse[]> = async () => {
  try {
    const response = await axiosInstance.get<IResponse<ICourse[]>>(`${PATH}`);
    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching course:", error);
    throw new Error("Failed to fetch course");
  }
};
