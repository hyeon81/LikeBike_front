import { IResponse } from "@/types/base";
import { axiosInstance } from "../axiosInstance";

interface ICourse {
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
  title: string;
  post_type: string;
  status: string;
  user_id: number;
  username: string;
  comments_count: number;
  likes_count: number;
  level?: number; // Optional field
}

export const getCourse: () => Promise<ICourse[]> = async () => {
  try {
    const response =
      await axiosInstance.get<IResponse<ICourse[]>>(`/community/posts`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching course:", error);
    throw new Error("Failed to fetch course");
  }
};
