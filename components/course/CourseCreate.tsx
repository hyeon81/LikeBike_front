import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useMemo, useReducer, useRef, useState } from "react";

import { createCourse } from "@/apis/course/createCourse";
import { getCourseCount } from "@/apis/course/getCourseCount";
import { RIVER_LIST } from "@/constant/riverList";
import PhotoIcon from "@/public/icons/PhotoIcon";
import { getCompressionImage } from "@/utils/getCompressionImage";

import BubbleChat from "../common/BubbleChat";
import ButtonModal from "../common/ButtonModal";
import EmSpan from "../common/EmSpan";
import WhiteBox from "../common/WhiteBox";
import CourseCard from "./CourseCard";
import { ICourseCard, IKakaoMapPoint } from "@/types/course";
import KakaoMapView from "./KakaoMapView";

const CourseCreate = ({ goToList }: { goToList: () => void }) => {
  const { data: courseCount, refetch } = useQuery({
    queryKey: ["courseCount"],
    queryFn: getCourseCount,
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const textInfo = useRef<string[]>(["", ""]);
  const [courseInfo, setCourseInfo] = useState<ICourseCard[]>([
    { place: null, text: "", image: null },
    { place: null, text: "", image: null },
  ]);

  const isAlreadyCertified = courseCount && courseCount >= 2;
  const places = useMemo(
    () =>
      courseInfo
        .filter((p) => p.place !== null)
        .map((p) => p.place!) as IKakaoMapPoint[],
    [courseInfo]
  );

  const checkCompletedCourses = (res: ICourseCard[]) => {
    for (let i = 0; i < res.length; i++) {
      const course = res[i];
      if (!course.place || !course.text.trim()) {
        return false;
      }
      if (i == 0 || i == res.length - 1) {
        if (!course.image) {
          return false;
        }
      }
    }
    return true;
  };

  const onSubmit = async () => {
    const res = courseInfo.map((v, idx) => ({
      ...v,
      text: textInfo.current[idx] || v.text,
    }));

    if (checkCompletedCourses(res) === false) {
      setShowError(true);
      setErrorModalIsOpen(true);
      return;
    }

    try {
      setLoading(true);
      await createCourse(res);
      setModalIsOpen(true);
    } catch (error) {
      console.error("Error creating course:", error);
      alert("코스 추천에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

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
          className={`bg-green-200 rounded-2xl h-[174px] w-full flex items-center justify-center`}
        >
          <KakaoMapView places={places} />
        </div>
        {courseInfo.map((v, idx) => {
          const position =
            idx === 0
              ? "start"
              : idx === courseInfo.length - 1
                ? "end"
                : "stopover";
          return (
            <CourseCard
              info={{
                place: v.place,
                text: textInfo.current[idx] || v.text,
                image: v.image,
              }}
              idx={idx + 1}
              key={idx}
              position={position}
              setInfo={(newInfo: ICourseCard) => {
                const updatedCourseInfo = [...courseInfo];
                updatedCourseInfo[idx] = newInfo;
                setCourseInfo(updatedCourseInfo);
              }}
              setTextInfo={(text: string) => {
                textInfo.current[idx] = text;
              }}
              removeCourse={() => {
                const updatedCourseInfo = courseInfo.filter(
                  (_, courseIdx) => courseIdx !== idx
                );
                setCourseInfo(updatedCourseInfo);
              }}
              addNextCourse={() => {
                if (courseInfo.length >= 4) return;
                //전체 배열에서 뒤에서 두번째 인덱스에 추가
                const updatedCourseInfo = [...courseInfo];
                updatedCourseInfo.splice(-1, 0, {
                  place: null,
                  text: "",
                  image: null,
                });
                setCourseInfo(updatedCourseInfo);
              }}
              courseLength={courseInfo.length}
              showError={showError}
            />
          );
        })}
        <button
          className={`${isAlreadyCertified ? "bg-gray-lightest text-gray-medium" : "bg-contrast-dark text-white cursor-pointer"} p-4 rounded-xl text-center text-lg font-bold mt-4`}
          disabled={!!isAlreadyCertified || loading}
          onClick={() => {
            if (!loading) onSubmit();
          }}
        >
          {isAlreadyCertified ? "코스 추천 제출 완료" : "코스 추천 제출하기"}
        </button>
      </div>
    </div>
  );
};

export default CourseCreate;
