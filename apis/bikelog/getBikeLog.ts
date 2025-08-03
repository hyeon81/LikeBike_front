import { IResponse } from '@/types/base'
import { IBikeLog } from '@/types/bikeLog'

import { axiosInstance } from '../axiosInstance'

const getBikeLog: () => Promise<IBikeLog[]> = async () => {
  try {
    const response =
      await axiosInstance.get<IResponse<IBikeLog[]>>('/users/bike-logs')
    if (response.status < 200 || response.status >= 300) {
      throw new Error('Failed to fetch bike logs')
    }
    return response?.data?.data
    // mockup 데이터 리턴
    // return [
    //   {
    //     id: 1,
    //     description: "한강 라이딩",
    //     bike_photo_url:
    //       "https://kr.object.ncloudstorage.com/bucket/bike_logs/abc123.jpg",
    //     safety_gear_photo_url:
    //       "https://kr.object.ncloudstorage.com/bucket/bike_logs/def456.jpg",
    //     started_at: "2024-01-01T09:00:00Z",
    //     created_at: "2024-01-01T10:00:00Z",
    //     verification_status: "verified",
    //     verified_at: "2024-01-01T10:00:00Z",
    //     points_awarded: 10,
    //     admin_notes: "좋은 활동입니다!",
    //   },
    //   {
    //     id: 2,
    //     description: "남산 라이딩",
    //     bike_photo_url:
    //       "https://kr.object.ncloudstorage.com/bucket/bike_logs/ghi789.jpg",
    //     safety_gear_photo_url:
    //       "https://kr.object.ncloudstorage.com/bucket/bike_logs/jkl012.jpg",
    //     started_at: "2024-01-02T09:00:00Z",
    //     created_at: "2024-01-02T10:00:00Z",
    //     verification_status: "pending",
    //     verified_at: null,
    //     points_awarded: 5,
    //     admin_notes: null,
    //   },
    // ];
  } catch (error) {
    console.error('Error fetching bike log:', error)
    throw error
  }
}

export default getBikeLog
