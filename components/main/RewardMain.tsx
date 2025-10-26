"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMemo, useEffect, useState } from "react";
import { getProfile } from "@/apis/user/getProfile";
import { REWARD_LEVEL } from "@/constant/rewardLevel";

const RewardMain = () => {
  const router = useRouter();
  const { data } = useQuery({ queryKey: ["profile"], queryFn: getProfile });
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const points = data?.experience_points;

  // ✅ localStorage 접근은 useEffect 내부에서
  useEffect(() => {
    if (typeof window !== "undefined") {
      setAccessToken(localStorage.getItem("accessToken"));
    }
  }, []);

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
          <span>
            (<span className="underline">{points}</span>점)
          </span>
          입니다.
        </div>
      ) : accessToken ? (
        <div className="mb-4 font-medium">
          <span className="underline">데이터 로딩에 실패했습니다.</span>
        </div>
      ) : (
        <div className="mb-4 font-medium">
          <span
            className="underline cursor-pointer"
            onClick={() => router.push("/signin")}
          >
            서비스 이용을 하려면 로그인이 필요합니다
          </span>
        </div>
      )}

      <div className="relative w-full h-[50px] bg-transparent border-2 border-black flex items-center z-10">
        {[20, 40, 60, 80].map((pos) => (
          <div
            key={pos}
            className="absolute top-0 h-[48px] border-r border-black border-[1.5px] z-10"
            style={{ left: `${pos}%` }}
          />
        ))}
        <div
          className="h-[50px] border-2 border-black border-r-0 border-l-0"
          style={{
            width: `${((points ?? 0) / 500) * 100}%`,
            backgroundColor: `rgba(0,180,147,${level?.opacity ?? 0})`,
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

      <div className="flex flex-row gap-4 w-full mt-4 items-center justify-between">
        <button
          className="h-full rounded-[32px] flex flex-row items-center justify-center gap-2 text-white bg-[#969696] text-xs px-4 py-2 cursor-pointer"
          onClick={() =>
            (location.href = process.env.NEXT_PUBLIC_LEVEL_GUIDE_URL ?? "")
          }
        >
          <img alt="notice" height={16} src="/icons/notice.svg" width={16} />
          <span className="text-center">레벨 안내</span>
        </button>
        <button
          className="h-full rounded-[32px] flex flex-row items-center justify-center gap-2 text-white bg-[#00B493] text-xs px-4 py-2 cursor-pointer"
          onClick={() => router.push("/reward")}
        >
          점수 내역
        </button>
      </div>
    </div>
  );
};

export default RewardMain;
