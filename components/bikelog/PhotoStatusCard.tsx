import { LOG_STATUS } from "@/types/bikeLog";

interface Props {
  text: string;
  status: keyof typeof LOG_STATUS;
  imgUrl?: string;
}

const PhotoStatusCard = ({ text, status, imgUrl }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="w-full h-50 bg-black relative ">
        <div className="bg-white size-fit p-1 z-10 rounded-3xl absolute top-1 left-1 text-md">
          {text}
        </div>
        {imgUrl && (
          <img
            src={imgUrl}
            alt="인증 사진"
            style={{
              objectFit: "cover",
            }}
          />
        )}
        <div
          className={`absolute w-full bottom-0 ${LOG_STATUS[status]?.color} text-white text-center`}
        >
          {LOG_STATUS[status]?.text}
        </div>
      </div>
      <div>올바르게 인증했다면, 자동으로 자전거 타기 점수 20점이 적립돼요!</div>
    </div>
  );
};

export default PhotoStatusCard;
