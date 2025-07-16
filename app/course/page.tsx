"use client";

import Button from "@/components/common/Button";
import { Input } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1 p-4 bg-gray-lightest rounded-2xl">
        <div>코스 추천 하고, 포인트 받기</div>
        <div>한강에서 추천하고 싶은 지역의 사진과 이유를 공유해 주세요</div>
      </div>
      <div className="flex flex-col gap-4">
        <input
          placeholder="장소입력"
          className="border border-gray-300 rounded-md p-2"
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
                setImage(reader.result as string);
                setImgPreview(reader.result as string);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
        <textarea
          placeholder="추천 이유를 입력해주세요 (30자 이내)"
          rows={4}
          className="border border-gray-300 rounded-md p-2"
        />
        <Button
          onClick={() => {
            if (image) {
              // Handle the submission logic here
              console.log("Image submitted:", image);
              alert(
                "코스 추천하기를 완료하셨습니다! \n운영자가 확인 후 1~2일 이내로 포인트가 적립됩니다. \n그리고 베스트 코스는 새소식을 통해 다른 사람에게도 공유됩니다!"
              );
              router.push("/");
            } else {
              alert("이미지를 업로드해주세요.");
            }
          }}
        >
          인증하기
        </Button>
      </div>
    </div>
  );
}
