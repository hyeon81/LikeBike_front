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

  useEffect(() => {
    const hasSeenModal = localStorage.getItem(HAS_SEEN_MODAL);
    if (!hasSeenModal) setModalOpen(true);
  }, []);

  return (
    <>
      <ButtonModal
        isOpen={true}
        buttonText="확인"
        contents={[
          "라이크바이크 서비스는",
          "2025년 8월 24일부로 종료되었습니다.",
          "리워드 관련 안내는",
          "등록된 연락처를 통해 개별 전달됩니다.",
          "그동안 이용해 주셔서 감사합니다. 🙏",
        ]}
        title="[서비스 종료 안내]"
        onClickButton={() => {
          localStorage.setItem(HAS_SEEN_MODAL, "true");
          setModalOpen(false);
        }}
        hasBackDrop={true}
        noButton={true}
      />
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
