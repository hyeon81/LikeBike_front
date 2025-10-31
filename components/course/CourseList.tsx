import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { getCourse } from "@/apis/course/getCourse";
import { LOG_STATUS } from "@/types/bikeLog";

import PhotoStatusCard from "../bikelog/PhotoStatusCard";
import BubbleChat from "../common/BubbleChat";
import EmSpan from "../common/EmSpan";
import ToggleContent from "../common/ToggleContent";
import WhiteBox from "../common/WhiteBox";
import CourseViewer from "./CourseViewer";
import { useState } from "react";
import CourseListElement from "./CourseListElement";

// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dayjs/locale/ko");
dayjs.locale("ko");

const CourseList = () => {
  const { data } = useQuery({
    queryKey: ["courseList"],
    queryFn: getCourse,
  });

  return (
    <>
      <div className="flex flex-col gap-4">
        <BubbleChat text="‘추천 내역’ 이란?" />
        <WhiteBox>
          <div>
            ① <EmSpan>[올바른 코스 추천]</EmSpan>인지 검토합니다.
          </div>
          <div>② <EmSpan>[코스, 추천 이유]</EmSpan> 모두가 인정되면 <br/>점수를 지급받습니다.</div>
          <div>
            ③ <EmSpan>[전체 코스 추천]</EmSpan> 은 <br/>썸네일을 눌러 확인 가능합니다.
          </div>
        </WhiteBox>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {data && data.length > 0 ? (
          data.map((v, idx) => {
            return <CourseListElement key={v.id} v={v} idx={idx} />;
          })
        ) : (
          <div>아직 인증 내역이 없습니다.</div>
        )}
      </div>
    </>
  );
};

export default CourseList;
