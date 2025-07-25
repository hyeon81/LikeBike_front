import { getProfile } from "@/apis/user/getProfile";
import { useQueries, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";

const RewardMain = () => {
  const router = useRouter();
  const { data } = useQuery({ queryKey: ["profile"], queryFn: getProfile });

  console.log("RewardMain data", data);

  //   {
  //     "benefits": "기본 퀴즈 참여 가능",
  //     "created_at": "Mon, 21 Jul 2025 21:55:47 GMT",
  //     "description": "자전거 여행을 시작하는 단계",
  //     "email": "4356684687@kakao",
  //     "experience_points": 0,
  //     "id": 1,
  //     "level": 1,
  //     "level_name": "초보자",
  //     "points": 0,
  //     "profile_image_url": "http://k.kakaocdn.net/dn/bQdp6r/btsPiuqSQh9/Fr2uyPtH0L6JWKy8Z81NjK/img_640x640.jpg",
  //     "username": "김현지"
  // }
  return (
    <div className="cursor-default p-6 bg-[rgba(230,230,230,0.4)] rounded-[32px] flex flex-col items-center justify-center">
      <div className="mb-4 font-medium">
        <span className="underline">{data?.username}</span> 님의 자전거 타기
        레벨은 <span className="underline">{data?.level_name}</span>{" "}
        <span className="underline">({data?.points}</span>점)입니다.
      </div>

      <div className="relative w-full h-[50px] bg-white border-2 border-black mb-4 flex items-center ">
        <div className="absolute left-[20%] top-0 h-[48px] border-r border-black border-2 z-10"></div>
        <div className="absolute left-[40%] top-0 h-[48px] border-r border-black border-2 z-10"></div>
        <div className="absolute left-[60%] top-0 h-[48px] border-r border-black border-2 z-10"></div>
        <div className="absolute left-[80%] top-0 h-[48px] border-r border-black border-2 z-10"></div>
        <div
          className="border-r border-black h-[50px]"
          style={{
            width: `${(data?.experience_points ?? 0) / 400}%`,
            backgroundColor: "rgba(0,180,147,0.5)",
          }}
        />
      </div>

      <div className="flex flex-row gap-4 w-full mt-1">
        <button
          className="w-full h-full rounded-[32px] flex flex-row items-center justify-center gap-2 text-white bg-[#969696] text-xs p-2 cursor-pointer"
          onClick={() => {
            location.href = process.env.NEXT_PUBLIC_LEVEL_GUIDE_URL ?? "";
          }}
        >
          <Image src="/icons/notice.svg" alt="notice" width={16} height={16} />
          <span className="text-center">자전거 타기 레벨 안내</span>
        </button>
        <button
          className="w-full h-full rounded-[32px] flex flex-row items-center justify-center gap-2 text-white bg-[#00B493] text-xs p-2 cursor-pointer"
          onClick={() => router.push("/reward")}
        >
          자전거 타기 레벨 점수 내역
        </button>
      </div>
    </div>
  );
};

export default RewardMain;
