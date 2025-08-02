import Image from "next/image";
import PhotoStatusCard from "./PhotoStatusCard";
import { IBikeLog, LOG_STATUS, UserBikeLog } from "@/types/bikeLog";
import dayjs from "dayjs";
import ToggleContent from "../common/ToggleContent";

require("dayjs/locale/ko");
dayjs.locale("ko");

const BikeLog = ({
  bike_photo_url,
  safety_gear_photo_url,
  verification_status,
  started_at,
  defaultOpen,
}: UserBikeLog & {
  defaultOpen?: boolean;
}) => {
  return (
    <ToggleContent
      defaultValue={defaultOpen}
      title={`[${LOG_STATUS[verification_status].text}] ${dayjs(started_at?.replace("GMT", "")).format("YYYY-MM-DD, A hh시 mm분")}`}
    >
      <div className="flex flex-row gap-4 px-10 pt-2">
        <PhotoStatusCard
          status={verification_status}
          chipText="자전거+사용자"
          imgUrl={bike_photo_url}
          strongText="[-]"
          text={`올바르게 인증했다면, 자동으로 자전거 타기 점수 30점이 적립돼요!`}
        />
        <PhotoStatusCard
          status={verification_status}
          chipText="안전모"
          imgUrl={safety_gear_photo_url}
          strongText="[-]"
          text={`올바르게 인증했다면, 자동으로 자전거 타기 점수 30점이 적립돼요!`}
        />
      </div>
    </ToggleContent>
  );
};

export default BikeLog;
