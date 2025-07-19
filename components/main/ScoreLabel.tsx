import Image from "next/image";

const ScoreLabel = () => {
  return (
    <div className="absolute flex flex-col justify-center items-center top-[-4px] right-7">
      <Image src={"/icons/union.svg"} width={54} height={41} alt="union" />
      <div className="absolute top-2 text-white text-xs">+10점</div>
    </div>
  );
};

export default ScoreLabel;
