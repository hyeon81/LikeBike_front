import Image from "next/image";
import PhotoStatusCard from "./PhotoStatusCard";

const BikeLog = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <div className="flex flex-col gap-1">
      <div>자전거 타기 종료 2025-06-25, 13:58 ~ 18:00</div>
      <div className="flex flex-row gap-1">
        <PhotoStatusCard status="inprogress" text="자전거" imgUrl={imageUrl} />
        <PhotoStatusCard status="inprogress" text="안전모" imgUrl={imageUrl} />
      </div>
    </div>
  );
};

export default BikeLog;
