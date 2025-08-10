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
  const isBlock = dayjs().format("YYYY-MM-DD") == "2025-08-10";
  return (
    <>
      {/* <ButtonModal
        isOpen={isBlock}
        buttonText="서비스 안내 보기"
        contents={[
          "내일 드디어 Likbike가 오픈합니다.",
          "서비스가 궁금하다면 지금 미리 살펴보세요!",
        ]}
        title="🎉 곧 만나요!"
        onClickButton={() => {
          router.push(
            `https://bony-billboard-d87.notion.site/23557842371d805b9c13feea01333b03`
          );
        }}
        hasBackDrop={true}
      /> */}
      <div className="flex flex-col w-full h-full gap-6">
        <RewardMain />
        <div className="grid grid-cols-2 gap-2 h-full">
          <BikeLogMain />
          <div className="flex flex-col gap-2 h-full">
            <QuizMain />
            <CourseMain />
          </div>
        </div>
        <NewsMain />
      </div>
    </>
  );
}
