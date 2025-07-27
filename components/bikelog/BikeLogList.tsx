import { useQuery } from "@tanstack/react-query";
import getBikeLog from "@/apis/bikelog/getBikeLog";
import { IBikeLog } from "@/types/bikeLog";
import BikeLog from "./BikeLog";
import BubbleChat from "../common/BubbleChat";
import PrimaryBox from "../common/PrimaryBox";
import WhiteBox from "../common/WhiteBox";
import EmSpan from "../common/EmSpan";

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
      <BubbleChat text={"‘인증 내역’ 이란?"} />
      <WhiteBox>
        <div>
          ① <EmSpan>[인증 기준]</EmSpan>에 부합한 사진인지 검토합니다.
        </div>
        <div>② 인증 사진은 ‘검토 중’ 상태로 전환됩니다.</div>
        <div>
          ③ 검토 완료 시 검토 결과를 <EmSpan>[O, X]</EmSpan>로 나타냅니다.
        </div>
        <div>
          ④ <EmSpan>[안전모+사용자, 자전거]</EmSpan> 촬영 사진 모두가
          <br />
          <EmSpan>[인증 성공]</EmSpan>일 경우 점수를 자동 지급합니다.
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
