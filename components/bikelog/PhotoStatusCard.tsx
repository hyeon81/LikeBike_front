import { LOG_STATUS } from "@/types/bikeLog";

interface Props {
  chipText?: string;
  status: keyof typeof LOG_STATUS;
  imgUrl?: string;
  strongText: string;
  text: string;
}

const PhotoStatusCard = ({
  chipText,
  status,
  imgUrl,
  strongText,
  text,
}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="w-full h-50 bg-black relative">
        {chipText && (
          <div className="bg-white size-fit p-1 z-10 rounded-3xl absolute top-1 left-1 chipText-md">
            {chipText}
          </div>
        )}
        {imgUrl && (
          <img
            src={imgUrl}
            alt="인증 사진"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
        )}
        <div
          className={`absolute w-full bottom-0 ${LOG_STATUS[status]?.color} text-white text-center`}
        >
          {LOG_STATUS[status]?.text}
        </div>
      </div>
      <div className="text-sm flex flex-col gap-1">
        <strong>{strongText}</strong>
        {text}
      </div>
    </div>
  );
};

export default PhotoStatusCard;
