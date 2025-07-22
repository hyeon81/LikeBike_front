"use client";

import TabList from "@/components/common/TabList";
import CourseCreate from "@/components/course/CourseCreate";
import CourseList from "@/components/course/CourseList";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState(1);

  return (
    <div>
      <div className="flex">
        <TabList active={value == 1} onClick={() => setValue(1)}>
          인증하기
        </TabList>
        <TabList active={value == 2} onClick={() => setValue(2)}>
          인증 내역 보기
        </TabList>
      </div>
      <div className="bg-white p-4">
        {value == 1 ? <CourseCreate setValue={setValue} /> : <CourseList />}
      </div>
    </div>
  );
}
