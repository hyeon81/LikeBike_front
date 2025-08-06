"use client";

import BikeLogMain from "@/components/main/BikeLogMain";
import CourseMain from "@/components/main/CourseMain";
import NewsMain from "@/components/main/NewsMain";
import NewsTempMain from "@/components/main/NewsTempMain";
import QuizMain from "@/components/main/QuizMain";
import RewardMain from "@/components/main/RewardMain";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full gap-6">
      <RewardMain />
      <div className="grid grid-cols-2 gap-2 h-full">
        <BikeLogMain />
        <div className="flex flex-col gap-2 h-full">
          <QuizMain />
          <CourseMain />
        </div>
      </div>
      <NewsTempMain />
    </div>
  );
}
