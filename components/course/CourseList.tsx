import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { getCourse } from "@/apis/course/getCourse";
import { LOG_STATUS } from "@/types/bikeLog";

import PhotoStatusCard from "../bikelog/PhotoStatusCard";
import BubbleChat from "../common/BubbleChat";
import EmSpan from "../common/EmSpan";
import ToggleContent from "../common/ToggleContent";
import WhiteBox from "../common/WhiteBox";

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
          <div>② 코스 추천은 ‘검토 중’ 상태로 전환됩니다.</div>
          <div>
            ③ 검토 결과를 <EmSpan>[O, X]</EmSpan>로 나타냅니다.
          </div>
          <div>
            ④ <EmSpan>[풍경 사진, 추천 이유]</EmSpan> 모두가 <br />
            인정되면 점수를 지급 받습니다.
          </div>
        </WhiteBox>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {data && data.length > 0 ? (
          data.map(
            (
              {
                id,
                created_at,
                status,
                photo_url,
                location_name,
                review,
                admin_notes,
              },
              idx
            ) => (
              <ToggleContent
                key={id}
                defaultValue={idx === 0}
                title={`[${LOG_STATUS[status as keyof typeof LOG_STATUS].text}] ${dayjs(created_at?.replace("GMT", "")).format("YYYY-MM-DD, A hh시 mm분")}`}
              >
                <div className="flex flex-row gap-4 px-8 pt-2">
                  <div className="w-[150px]">
                    <PhotoStatusCard
                      chipText={location_name}
                      imgUrl={photo_url}
                      status={status as keyof typeof LOG_STATUS}
                      text={
                        status === "pending"
                          ? "올바르게 인증했다면, 자동으로 코스추천 점수 10점이 적립돼요!"
                          : status === "verified"
                            ? "코스추천 점수 10점 적립완료"
                            : admin_notes || ""
                      }
                    />
                  </div>
                </div>
              </ToggleContent>
            )
          )
        ) : (
          <div>아직 인증 내역이 없습니다.</div>
        )}
      </div>
    </>
  );
};

export default CourseList;
