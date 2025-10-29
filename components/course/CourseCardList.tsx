import { useCallback, useMemo, useRef, useState } from "react";
import KakaoMapView from "./KakaoMapView";
import { createCourse } from "@/apis/course/createCourse";
import { ICourseCard, IKakaoMapPoint } from "@/types/course";
import CourseCard from "./CourseCard";

interface Props {
  courseCount: number | undefined;
  setErrorModalIsOpen: (value: boolean) => void;
  setModalIsOpen: (value: boolean) => void;
}

export default function CourseCardList({
  courseCount,
  setErrorModalIsOpen,
  setModalIsOpen,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const isAlreadyCertified = courseCount && courseCount >= 2;
  const [courseInfo, setCourseInfo] = useState<ICourseCard[]>([
    { place: null, text: "", image: null },
    {
      place: null,
      text: "",
      image: null,
    },
  ]);

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
    const res = courseInfo;

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

  const removeCourse = useCallback(
    (selectedId: number) => {
      const updatedCourseInfo = courseInfo.filter(
        (_, idx) => idx !== selectedId
      );
      setCourseInfo(updatedCourseInfo);
    },
    [courseInfo]
  );

  const setInfo = useCallback(
    (newInfo: ICourseCard, index: number) => {
      const updatedCourseInfo = [...courseInfo];
      updatedCourseInfo[index] = newInfo;
      setCourseInfo(updatedCourseInfo);
    },
    [courseInfo]
  );

  const addNextCourse = useCallback(() => {
    if (courseInfo.length >= 4) return;
    //전체 배열에서 뒤에서 두번째 인덱스에 추가
    const updatedCourseInfo = [...courseInfo];
    updatedCourseInfo.splice(-1, 0, {
      place: null,
      text: "",
      image: null,
      preview: null,
    });
    setCourseInfo(updatedCourseInfo);
  }, [courseInfo]);

  const places = useMemo(
    () =>
      courseInfo
        .filter((p) => p.place !== null)
        .map((p) => p.place!) as IKakaoMapPoint[],
    [courseInfo]
  );

  return (
    <div className="flex flex-col gap-4">
      <div
        className={`bg-gray-light rounded-2xl h-[174px] w-full flex items-center justify-center`}
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
              text: v.text,
              image: v.image,
              preview: v.preview,
            }}
            idx={idx + 1}
            key={idx}
            position={position}
            setInfo={(newInfo) => setInfo(newInfo, idx)}
            removeCourse={() => removeCourse(idx)}
            addNextCourse={addNextCourse}
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
  );
}
