import { getProfile } from "@/apis/user/getProfile";
import { REWARD_LEVEL } from "@/constant/rewardLevel";
import { useQueries, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const RewardMain = () => {
  const router = useRouter();
  const { data } = useQuery({ queryKey: ["profile"], queryFn: getProfile });

  const points = data?.experience_points;

  const level = useMemo(() => {
    if (!points) return undefined;
    if (points < 100) return REWARD_LEVEL[0];
    if (points < 200) return REWARD_LEVEL[1];
    if (points < 300) return REWARD_LEVEL[2];
    if (points < 400) return REWARD_LEVEL[3];
    if (points < 500) return REWARD_LEVEL[4];
    return REWARD_LEVEL[5];
  }, [points]);

  return (
    <div className="card">
      {data ? (
        <div className="mb-4 font-medium">
          <span className="underline">{data?.username}</span> 님의 자전거 레벨은{" "}
          <span className="underline">{level?.name}</span>{" "}
          <span className="underline">({points}</span>점)입니다.
        </div>
      ) : (
        <div className="mb-4 font-medium">
          <span className="underline">데이터 로딩에 실패했습니다.</span>
        </div>
      )}

      <div className="relative w-full h-[50px] bg-white border-2 border-black flex items-center ">
        <div className="absolute left-[20%] top-0 h-[48px] border-r border-black border-[1.5px] z-10"></div>
        <div className="absolute left-[40%] top-0 h-[48px] border-r border-black border-[1.5px] z-10"></div>
        <div className="absolute left-[60%] top-0 h-[48px] border-r border-black border-[1.5px] z-10"></div>
        <div className="absolute left-[80%] top-0 h-[48px] border-r border-black border-[1.5px] z-10"></div>
        <div
          className="h-[50px]"
          style={{
            width: `${((points ?? 0) / 500) * 100}%`,
            backgroundColor: `rgba(0,180,147,${(points ?? 0) / 500})`,
            borderRight: "1.5px solid black",
          }}
        />
      </div>
      <div className="flex flex-row justify-between text-xs text-center w-full mt-1">
        {REWARD_LEVEL.map((item, index) => (
          <div key={index}>
            <div className="-mx-3">
              {item.name} <br />({item.point}점)
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-row gap-4 w-full mt-4">
        <button
          className="w-full h-full rounded-[32px] flex flex-row items-center justify-center gap-2 text-white bg-[#969696] text-xs p-2 cursor-pointer"
          onClick={() => {
            location.href = process.env.NEXT_PUBLIC_LEVEL_GUIDE_URL ?? "";
          }}
        >
          <Image src="/icons/notice.svg" alt="notice" width={16} height={16} />
          <span className="text-center">자전거 레벨 안내</span>
        </button>
        <button
          className="w-full h-full rounded-[32px] flex flex-row items-center justify-center gap-2 text-white bg-[#00B493] text-xs p-2 cursor-pointer"
          onClick={() => router.push("/reward")}
        >
          자전거 레벨 점수 내역
        </button>
      </div>
    </div>
  );
};

export default RewardMain;
