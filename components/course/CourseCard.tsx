import PhotoIcon from "@/public/icons/PhotoIcon";
import { ICourseCard, IKakaoMapPoint } from "@/types/course";
import Image from "next/image";
import { RefObject, useCallback, useReducer, useState } from "react";
import CourseSearch from "./CourseSearch";
import ReactModal from "react-modal";

interface ICourseCardProps {
  idx: number;
  info: {
    place: IKakaoMapPoint | null;
    text: string;
    image: File | null;
    preview?: string | null;
    id: string;
  };
  position?: "start" | "end" | "stopover";
  courseLength?: number;
  showError?: boolean;
  setInfo?: (course: ICourseCard) => void;
  removeCourse?: () => void;
  addNextCourse?: () => void;
  readOnly?: boolean;
}

const CourseCard = ({
  idx,
  info: { place, text, image, preview, id },
  position,
  courseLength,
  showError,
  setInfo,
  removeCourse,
  addNextCourse,
  readOnly = false,
}: ICourseCardProps) => {
  const [openSearchModal, setOpenSearchModal] = useState(false);

  const errorInfo = {
    place: showError && !place,
    text: showError && (!text || text.trim() === ""),
    image: showError && (position === "start" || position === "end") && !image,
    hasError:
      showError &&
      (!place ||
        !text ||
        text.trim() === "" ||
        ((position === "start" || position === "end") && !image)),
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return;
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInfo?.({
          place,
          text,
          image: file,
          preview: reader.result as string,
          id,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const onChangeText = (s: string) => {
    setInfo?.({ text: s, image, preview, place, id });
  };

  return (
    <>
      {!readOnly && (
        <ReactModal
          isOpen={openSearchModal}
          ariaHideApp={false}
          className="max-w-[460px] mx-auto p-6 bg-white rounded-lg shadow-lg outline-none h-[100vh]"
          style={{
            overlay: { zIndex: 2000 },
            content: { zIndex: 2100 },
          }}
        >
          <CourseSearch
            onClose={() => setOpenSearchModal(false)}
            defaultPlace={place}
            onSelect={(newPlace: IKakaoMapPoint) => {
              setInfo?.({ image, place: newPlace, text, preview, id });
              setOpenSearchModal(false);
            }}
          />
        </ReactModal>
      )}
      <div className="flex flex-row align-center gap-2 bg-white relative">
        <div className="flex flex-col justify-center">
          <div className="bg-contrast w-[32px] h-[32px] rounded-full text-center leading-7 text-white font-bold absolute">
            {idx}
          </div>
        </div>

        <div
          className={`flex flex-row gap-3 p-3 border-[1.5px] ${errorInfo.hasError ? "border-contrast-dark" : "border-gray-light"}   w-full ml-2 pl-5`}
        >
          {preview ? (
            <label
              className="h-full xxs:w-[74px] xs:w-[96px] bg-gray-lightest rounded-xl flex items-center justify-center p-1 text-white cursor-pointer overflow-hidden relative"
              htmlFor={`image-${idx}`}
            >
              <Image
                src={preview}
                alt="Course Image"
                layout="fill"
                objectFit="cover"
                className={`rounded-xl`}
              />
            </label>
          ) : (
            <label
              htmlFor={`image-${idx}`}
              className={`h-full xxs:w-[74px] xs:w-[96px] bg-gray-lightest rounded-xl flex flex-col items-center justify-center p-1 text-white cursor-pointer ${errorInfo.image ? "border-1 border-contrast-dark" : ""}`}
            >
              <PhotoIcon color={"#969696"} />
            </label>
          )}
          <input
            type="file"
            id={`image-${idx}`}
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              if (readOnly) return;
              onChangeFile(e);
            }}
            disabled={readOnly}
          />
          <div className="flex flex-col flex-1 gap-1">
            <div
              className="flex flex-row justify-between cursor-pointer"
              onClick={() => {
                if (readOnly) return;
                setOpenSearchModal(true);
              }}
            >
              {place ? (
                <div className="leading-7 text-lg cursor-pointer">
                  {place.place_name}
                </div>
              ) : (
                <div className="flex flex-row gap-1">
                  <div className="leading-7 text-gray-medium text-lg ">
                    {position === "start"
                      ? "출발지 선택"
                      : position === "end"
                        ? "도착지 선택"
                        : "경유지 선택"}
                  </div>
                  <Image
                    src={"/icons/search.svg"}
                    alt="장소 검색"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                  />
                </div>
              )}

              {!readOnly && position === "stopover" && (
                <div
                  className="bg-contrast-dark px-2 rounded-full h-full aspect-square text-center text-white leading-7 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeCourse?.();
                  }}
                >
                  −
                </div>
              )}
              {!readOnly && position === "end" && (courseLength ?? 0) < 4 && (
                <div
                  className="bg-contrast-dark px-2 rounded-full h-full aspect-square text-center text-white leading-7 text-xl cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    addNextCourse?.();
                  }}
                >
                  +
                </div>
              )}
            </div>
            <textarea
              readOnly={readOnly}
              defaultValue={text}
              className={`border-[1.5px] w-full resize-none ${errorInfo.text ? "border-contrast-dark" : "border-gray-light"} p-2 focus:border-contrast-dark`}
              placeholder="추천 이유를 작성해주세요"
              onChange={(e) => onChangeText(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
