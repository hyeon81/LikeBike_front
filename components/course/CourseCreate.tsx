import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useState } from 'react'

import { createCourse } from '@/apis/course/createCourse'
import { getCourseCount } from '@/apis/course/getCourseCount'
import { RIVER_LIST } from '@/constant/riverList'
import PhotoIcon from '@/public/icons/PhotoIcon'
import { getCompressionImage } from '@/utils/getCompressionImage'

import BubbleChat from '../common/BubbleChat'
import ButtonModal from '../common/ButtonModal'
import EmSpan from '../common/EmSpan'
import WhiteBox from '../common/WhiteBox'

const CourseCreate = ({ goToList }: { goToList: () => void }) => {
  const { data: courseCount } = useQuery({
    queryKey: ['courseCount'],
    queryFn: getCourseCount,
  })

  const [image, setImage] = useState<File | null>(null)
  const [imgPreview, setImgPreview] = useState<string | null>(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false)

  const [locationName, setLocationName] = useState<string>('') // Placeholder for location name
  const [openLocation, setOpenLocation] = useState(false)
  const [review, setReview] = useState<string>('') // Placeholder for review content

  const isAlreadyCertified = courseCount && courseCount > 0

  const onSubmit = async () => {
    if (locationName === '' || review === '' || !image) {
      setErrorModalIsOpen(true)
      return
    }

    if (image) {
      try {
        const compressedImage = await getCompressionImage(image)

        await createCourse({
          location_name: locationName || '', // Replace with actual location name
          review: review || '', // Replace with actual review
          photo: compressedImage,
        })
        setModalIsOpen(true)
      } catch (error) {
        console.error('Error creating course:', error)
        alert('코스 추천에 실패했습니다. 다시 시도해주세요.')
      }
    } else {
      alert('이미지를 업로드해주세요.')
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <ButtonModal
        buttonText="추천 내역 확인하기"
        contents={[
          '점수 지급에 1~2일이 소요됩니다.',
          '점수는 자동 지급됩니다.',
        ]}
        isList
        isOpen={modalIsOpen}
        isRed
        onClickButton={() => {
          setModalIsOpen(false)
          goToList()
        }}
        title="‘자전거 코스 추천’ 완료"
      />
      <ButtonModal
        buttonText="확인"
        contents={['한강공원 선택 / 사진 업로드 / 추천 이유', '작성 필요']}
        isOpen={errorModalIsOpen}
        isRed
        onClickButton={() => {
          setErrorModalIsOpen(false)
        }}
        title="‘자전거 코스 추천’ 제출 실패"
      />
      <BubbleChat text="이렇게 인증해주세요!" />
      <div className="flex flex-col gap-2">
        <WhiteBox>
          <div>
            ① 추천하고 싶은 <EmSpan>[한강공원]</EmSpan> 선택하기
          </div>
          <div>
            ② <EmSpan>[풍경 사진]</EmSpan> 업로드하기
          </div>
          <div>
            ③ <EmSpan>[추천 이유]</EmSpan>를 적고 코스 추천 제출하기
          </div>
        </WhiteBox>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <div className="relative flex flex-row w-full justify-center">
            <BubbleChat isRight text="선택 버튼을 눌러주세요!" />
          </div>
          <div
            className={`flex flex-row mt-4 ${isAlreadyCertified ? 'cursor-default' : 'cursor-pointer'}`}
            onClick={() => {if (!isAlreadyCertified) setOpenLocation(!openLocation)}}
          >
            <div
              className={`border-[1.5px] border-contrast-dark py-2 px-5 ${locationName == '' ? 'text-gray-light' : 'text-black'} flex-1`}
            >
              {locationName === ''
                ? '추천하고 싶은 한강공원을 선택해주세요'
                : locationName}
            </div>
            <div className="w-[47px] h-auto  bg-contrast-dark flex flex-col items-center justify-center">
              <KeyboardArrowDownIcon fontSize="large" sx={{ color: 'white' }} />
            </div>
          </div>
          {openLocation && (
            <div className="grid grid-cols-2 gap-2 px-4 py-8 bg-gray-lightest rounded-b-2xl border-[1.5px] border-contrast-dark border-t-0">
              {RIVER_LIST.map((river) => (
                <div
                  key={river}
                  className={`py-3 text-center cursor-pointer ${locationName == river ? 'bg-contrast-dark text-white' : 'bg-white'}`}
                  onClick={() => {
                    setLocationName(river)
                    setOpenLocation(false)
                  }}
                >
                  {river}
                </div>
              ))}
            </div>
          )}
        </div>
        <label
          className={`${isAlreadyCertified ? 'bg-gray-lightest' : 'bg-contrast cursor-pointer'} rounded-2xl h-[174px] w-full flex items-center justify-center`}
          htmlFor="file-upload"
        >
          {imgPreview ? (
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image
                alt="Uploaded Image"
                className="object-cover rounded-2xl"
                layout="fill"
                src={imgPreview}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <PhotoIcon color={isAlreadyCertified ? '#969696' : '#FF7272'} />
              <div
                className={`${isAlreadyCertified ? 'text-gray-medium' : 'text-contrast-dark'}`}
              >
                사진 업로드 하기
              </div>
            </div>
          )}
        </label>
        <input
        disabled={!!isAlreadyCertified}
          accept="image/*"
          className="hidden"
          id="file-upload"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const file = e.target.files[0]
              const reader = new FileReader()
              reader.onloadend = () => {
                setImage(file)
                setImgPreview(reader.result as string)
              }
              reader.readAsDataURL(file)
            }
          }}
          type="file"
        />
        <textarea
          className="border border-contrast-dark px-8 py-4 outline-none"
          onChange={(e) => {
            const value = e.target.value.replace(/\s/g, '')
            if (value.length <= 50) {
              setReview(e.target.value)
            }
          }}
          disabled={!!isAlreadyCertified}
          placeholder="추천하는 이유를 50자 이내로 적어주세요"
          rows={3}
          style={{ resize: 'none' }}
          value={review}
        />
        <button
          className={`${isAlreadyCertified ? 'bg-gray-lightest text-gray-medium' : 'bg-contrast-dark text-white cursor-pointer'} p-4 rounded-xl text-center text-lg font-bold mt-4`}
          disabled={!!isAlreadyCertified}
          onClick={onSubmit}
        >
          {isAlreadyCertified ? '코스 추천 제출 완료' : '코스 추천 제출하기'}
        </button>
      </div>
    </div>
  )
}

export default CourseCreate
