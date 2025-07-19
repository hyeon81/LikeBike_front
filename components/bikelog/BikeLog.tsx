import Image from "next/image";
import PhotoStatusCard from "./PhotoStatusCard";
import { IBikeLog, LOG_STATUS, UserBikeLog } from "@/types/bikeLog";
import dayjs from "dayjs";

require("dayjs/locale/ko");
dayjs.locale("ko");

const BikeLog = ({
  bike_photo_url,
  safety_gear_photo_url,
  verification_status,
  started_at,
}: UserBikeLog) => {
  return (
    <div className="flex flex-col gap-1 items-center">
      <div className="font-bold">{`[${LOG_STATUS[verification_status].text}] ${dayjs(started_at).format("YYYY년 MM월 DD일, a hh시 mm분")}`}</div>
      <div className="flex flex-row gap-4 px-10">
        <PhotoStatusCard
          status={verification_status}
          text="자전거"
          imgUrl={bike_photo_url}
        />
        <PhotoStatusCard
          status={verification_status}
          text="안전모"
          imgUrl={safety_gear_photo_url}
        />
      </div>
    </div>
  );
};

export default BikeLog;
