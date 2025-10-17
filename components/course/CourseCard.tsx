import PhotoIcon from "@/public/icons/PhotoIcon";
import { ICourseCard, IPlace } from "@/types/course";
import Image from "next/image";
import { useState } from "react";
import CourseSearch from "./CourseSearch";
import ReactModal from "react-modal";

interface ICourseCardProps extends ICourseCard {
  idx: number;
  position: "start" | "end" | "stopover";
  setInfo: (course: ICourseCard) => void;
  removeCourse: () => void;
}

const CourseCard = ({
  idx,
  place,
  text,
  image,
  position,
  setInfo,
  removeCourse,
}: ICourseCardProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [openSearchModal, setOpenSearchModal] = useState(false);

  return (
    <>
      <ReactModal
        isOpen={openSearchModal}
        ariaHideApp={false}
        className="max-w-[460px] mx-auto p-6 bg-white rounded-lg shadow-lg outline-none h-full"
      >
        <CourseSearch
          onClose={() => setOpenSearchModal(false)}
          onSelect={(newPlace: IPlace) => {
            setInfo({ place: newPlace, text, image });
            setOpenSearchModal(false);
          }}
        />
      </ReactModal>
      <div className="flex flex-row align-center gap-2 bg-white">
        <div className="flex flex-col justify-center">
          <div className="bg-contrast w-[32px] h-[32px] rounded-full text-center leading-7 text-white font-bold absolute">
            {idx}
          </div>
        </div>
        <div className="flex flex-row gap-3 p-3 border-[1.5px] border-gray-light w-full ml-2 pl-5">
          {image ? (
            <label
              className="h-full xxs:w-[74px] xs:w-[96px] bg-gray-lightest rounded-xl flex items-center justify-center p-1 text-white cursor-pointer overflow-hidden relative"
              htmlFor={`image-${idx}`}
            >
              <Image
                src={preview}
                alt="Course Image"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </label>
          ) : (
            <label
              htmlFor={`image-${idx}`}
              className="h-full xxs:w-[74px] xs:w-[96px] bg-gray-lightest rounded-xl flex flex-col items-center justify-center p-1 text-white cursor-pointer"
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
              const file = e.target.files ? e.target.files[0] : null;
              setInfo({ place, text, image: file });
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setPreview(reader.result as string);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
          <div className="flex flex-col flex-1 gap-1">
            <div
              className="flex flex-row justify-between cursor-pointer"
              onClick={() => setOpenSearchModal(true)}
            >
              {place && place.place_name ? (
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

              {position === "stopover" && (
                <div
                  className="bg-contrast px-2 rounded-full h-full aspect-square text-center text-white leading-7 cursor-pointer"
                  onClick={removeCourse}
                >
                  −
                </div>
              )}
            </div>
            <textarea
              className="border-[1.5px] w-full resize-none border-gray-light p-2 focus:border-contrast"
              placeholder="추천 이유를 작성해주세요"
              value={text}
              onChange={(e) => {
                if (setInfo) setInfo({ place, text: e.target.value, image });
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
