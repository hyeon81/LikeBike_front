import { IResponse } from '@/types/base'

import { axiosInstance } from '../axiosInstance'

interface IQuizAttemptRes {
  experience_earned: number
  is_correct: boolean
  points_earned: number
  reward_given: boolean
}

export const attemptQuiz = async (
  quizId: string,
  selectedAnswer: string,
): Promise<IQuizAttemptRes> => {
  try {
    const response = await axiosInstance.post<IResponse<IQuizAttemptRes[]>>(
      `/quizzes/${quizId}/attempt`,
      {
        answer: selectedAnswer,
      },
    )

    return response?.data?.data?.[0]
  } catch (error) {
    console.error('Error attempting quiz:', error)
    throw new Error('Failed to attempt quiz')
  }
}
