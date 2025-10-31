import { useQuery } from "@tanstack/react-query";

import getBikeLog from "@/apis/bikelog/getBikeLog";
import { IBikeLog } from "@/types/bikeLog";

import BubbleChat from "../common/BubbleChat";
import EmSpan from "../common/EmSpan";
import WhiteBox from "../common/WhiteBox";
import BikeLog from "./BikeLog";

const BikeLogList = () => {
  const { data } = useQuery<IBikeLog[]>({
    queryKey: ["bikeLogs"],
    queryFn: getBikeLog,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  console.log("BikeLogList data:", data);

  return (
    <div className="flex flex-col gap-4">
      <BubbleChat text="‘인증 내역’ 이란?" />
      <WhiteBox>
        <div>
          ① <EmSpan> [기준에 부합한 사진]</EmSpan>인지 검토합니다.
        </div>
        <div>
          ② <EmSpan>[안전모+사용자, 자전거]</EmSpan> 모두가
          <br />
          인정되면 점수를 지급 받습니다.
        </div>
      </WhiteBox>
      <div className="flex flex-col gap-6">
        {data && data.length > 0 ? (
          data.map((log: IBikeLog, idx: number) => (
            <BikeLog key={idx} {...log} defaultOpen={idx === 0} />
          ))
        ) : (
          <div>아직 인증 내역이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default BikeLogList;
