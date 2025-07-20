import { useState } from "react";
import Button from "../common/Button";
import ExampleStatusCard from "./ExampleStatusCard";
import Image from "next/image";
import createBikeLog from "@/apis/bikelog/createBikeLog";

const BubbleChat = ({ text }: { text: string }) => {
  return (
    <div className="relative flex justify-center">
      <div className="bg-text-primary rounded-4xl px-6 py-2 text-white shadow-md max-w-md absolute top-0 left-0">
        {text}
        <span className="absolute left-10 -bottom-4 w-0 h-0 border-l-[16px] border-l-transparent  border-r-transparent border-t-[16px] border-t-text-primary"></span>
      </div>
    </div>
  );
};

const BikeLogGuide = ({ setValue }: { setValue: (value: any) => void }) => {
  const [hatPreview, setHatPreview] = useState("");
  const [hatFile, setHatFile] = useState(null);
  const [bikePreview, setBikePreview] = useState("");
  const [bikeFile, setBikeFile] = useState(null);

  const handleCapture = (target: any) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setHatPreview(newUrl);
        setHatFile(file);
      }
    }
  };

  const handleBikeCapture = (target: any) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setBikePreview(newUrl);
        setBikeFile(file);
      }
    }
  };

  const handleUpload = async () => {
    if (hatFile && bikeFile) {
      try {
        await createBikeLog({
          bike_photo: bikeFile,
          safety_gear_photo: hatFile,
        });
        alert("자전거 타기 인증이 완료되었습니다!");
        setHatPreview("");
        setBikePreview("");
        setHatFile(null);
        setBikeFile(null);
        setValue(2); // 인증 내역 보기로 이동
      } catch (error) {
        alert("인증에 실패했습니다. 다시 시도해주세요: " + error);
      }
    } else {
      alert("모든 사진을 업로드해주세요!");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <BubbleChat text={"이렇게 인증해주세요!"} />
      <div className="bg-secondary-light p-3 text-center mt-8">
        ① 하단의 자전거 타기 인증{" "}
        <strong className="underline">[시작 버튼]</strong> 누르기
        <br />② 버튼을 누른 후{" "}
        <strong className="underline">[안전모+사용자, 자전거]</strong> 촬영하기
      </div>
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

      <div>
        <label
          htmlFor="hat-image"
          style={{
            cursor: "pointer",
            backgroundColor: "blue",
            color: "white",
          }}
        >
          안전모 인증
        </label>
        <input
          accept="image/*"
          id="hat-image"
          type="file"
          capture="environment"
          onChange={(e) => handleCapture(e.target)}
          style={{
            visibility: "hidden",
          }}
        />

        <div>안전모 미리 보기</div>
        {hatPreview && (
          <img src={hatPreview} alt={"snap"} width="500" height="500"></img>
        )}
      </div>
      <div>
        <label
          htmlFor="bike-image"
          style={{
            cursor: "pointer",
            backgroundColor: "blue",
            color: "white",
          }}
        >
          자전거 인증
        </label>
        <input
          accept="image/*"
          id="bike-image"
          type="file"
          capture="environment"
          onChange={(e) => handleBikeCapture(e.target)}
          style={{
            visibility: "hidden",
          }}
        />

        <div>자전거 미리 보기</div>
        {bikePreview && (
          <img src={bikePreview} alt={"snap"} width="500" height="500"></img>
        )}
      </div>

      <BubbleChat text={"여기 시작 버튼을 눌러주세요!"} />
      <button
        className="bg-secondary-light p-10 text-center mt-8 rounded-2xl cursor-pointer"
        onClick={handleUpload}
      >
        <div>아직 인증 점수를 받지 않았어요!</div>
        <div className="text-2xl font-bold">자전거 타기 인증 시작</div>
      </button>
    </div>
  );
};

export default BikeLogGuide;
