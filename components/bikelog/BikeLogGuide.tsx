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

  console.log("bikeCount", bikeCount);

  const handleUpload = async () => {
    if (hatFile.current && bikeFile.current) {
      try {
        await createBikeLog({
          bike_photo: bikeFile.current,
          safety_gear_photo: hatFile.current,
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
    <div className="flex flex-col gap-5">
      <ButtonModal
        title="‘자전거 타기 인증’을 완료했어요"
        contents={[
          "점수 지급에 1~2일이 소요됩니다. (홈 > 자전거레벨 점수내역)",
          "[인증 내역 보기]에서 인증 결과를 확인할 수 있습니다.",
          "[안전모+사용자, 자전거] 모두 인증 성공 시, 점수가 지급됩니다",
        ]}
        buttonText="확인"
        onClickButton={() => {
          setValue(2);
          setCompleteModalOpen(false);
        }}
        isOpen={completeModalOpen}
      />
      <UploadModal
        upload={{
          title: "[안전모+사용자] 인증 사진 촬영",
          contents: [
            "안전모를 착용한 사용자 얼굴이 보이는",
            "정면 사진을 촬영해주세요.",
          ],
          isOpen: hatUploadModalOpen,
        }}
        confirm={{
          title: "아래 사진으로 [안전모+사용자]를 인증할까요?",
          onOk: (file) => {
            hatFile.current = file;
            setHatUploadModalOpen(false);
            setBikeUploadModalOpen(true);
          },
        }}
      />
      <UploadModal
        upload={{
          title: "[자전거] 인증 사진 촬영",
          contents: [
            "브레이크, 벨, 전조등, 후미등, 거치대가 확인되는",
            "자전거 사진을 촬영해주세요.",
          ],
          isOpen: bikeUploadModalOpen,
        }}
        confirm={{
          title: "아래 사진으로 [자전거]를 인증할까요?",
          onOk: async (file) => {
            bikeFile.current = file;
            setBikeUploadModalOpen(false);
            await handleUpload();
          },
        }}
      />
      <BubbleChat text={"이렇게 인증해주세요!"} />
      <PrimaryBox>
        ① 하단의 자전거 타기 인증{" "}
        <strong className="underline">[시작 버튼]</strong> 누르기
        <br />② 버튼을 누른 후{" "}
        <strong className="underline">[안전모+사용자, 자전거]</strong> 촬영하기
      </PrimaryBox>
      <BubbleChat text={"인증 기준"} />
      <div className="flex flex-row gap-2 overflow-x-auto">
        {[1, 2, 3, 4].map((v) => (
          <div key={v}>
            <ExampleStatusCard status="success" chipText="안전모+사용자" />
            <div className="text-xs mt-2 flex flex-col gap-1">
              <strong>[인증 성공] </strong>
              안전모를 착용한 사용자 얼굴이 보이는 정면 사진
            </div>
          </div>
        ))}
      </div>

      <BubbleChat text={"여기 시작 버튼을 눌러주세요!"} />
      <button
        className="bg-secondary-light p-10 text-center rounded-2xl cursor-pointer"
        onClick={() => setHatUploadModalOpen(true)}
      >
        <div>아직 인증 점수를 받지 않았어요!</div>
        <div className="text-2xl font-bold">자전거 타기 인증 시작</div>
      </button>
    </div>
  );
};

export default BikeLogGuide;
