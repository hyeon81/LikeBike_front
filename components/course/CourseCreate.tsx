import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { getCourseCount } from "@/apis/course/getCourseCount";

import BubbleChat from "../common/BubbleChat";
import ButtonModal from "../common/ButtonModal";
import EmSpan from "../common/EmSpan";
import WhiteBox from "../common/WhiteBox";
import CourseCardList from "./CourseCardList";
import KakaoMapView from "./KakaoMapView";
import { IKakaoMapPoint } from "@/types/course";

interface Props {
  goToList: () => void;
}

const CourseCreate = ({ goToList }: Props) => {
  const { data: courseCount, refetch } = useQuery({
    queryKey: ["courseCount"],
    queryFn: getCourseCount,
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);

  const [placeInfo, setPlaceInfo] = useState<(IKakaoMapPoint | null)[]>([
    null,
    null,
  ]);

  const places = useMemo(
    () => placeInfo.filter((p) => p !== null),
    [placeInfo]
  );

  return (
    <div className="flex flex-col gap-4">
      <ButtonModal
        buttonText="추천 내역 확인하기"
        contents={[
          "점수 지급에 1~2일이 소요됩니다.",
          "우수 사례의 경우, 공식 인스타그램에 공유될 수 있습니다.",
        ]}
        isList
        isOpen={modalIsOpen}
        isRed
        onClickButton={() => {
          setModalIsOpen(false);
          refetch();
          goToList();
        }}
        title="‘자전거 코스 추천’ 완료"
      />
      <ButtonModal
        buttonText="확인"
        contents={["장소 선택 / 사진 업로드 / 추천 이유", "작성 필요"]}
        isOpen={errorModalIsOpen}
        isRed
        onClickButton={() => {
          setErrorModalIsOpen(false);
        }}
        title="‘자전거 코스 추천’ 제출 실패"
      />
      <BubbleChat text="이렇게 인증해주세요!" />
      <div className="flex flex-col gap-2">
        <WhiteBox>
          <div>
            ① 추천하고 싶은 <EmSpan>[장소]</EmSpan> 선택하기
          </div>
          <div>
            ② 장소 옆 <EmSpan>[사진]</EmSpan> 업로드하기
          </div>
          <div>
            ③ <EmSpan>[추천 이유]</EmSpan>를 적고 코스 추천 제출하기
          </div>
        </WhiteBox>
      </div>
      <div className="flex flex-col gap-4">
        <div
          className={`bg-gray-light rounded-2xl h-[174px] w-full flex items-center justify-center`}
        >
          <KakaoMapView places={places} />
        </div>
        <CourseCardList
          courseCount={courseCount}
          setErrorModalIsOpen={setErrorModalIsOpen}
          setModalIsOpen={setModalIsOpen}
          placeInfo={placeInfo}
          setPlaceInfo={setPlaceInfo}
        />
      </div>
    </div>
  );
};

export default CourseCreate;
