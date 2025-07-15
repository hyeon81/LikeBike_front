import { getImages } from "@/api/getImages";
import BikeLog from "./BikeLog";
import { useQuery } from "@tanstack/react-query";

const BikeLogList = () => {
  const { data } = useQuery({
    queryKey: ["bikeLogs"],
    queryFn: getImages,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  // 응답 데이터에서 이미지 URL 추출
  const images =
    data && Array.isArray(data[0]?.files)
      ? data[0].files.map((file: any) => file.url)
      : [];

  return (
    <div className="flex flex-col gap-4">
      {images.length === 0 && <div>이미지가 없습니다.</div>}
      {images.map((url: string, idx: number) => (
        <BikeLog key={idx} imageUrl={url} />
      ))}
    </div>
  );
};

export default BikeLogList;
