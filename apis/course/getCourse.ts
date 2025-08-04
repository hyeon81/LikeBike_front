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
    // return response?.data?.data
    return [
      {
        created_at: '2025-08-01T12:30:00Z',
        id: 1,
        location_name: '망원한강공원',
        photo_url: '',
        points_awarded: 10,
        review: '깨끗하고 운동하기 좋아요!',
        reviewed_at: '2025-08-02T09:00:00Z',
        reviewed_by_admin_id: 101,
        status: 'verified',
        user_id: 501,
      },
      {
        created_at: '2025-08-02T15:45:00Z',
        id: 2,
        location_name: '이촌한강공원',
        photo_url: '',
        points_awarded: 0,
        review: '사람이 너무 많아서 좀 복잡했어요.',
        reviewed_at: null,
        reviewed_by_admin_id: null,
        status: 'pending',
        user_id: 502,
      },
      {
        created_at: '2025-08-03T10:20:00Z',
        id: 3,
        location_name: '뚝섬한강공원',
        photo_url: '',
        points_awarded: 15,
        review: '자전거 도로가 넓어서 좋았어요.',
        reviewed_at: '2025-08-04T08:00:00Z',
        reviewed_by_admin_id: 102,
        status: 'pending',
        user_id: 503,
      },
      {
        created_at: '2025-08-03T20:10:00Z',
        id: 4,
        location_name: '여의도한강공원',
        photo_url: '',
        points_awarded: 0,
        review: '화장실이 깨끗하지 않았어요.',
        reviewed_at: '2025-08-04T10:15:00Z',
        reviewed_by_admin_id: 103,
        status: 'rejected',
        user_id: 504,
      },
      {
        created_at: '2025-08-04T07:30:00Z',
        id: 5,
        location_name: '반포한강공원',
        photo_url: '',
        points_awarded: 20,
        review: '야경이 정말 멋졌어요. 추천합니다!',
        reviewed_at: '2025-08-04T12:00:00Z',
        reviewed_by_admin_id: 101,
        status: 'verified',
        user_id: 505,
      },
    ]
  } catch (error) {
    console.error('Error fetching course:', error)
    throw new Error('Failed to fetch course')
  }
}
