"use client";

import Button from "@/components/common/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <div>당신만의 코스를 공유해주세요!</div>
      <div>
        혼자 남몰래 간직하고 있었거나, 최근 새롭게 발견하여 안전하게 타기 좋은
        한강 따릉이 코스를 추천해주세요
      </div>
      <Button onClick={() => router.push("/course/create")}>시작</Button>
    </div>
  );
}
