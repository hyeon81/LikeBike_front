"use client";

import ButtonModal from "@/components/common/ButtonModal";
import BikeLogMain from "@/components/main/BikeLogMain";
import CourseMain from "@/components/main/CourseMain";
import NewsMain from "@/components/main/NewsMain";
import QuizMain from "@/components/main/QuizMain";
import RewardMain from "@/components/main/RewardMain";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const isBlock = dayjs().format("YYYY-MM-DD") == "2025-11-01";

  return (
    <>
      <ButtonModal
        isOpen={isBlock}
        buttonText="서비스 안내 보기"
        contents={[
          "내일 드디어 Likbike가 오픈합니다.",
          "서비스가 궁금하다면 지금 미리 살펴보세요!",
        ]}
        title="🎉 곧 만나요!"
        onClickButton={() => {
          router.push(
            `https://www.notion.so/22957842371d80f7a36dd27c1ec0d192?v=22757842371d80dab4ac000ce7a6f8c5&source=copy_link`
          );
        }}
        hasBackDrop={true}
      />
      <div className="flex flex-col w-full h-full gap-4 pb-3">
        <RewardMain />
        <div className="grid grid-cols-2 gap-2">
          <BikeLogMain />
          <div className="flex flex-col gap-2">
            <QuizMain />
            <CourseMain />
          </div>
        </div>
        <div>
          <NewsMain />
        </div>
      </div>
    </>
  );
}
