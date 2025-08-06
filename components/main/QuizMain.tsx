import { useRouter } from 'next/navigation'

import SCORE from '@/constant/score'

import MainBase from './MainBase'
import { useQuery } from '@tanstack/react-query'
import { getProfile } from '@/apis/user/getProfile'
import { env } from 'process'

const QuizMain = () => {
  const { data: profileData } = useQuery({ queryKey: ['profile'], queryFn: getProfile })
  const isAdmin = profileData && process.env.NEXT_PUBLIC_EMAIL && (process.env.NEXT_PUBLIC_EMAIL as string)?.split(',').includes(profileData?.email)

  return (
    <MainBase
      chipTitle="매일"
      path={isAdmin ? `/quiz_infinite` : `/quiz`}
      scoreText={`최대 ${SCORE.QUIZ_CORRECT + SCORE.HAS_SEEN_EXPLANATION}점`}
      title="자전거 안전 퀴즈"
    />
  )
}

export default QuizMain
