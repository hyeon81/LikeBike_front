import Button from "@/components/common/Button";
import { Input } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import WhiteBox from "../common/WhiteBox";
import CommonModal from "../common/CommonModal";
import PrimaryBox from "../common/PrimaryBox";
import { createCourse } from "@/apis/course/createCourse";
import { useQuery } from "@tanstack/react-query";
import { getCourseCount } from "@/apis/course/getCourseCount";

const CourseCreate = ({ setValue }: { setValue: (status: number) => void }) => {
  const { data: courseCount } = useQuery({
    queryKey: ["courseCount"],
    queryFn: getCourseCount,
  });

  console.log("Course Status:", courseCount);
  const isAlreadyCertified = courseCount && courseCount > 0;

  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const locationName = useRef<HTMLInputElement>(null); // Placeholder for location name
  const review = useRef<HTMLTextAreaElement>(null); // Placeholder for review content

  const onSubmit = async () => {
    if (image) {
      console.log("Image submitted:", image);

      try {
        await createCourse({
          location_name: locationName.current?.value || "", // Replace with actual location name
          review: review.current?.value || "", // Replace with actual review
          photo: image,
        });
        setModalIsOpen(true);
      } catch (error) {
        console.error("Error creating course:", error);
        alert("코스 추천에 실패했습니다. 다시 시도해주세요.");
      }
    } else {
      alert("이미지를 업로드해주세요.");
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <CommonModal
        modalIsOpen={modalIsOpen}
        closeModal={() => setModalIsOpen(false)}
      >
        코스 추천하기를 N회차를 완료하셨습니다! <br />
        * 운영자 검토 후 1~2일 이내로 포인트가 적립됩니다. <br />* 베스트 코스는
        새소식을 통해 다른 사람에게도 공유됩니다!
        <div className="flex gap-2 mt-4">
          <Button
            onClick={() => {
              setModalIsOpen(false);
              router.push("/");
            }}
          >
            홈으로 돌아가기
          </Button>
          <Button
            onClick={() => {
              setModalIsOpen(false);
              setValue(2);
            }}
          >
            나의 인증 내역 보러가기
          </Button>
        </div>
      </CommonModal>
      <div className="flex flex-col gap-2">
        <WhiteBox>
          <div>코스를 추천하고, 추가 포인트를 얻어볼까요?</div>
          <div>나만의 장소와 이유를 소개하고, 공유해주세요!</div>
        </WhiteBox>
        <PrimaryBox>
          ① 장소 입력창에 장소 입력하기(ex: 난지 한강 공원) <br />② 촬영한
          사진을 업로드
          <br />③ 추천하는 이유를 30자 이하로 작성하기
        </PrimaryBox>
      </div>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="장소입력"
          maxLength={15}
          className="border border-gray-300 rounded-md p-2"
          ref={locationName}
        />
        <label
          htmlFor="file-upload"
          className="bg-secondary-light rounded-2xl h-[280px] w-full flex items-center justify-center cursor-pointer"
        >
          {imgPreview ? (
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image
                src={imgPreview}
                alt="Uploaded Image"
                className="object-cover rounded-2xl"
                layout="fill"
              />
            </div>
          ) : (
            <div className="text-3xl font-bold">사진 업로드하기</div>
          )}
        </label>
        <input
          type="file"
          accept="image/*"
          id="file-upload"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onloadend = () => {
                setImage(file);
                setImgPreview(reader.result as string);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
        <textarea
          placeholder="추천 이유를 입력해주세요 (30자 이내)"
          rows={4}
          maxLength={30}
          className="border border-gray-300 rounded-md p-2"
          ref={review}
        />
        <Button onClick={onSubmit}>인증하기</Button>
      </div>
    </div>
  );
};

export default CourseCreate;
