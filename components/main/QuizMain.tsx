import { useRouter } from 'next/navigation'

import SCORE from '@/constant/score'

import MainBase from './MainBase'

const QuizMain = () => {
  const router = useRouter()

  return (
    <MainBase
      chipTitle="매일"
      path="/quiz"
      scoreText={`최대 ${SCORE.QUIZ_CORRECT + SCORE.HAS_SEEN_EXPLANATION}점`}
      title="자전거 안전 퀴즈"
    />
  )
}

export default QuizMain
