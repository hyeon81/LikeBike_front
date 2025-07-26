import { IResponse } from "@/types/base";
import { axiosInstance } from "../axiosInstance";
import { IUserProfile } from "@/types/user";

//   "data": [
//     {
//       "benefits": "혜택 정보",
//       "created_at": "2024-01-01T00:00:00Z",
//       "description": "레벨 설명",
//       "email": "user@example.com",
//       "experience_points": 250,
//       "id": 1,
//       "level": 2,
//       "level_name": "중급자",
//       "points": 150,
//       "profile_image_url": "https://k.kakaocdn.net/dn/profile.jpg",
//       "username": "사용자명"
//     }
//   ],

export const getProfile = async () => {
  try {
    const response =
      await axiosInstance.get<IResponse<IUserProfile[]>>(`/users/profile`);
    if (response.status < 200 || response.status >= 300) {
      throw new Error("Failed to fetch user profile");
    }
    return response?.data?.data[0];

    // return {
    //   benefits: "혜택 정보",
    //   created_at: "2024-01-01T00:00:00Z",
    //   description: "레벨 설명",
    //   email: "user@example.com",
    //   experience_points: 500,
    //   id: 1,
    //   level: 2,
    //   level_name: "중급자",
    //   points: 400,
    //   profile_image_url: "https://k.kakaocdn.net/dn/profile.jpg",
    //   username: "사용자명",
    // };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw new Error("Failed to fetch user profile");
  }
};
