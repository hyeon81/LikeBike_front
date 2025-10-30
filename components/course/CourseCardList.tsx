import { Dispatch, SetStateAction, useCallback, useState } from "react";
import KakaoMapView from "./KakaoMapView";
import { createCourse } from "@/apis/course/createCourse";
import { ICourseCard, IKakaoMapPoint } from "@/types/course";
import CourseCard from "./CourseCard";

interface Props {
  courseCount: number | undefined;
  setErrorModalIsOpen: (value: boolean) => void;
  setModalIsOpen: (value: boolean) => void;
  placeInfo: (IKakaoMapPoint | null)[];
  setPlaceInfo: Dispatch<SetStateAction<(IKakaoMapPoint | null)[]>>;
}

export default function CourseCardList({
  courseCount,
  setErrorModalIsOpen,
  setModalIsOpen,
  placeInfo,
  setPlaceInfo,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const isAlreadyCertified = courseCount && courseCount >= 2;

  const [courseInfo, setCourseInfo] = useState<ICourseCard[]>([
    { place: null, text: "", image: null },
    { place: null, text: "", image: null },
  ]);

  const checkCompletedCourses = (res: ICourseCard[]) => {
    for (let i = 0; i < res.length; i++) {
      const course = res[i];
      if (!course.place || !course.text.trim()) return false;
      if ((i === 0 || i === res.length - 1) && !course.image) return false;
    }
    return true;
  };

  const onSubmit = async () => {
    const res = courseInfo.map((v, idx) => ({ ...v, place: placeInfo[idx] }));
    if (!checkCompletedCourses(res)) {
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

  const removeCourse = useCallback((selectedId: number) => {
    setCourseInfo((prev) => prev.filter((_, idx) => idx !== selectedId));
    setPlaceInfo((prev) => prev.filter((_, idx) => idx !== selectedId));
  }, []);

  const updateInfo = useCallback((newInfo: ICourseCard, index: number) => {
    setCourseInfo((prev) => {
      const updated = [...prev];
      updated[index] = newInfo;
      return updated;
    });
  }, []);

  const updatePlaceInfo = useCallback(
    (newPlace: IKakaoMapPoint | null, index: number) => {
      setPlaceInfo((prev) => {
        const updated = [...prev];
        updated[index] = newPlace;
        return updated;
      });
    },
    []
  );

  const addNextCourse = useCallback(() => {
    setCourseInfo((prev) => {
      if (prev.length >= 4) return prev;
      const updated = [...prev];
      updated.splice(-1, 0, {
        place: null,
        text: "",
        image: null,
        preview: null,
      });
      return updated;
    });

    setPlaceInfo((prev) => {
      if (prev.length >= 4) return prev;
      const updated = [...prev];
      updated.splice(-1, 0, null);
      return updated;
    });
  }, [courseInfo, placeInfo]);

  console.log("courseInfo", courseInfo, placeInfo);
  return (
    <>
      {courseInfo.map((v, idx) => {
        const position =
          idx === 0
            ? "start"
            : idx === courseInfo.length - 1
              ? "end"
              : "stopover";

        return (
          <CourseCard
            key={idx + v.text}
            idx={idx + 1}
            position={position}
            info={{
              place: placeInfo[idx],
              text: v.text,
              image: v.image,
              preview: v.preview,
            }}
            setInfo={(newInfo) => updateInfo(newInfo, idx)}
            setPlaceInfo={(newPlace) => updatePlaceInfo(newPlace, idx)}
            removeCourse={() => removeCourse(idx)}
            addNextCourse={addNextCourse}
            courseLength={courseInfo.length}
            showError={showError}
          />
        );
      })}

      <button
        className={`${
          isAlreadyCertified
            ? "bg-gray-lightest text-gray-medium"
            : "bg-contrast-dark text-white cursor-pointer"
        } p-4 rounded-xl text-center text-lg font-bold mt-4`}
        disabled={!!isAlreadyCertified || loading}
        onClick={() => {
          if (!loading) onSubmit();
        }}
      >
        {isAlreadyCertified ? "코스 추천 제출 완료" : "코스 추천 제출하기"}
      </button>
    </>
  );
}
