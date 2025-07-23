"use client";

import { getReward } from "@/apis/user/getReward";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

export default function Home() {
  const { data } = useQuery({
    queryKey: ["reward"],
    queryFn: getReward,
  });

  return (
    <div>
      <div className="flex flex-row items-end">
        <div className="text-lg font-bold">적립 내역</div>: 지난 기간 동안 적립
        된 포인트 내역을 볼 수 있어요.
      </div>
      <div className="mt-4">
        {data?.map((reward) => {
          const date = dayjs(reward.created_at).format("YYYY-MM-DD HH:mm");

          return (
            <div key={reward.id} className="flex flex-row justify-between ">
              <div>
                <p className="font-bold text-lg">{date}</p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-amber-600 font-bold text-lg">
                  +{reward.points}
                </p>
                <p className="text-gray-500">{reward.reward_reason}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
