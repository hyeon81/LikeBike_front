interface Props {
  text: string;
  status: "inprogress" | "success" | "error";
}

const PhotoStatusCard = ({ text, status }: Props) => {
  const statusValue = {
    inprogress: {
      text: "검토 중",
      color: "bg-orange-500",
    },
    success: {
      text: "지급 완료",
      color: "bg-green-500",
    },
    error: {
      text: "지급 실패",
      color: "bg-red-500",
    },
  };
  return (
    <div className="w-24 h-36 bg-black relative ">
      <div className="bg-white border-1 size-fit p-1 z-10">{text}</div>
      <div
        className={`absolute w-full bottom-0 ${statusValue[status]?.color ?? "bg-orange-500"} text-white text-center`}
      >
        {statusValue[status]?.text ?? "검토 중"}
      </div>
    </div>
  );
};

export default PhotoStatusCard;
