import Image from "next/image";
import { useRouter } from "next/navigation";

const RewardMain = () => {
  const router = useRouter();
  return (
    <div className="cursor-default p-8 bg-[rgba(230,230,230,0.4)] rounded-[32px] flex flex-col items-center justify-center">
      <div className="mb-4 font-medium">
        <span className="underline">권호정</span> 님의 자전거 타기 레벨은{" "}
        <span className="underline">관심인</span> 입니다.
      </div>

      <div className="w-full h-[5vh] bg-white border border-black mb-4 flex items-center">
        <div
          className="h-full border-r border-black"
          style={{
            width: "50%",
            backgroundColor: "rgba(0,180,147,0.5)",
          }}
        />
      </div>

      <div className="flex flex-row gap-4 w-full mt-4">
        <button
          className="w-full h-full rounded-[32px] flex flex-row items-center justify-center gap-2 text-white bg-[#969696] text-xs"
          onClick={() => {
            location.href = process.env.NEXT_PUBLIC_LEVEL_GUIDE_URL ?? "";
          }}
        >
          <Image src="/icons/notice.svg" alt="notice" width={16} height={16} />
          <span className="text-center">자전거 타기 레벨 안내</span>
        </button>
        <button
          className="w-full h-full rounded-[32px] flex flex-row items-center justify-center gap-2 text-white bg-[#00B493] text-xs"
          onClick={() => router.push("/reward")}
        >
          자전거 타기 레벨 점수 내역
        </button>
      </div>
    </div>
  );
};

export default RewardMain;
