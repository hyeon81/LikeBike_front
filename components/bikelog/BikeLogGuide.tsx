import { useState } from "react";
import Button from "../common/Button";
import ExampleStatusCard from "./ExampleStatusCard";

const BikeLogGuide = () => {
  const [hatPreview, setHatPreview] = useState("");
  const [hatFile, setHatFile] = useState(null);
  const [bikePreview, setBikePreview] = useState("");
  const [bikeFile, setBikeFile] = useState(null);

  const handleCapture = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setHatPreview(newUrl);
        setHatFile(file);
      }
    }
  };

  const handleBikeCapture = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setBikePreview(newUrl);
        setBikeFile(file);
      }
    }
  };

  const handleUpload = () => {
    //api call
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        - [6시 ~ 22시] 사이에 [1시간 이상] 자전거 타기
        <br />- 버튼을 누른 후 [안전모, 자전거] 촬영하기
      </div>
      <div>인증하기 예시</div>
      <div className="flex flex-row gap-2">
        {[1, 2, 3, 4].map((v) => (
          <ExampleStatusCard status="success" chipText="안전모" />
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
      <Button onClick={handleUpload}>확인</Button>
    </div>
  );
};

export default BikeLogGuide;
