"use client";

import ButtonModal from "@/components/common/ButtonModal";
import BikeLogMain from "@/components/main/BikeLogMain";
import CourseMain from "@/components/main/CourseMain";
import NewsMain from "@/components/main/NewsMain";
import QuizMain from "@/components/main/QuizMain";
import RewardMain from "@/components/main/RewardMain";
import { HAS_SEEN_MODAL } from "@/constant/storageName";
import { useEffect, useState } from "react";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col w-full h-full gap-6">
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
