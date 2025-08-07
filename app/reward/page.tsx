'use client'

import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'

import { getReward } from '@/apis/user/getReward'
import BubbleChat from '@/components/common/BubbleChat'
import { Divider } from '@mui/material'
import EmSpan from '@/components/common/EmSpan'
import WhiteBox from '@/components/common/WhiteBox'
import { getProfile } from '@/apis/user/getProfile'

export default function Home() {
  const { data } = useQuery({
    queryKey: ['reward'],
    queryFn: getReward,
  })

    const { data: profileData } = useQuery({ queryKey: ['profile'], queryFn: getProfile })

  return (
    <div className='bg-white p-4 default-border'>
      <BubbleChat text='‘점수 내역’ 이란?'/>
      <div className='mt-11'>
      <WhiteBox>
        <div className='mb-1'>
        지금까지 적립된 모든 점수를 볼 수 있어요.
        </div>
        <Divider/>
        <div className='mt-1'>
        현재 <EmSpan>{profileData?.username}</EmSpan> 님은 <EmSpan>{profileData?.experience_points}</EmSpan>점 입니다.
        </div>
      </WhiteBox>
      </div>
      <div className="mt-4 flex flex-col gap-[10px] p-2">
        {data?.map((reward) => {
          const date = dayjs(reward.created_at?.replace('GMT', '')).format(
            'YYYY-MM-DD HH:mm',
          )

          return (
            <div key={reward.id} className="flex flex-row justify-between">
              <div>
                <p className="font-medium text-lg">{date}</p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-primary font-medium text-lg">
                  +{reward.experience_points}점
                </p>
                <p className="text-gray-light text-sm">{reward.reward_reason}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
