import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'

import { getCourse } from '@/apis/course/getCourse'
import { LOG_STATUS } from '@/types/bikeLog'

import PhotoStatusCard from '../bikelog/PhotoStatusCard'
import PrimaryBox from '../common/PrimaryBox'
import ToggleContent from '../common/ToggleContent'
import WhiteBox from '../common/WhiteBox'

require('dayjs/locale/ko')
dayjs.locale('ko')

const CourseList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['courseList'],
    queryFn: getCourse,
  })

  return (
    <>
      <div className="flex flex-col gap-">
        <PrimaryBox>내가 추천한 코스의 인증 완료 내역을 확인하세요</PrimaryBox>
        <WhiteBox>
          ① [인증 검토]가 완료된 내역을 확인할 수 있습니다. <br />② 검토 결과는
          [O, X]로 나타납니다.
          <br /> ③ 인증 기준은 다음과 같습니다. <br />
          * 요구하는 내용을 모두 입력했는지 여부
          <br />* 비속어, 부적절한 내용 존재 여부
        </WhiteBox>
      </div>
      <div className="mt-4 flex flex-col not-only-of-type:gap-4">
        {data && data.length > 0 ? (
          data.map(
            (
              { id, created_at, status, photo_url, location_name, review },
              idx,
            ) => (
              <ToggleContent
                key={id}
                defaultValue={idx === 0}
                title={`${idx + 1}회차 - ${dayjs(created_at?.replace('GMT', '')).format('YYYY년 MM월 DD일, A hh시 mm분')}`}
              >
                <div className="w-[150px]">
                  <PhotoStatusCard
                    imgUrl={photo_url}
                    status={status as keyof typeof LOG_STATUS}
                    strongText={`[${location_name}]`}
                    text={review}
                  />
                </div>
              </ToggleContent>
            ),
          )
        ) : (
          <div>아직 인증 내역이 없습니다.</div>
        )}
      </div>
    </>
  )
}

export default CourseList
