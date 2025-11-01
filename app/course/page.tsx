"use client";

import { useQuery } from "@tanstack/react-query";
import { Suspense, useEffect, useRef, useState } from "react";

import { getCourse } from "@/apis/course/getCourse";
import TabList from "@/components/common/TabList";
import CourseList from "@/components/course/CourseList";
import CourseCreate from "@/components/course/CourseCreate";
import { ICourseCard } from "@/types/course";

export default function Home() {
  const [value, setValue] = useState(1);
  const { refetch } = useQuery({
    queryKey: ["courseList"],
    queryFn: getCourse,
  });

  return (
    <div>
      <div className="flex">
        <TabList active={value == 1} isRed onClick={() => setValue(1)}>
          추천하기
        </TabList>
        <TabList
          active={value == 2}
          isRed
          onClick={() => {
            setValue(2);
          }}
        >
          추천 내역 보기
        </TabList>
      </div>
      <div className="bg-white p-4 default-border">
        {value == 1 ? (
          <CourseCreate
            goToList={() => {
              refetch();
              setValue(2);
            }}
          />
        ) : (
          <Suspense>
            <CourseList />
          </Suspense>
        )}
      </div>
    </div>
  );
}
