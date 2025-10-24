import { IResponse } from "@/types/base";

import { axiosInstance } from "../axiosInstance";
import { IPlace } from "@/types/course";

interface IPlaceResponse {
  created_at: string;
  id: number;
  photo_url: string;
  points_awarded: number;
  places: IPlace[];
  reviewed_at: string | null;
  reviewed_by_admin_id: number | null;
  status: string;
  user_id: number;
  admin_notes: string | null;
}

export const mockReviews: IPlaceResponse[] = [
  {
    created_at: "2025-10-01T10:15:00Z",
    id: 1,
    places: [
      {
        name: "한강공원 반포지구",
        address_name: "서울 서초구 신반포로11길 40",
        description: "야경이 아름다운 한강변 산책 명소예요.",
        photo: "/images/places/banpo.jpg",
        x: "126.995972",
        y: "37.511284",
        _file: null,
      },
      {
        name: "홍대입구역 9번 출구",
        address_name: "서울 마포구 양화로 160",
        description: "만남의 장소로 자주 쓰이는 번화가 중심.",
        photo: "/images/places/hongdae.jpg",
        x: "126.923708",
        y: "37.557192",
        _file: null,
      },
      {
        name: "남산타워",
        address_name: "서울 용산구 남산공원길 105",
        description: "서울 전경을 한눈에 볼 수 있는 전망대.",
        photo: "/images/places/namsan.jpg",
        x: "126.988194",
        y: "37.551169",
        _file: null,
      },
    ],
    photo_url: "/images/reviews/banpo_review1.jpg",
    points_awarded: 10,
    reviewed_at: "2025-10-02T12:00:00Z",
    reviewed_by_admin_id: 101,
    status: "approved",
    user_id: 201,
    admin_notes: "사진이 선명하고 내용 적절함",
  },
  {
    created_at: "2025-09-28T14:30:00Z",
    id: 2,
    places: [
      {
        name: "한강공원 반포지구",
        address_name: "서울 서초구 신반포로11길 40",
        description: "야경이 아름다운 한강변 산책 명소예요.",
        photo: "/images/places/banpo.jpg",
        x: "126.995972",
        y: "37.511284",
        _file: null,
      },
      {
        name: "홍대입구역 9번 출구",
        address_name: "서울 마포구 양화로 160",
        description: "만남의 장소로 자주 쓰이는 번화가 중심.",
        photo: "/images/places/hongdae.jpg",
        x: "126.923708",
        y: "37.557192",
        _file: null,
      },
      {
        name: "남산타워",
        address_name: "서울 용산구 남산공원길 105",
        description: "서울 전경을 한눈에 볼 수 있는 전망대.",
        photo: "/images/places/namsan.jpg",
        x: "126.988194",
        y: "37.551169",
        _file: null,
      },
    ],
    photo_url: "/images/reviews/hongdae_review2.jpg",
    points_awarded: 5,
    reviewed_at: null,
    reviewed_by_admin_id: null,
    status: "pending",
    user_id: 202,
    admin_notes: null,
  },
  {
    created_at: "2025-09-25T09:00:00Z",
    id: 3,
    places: [
      {
        name: "한강공원 반포지구",
        address_name: "서울 서초구 신반포로11길 40",
        description: "야경이 아름다운 한강변 산책 명소예요.",
        photo: "/images/places/banpo.jpg",
        x: "126.995972",
        y: "37.511284",
        _file: null,
      },
      {
        name: "홍대입구역 9번 출구",
        address_name: "서울 마포구 양화로 160",
        description: "만남의 장소로 자주 쓰이는 번화가 중심.",
        photo: "/images/places/hongdae.jpg",
        x: "126.923708",
        y: "37.557192",
        _file: null,
      },
      {
        name: "남산타워",
        address_name: "서울 용산구 남산공원길 105",
        description: "서울 전경을 한눈에 볼 수 있는 전망대.",
        photo: "/images/places/namsan.jpg",
        x: "126.988194",
        y: "37.551169",
        _file: null,
      },
    ],
    photo_url: "/images/reviews/namsan_review3.jpg",
    points_awarded: 15,
    reviewed_at: "2025-09-26T11:15:00Z",
    reviewed_by_admin_id: 102,
    status: "rejected",
    user_id: 203,
    admin_notes: "좋은 사진, 리뷰 길이 적절",
  },
];

const PATH = "/users/course-recommendations";

export const getCourse: () => Promise<IPlaceResponse[]> = async () => {
  try {
    const response = await axiosInstance.get<IResponse<IPlaceResponse[]>>(
      `${PATH}`
    );
    // return response?.data?.data;
    return mockReviews;
  } catch (error) {
    console.error("Error fetching course:", error);
    throw new Error("Failed to fetch course");
  }
};
