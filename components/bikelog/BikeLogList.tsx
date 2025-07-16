import { useQuery } from "@tanstack/react-query";
import getBikeLog from "@/api/bikelog/getBikeLog";
import { IBikeLog } from "@/types/bikeLog";
import BikeLog from "./BikeLog";

const BikeLogList = () => {
  const { data } = useQuery<IBikeLog[]>({
    queryKey: ["bikeLogs"],
    queryFn: getBikeLog,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  console.log("BikeLogList data:", data);

  // 응답 데이터에서 이미지 URL 추출

  return (
    <div className="flex flex-col gap-6">
      {data?.map((log: IBikeLog, idx: number) => (
        <BikeLog key={idx} {...log} />
      ))}
    </div>
  );
};

export default BikeLogList;
