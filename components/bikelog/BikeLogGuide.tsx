import { useRef, useState } from "react";
import Button from "../common/Button";
import ExampleStatusCard from "./ExampleStatusCard";
import Image from "next/image";
import createBikeLog from "@/apis/bikelog/createBikeLog";
import PrimaryBox from "../common/PrimaryBox";
import BubbleChat from "../common/BubbleChat";
import { useQuery } from "@tanstack/react-query";
import { getBikeCount } from "@/apis/bikelog/getBikeCount";
import UploadModal from "./UploadModal";
import ButtonModal from "../common/ButtonModal";
import WhiteBox from "../common/WhiteBox";
import EmSpan from "../common/EmSpan";
import imageCompression from "browser-image-compression";
import { EXAMPLE_IMAGES } from "@/constant/bikelog";

const BikeLogGuide = ({ setValue }: { setValue: (value: any) => void }) => {
  const hatFile = useRef<File | null>(null);
  const bikeFile = useRef<File | null>(null);
  const [hatUploadModalOpen, setHatUploadModalOpen] = useState(false);
  const [bikeUploadModalOpen, setBikeUploadModalOpen] = useState(false);
  const [completeModalOpen, setCompleteModalOpen] = useState(false);

  const { data: bikeCount } = useQuery({
    queryKey: ["bikeCount"],
    queryFn: getBikeCount,
  });

  const isAlreadyCertified = bikeCount && bikeCount > 0;

  const handleUpload = async () => {
    if (hatFile.current && bikeFile.current) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1000,
        useWebWorker: true,
      };

      try {
        const compressedbikeFile = await imageCompression(
          bikeFile.current,
          options
        );
        const compressedHatFile = await imageCompression(
          hatFile.current,
          options
        );

        // console.log("Compressed Files:", {
        //   bike: compressedbikeFile,
        //   hat: compressedHatFile,
        // });

        // console.log("size of bikeFile:", compressedbikeFile.size);
        // console.log("size of hatFile:", compressedHatFile.size);

        await createBikeLog({
          bike_photo: compressedbikeFile,
          safety_gear_photo: compressedHatFile,
        });
        alert("자전거 타기 인증이 완료되었습니다!");
        hatFile.current = null;
        bikeFile.current = null;
        setCompleteModalOpen(true);
      } catch (error) {
        alert("인증에 실패했습니다. 다시 시도해주세요: " + error);
      }
    } else {
      alert("모든 사진을 업로드해주세요!");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <ButtonModal
        title="‘자전거 타기 인증’ 완료!"
        contents={[
          "점수 지급에 1~2일이 소요됩니다.",
          "모든 사진 인정 시, 점수가 지급됩니다.",
        ]}
        isList
        buttonText="자전거 인증 내역 보기"
        onClickButton={() => {
          setValue(2);
          setCompleteModalOpen(false);
        }}
        isOpen={completeModalOpen}
      />
      <UploadModal
        upload={{
          title: "[안전모+사용자] 촬영",
          contents: [
            "안전모를 착용한 사용자 얼굴이",
            "보이는 정면 사진을 촬영",
          ],
          isOpen: hatUploadModalOpen,
          setOpen: setHatUploadModalOpen,
        }}
        confirm={{
          title: `[안전모+사용자]를 인증할까요?`,
          onOk: (file) => {
            hatFile.current = file;
            setHatUploadModalOpen(false);
            setBikeUploadModalOpen(true);
          },
        }}
      />
      <UploadModal
        upload={{
          title: "[자전거] 촬영",
          contents: [
            "브레이크, 벨, 전조등, 후미등, 거치대가",
            " 확인되는 자전거 사진을 촬영",
          ],
          isOpen: bikeUploadModalOpen,
          setOpen: setBikeUploadModalOpen,
        }}
        confirm={{
          title: `[자전거]를 인증할까요?`,
          onOk: async (file) => {
            bikeFile.current = file;
            setBikeUploadModalOpen(false);
            await handleUpload();
          },
        }}
      />
      <BubbleChat text={"이렇게 인증해주세요!"} />
      <WhiteBox>
        <div>
          ① 하단의 <EmSpan>[인증 시작]</EmSpan> 누르기
        </div>
        <div>
          ② <EmSpan>[안전모+사용자, 자전거]</EmSpan> 촬영하기
        </div>
      </WhiteBox>
      <BubbleChat text={"인증 기준"} />
      <div className="flex flex-row gap-2 overflow-x-auto">
        {EXAMPLE_IMAGES.map((v, idx) => (
          <div key={idx}>
            <ExampleStatusCard
              status={v.status ? "success" : "error"}
              chipText={v.chipText}
            >
              <Image
                src={`/images/bikelog/image${v.imageIdx}.png`}
                alt="example"
                width={120}
                height={160}
                className="object-cover h-full pb-4"
              />
            </ExampleStatusCard>
            <div className="text-xs mt-2 flex flex-col gap-1">
              <strong>[인증 {v.status ? "성공" : "실패"}] </strong>
              {v.description}
            </div>
          </div>
        ))}
      </div>

      <BubbleChat
        text={isAlreadyCertified ? "오늘 인증 완료!" : "버튼을 눌러주세요!"}
      />
      {isAlreadyCertified ? (
        <button className="bg-gray-lightest p-10 text-center rounded-2xl text-gray-medium">
          <div>하루 1번, 인증 할 수 있어요!</div>
          <div className="text-2xl font-bold">인증 완료</div>
        </button>
      ) : (
        <button
          className="bg-secondary-light p-10 text-center rounded-2xl cursor-pointer"
          onClick={() => setHatUploadModalOpen(true)}
        >
          <div>아직 점수를 받지 않았어요!</div>
          <div className="text-2xl font-bold">인증 시작</div>
        </button>
      )}
    </div>
  );
};

export default BikeLogGuide;
