import Image from "next/image";

import { LOG_STATUS } from "@/types/bikeLog";

interface Props {
  chipText?: string;
  status: keyof typeof LOG_STATUS;
  imgUrl?: string;
  // strongText: string
  text: string;
}

const PhotoStatusCard = ({
  chipText,
  status,
  imgUrl,
  // strongText,
  text,
}: Props) => {
  return (
    <div className="flex flex-col w-full">
      <div className="bg-black relative">
        {chipText && (
          <div className="bg-white size-fit p-1 z-10 rounded-3xl absolute top-2 left-2 text-xs font-normal">
            {chipText}
          </div>
        )}
        <div>
          {imgUrl && (
            <img
              alt="인증 사진"
              src={imgUrl}
              style={{
                objectFit: "cover",
                width: "150px",
                height: "160px",
              }}
            />
          )}
        </div>
      </div>
      <div
        className={`${LOG_STATUS[status]?.color} text-white text-center z-10`}
      >
        {LOG_STATUS[status]?.text}
      </div>
      <div className="text-sm flex flex-col gap-1 mt-2">
        {/* <strong>{strongText}</strong> */}
        <div className="font-normal">{text}</div>
      </div>
    </div>
  );
};

export default PhotoStatusCard;
