import { IResponse } from '@/types/base'

import { axiosInstance } from '../axiosInstance'

interface ICourse {
  created_at: string
  id: number
  location_name: string
  photo_url: string
  points_awarded: number
  review: string
  reviewed_at: string | null
  reviewed_by_admin_id: number | null
  status: string
  user_id: number
}

const PATH = '/users/course-recommendations'

export const getCourse: () => Promise<ICourse[]> = async () => {
  try {
    const response = await axiosInstance.get<IResponse<ICourse[]>>(`${PATH}`)
    return response?.data?.data
    // return [
    //   {
    //     id: 1,
    //     content: "한강 라이딩 코스",
    //     created_at: "2024-01-01T09:00:00Z",
    //     updated_at: "2024-01-01T10:00:00Z",
    //     title: "한강 라이딩 코스 추천",
    //     post_type: "course",
    //     status: "verified",
    //     user_id: 1,
    //     username: "user1",
    //     comments_count: 5,
    //     likes_count: 10,
    //     level: 2, // Optional field
    //   },
    //   {
    //     id: 2,
    //     content: "남산 라이딩 코스",
    //     created_at: "2024-01-02T09:00:00Z",
    //     updated_at: "2024-01-02T10:00:00Z",
    //     title: "남산 라이딩 코스 추천",
    //     post_type: "course",
    //     status: "pending",
    //     user_id: 2,
    //     username: "user2",
    //     comments_count: 3,
    //     likes_count: 7,
    //   },
    // ];
  } catch (error) {
    console.error('Error fetching course:', error)
    throw new Error('Failed to fetch course')
  }
}
