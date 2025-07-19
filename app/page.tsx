"use client";

import BikeLogMain from "@/components/main/BikeLogMain";
import CourseMain from "@/components/main/CourseMain";
import NewsMain from "@/components/main/NewsMain";
import QuizMain from "@/components/main/QuizMain";
import RewardMain from "@/components/main/RewardMain";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full gap-6">
      <RewardMain />
      <div className="flex flex-row gap-4 h-full">
        <BikeLogMain />
        <div className="flex flex-1 flex-col gap-4">
          <QuizMain />
          <CourseMain />
        </div>
      </div>
      <NewsMain />
    </div>
  );
}
