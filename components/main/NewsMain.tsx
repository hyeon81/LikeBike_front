import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Slider from "react-slick";

import { NewsItem } from "@/app/api/news/route";

const NewsMain = () => {
  const router = useRouter();

  const getNewsFromNotion = async () => {
    // Fetch news data from Notion API
    const response = await fetch("/api/news");
    if (!response.ok) {
      throw new Error("Failed to fetch news");
    }
    const data = await response.json();
    
    return data.reverse() as NewsItem[];
  };

  // react query를 사용하여 뉴스 데이터를 가져옴
  const { data: news, isLoading } = useQuery<NewsItem[] | undefined>({
    queryKey: ["news"],
    queryFn: getNewsFromNotion,
  });

  console.log("news", news);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <CircularProgress />
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="cursor-pointer h-full min-h-[100px] slider-container">
      <Slider {...settings}>
        {news?.map((item) => (
          <a key={item.id} href={`${item.url}`} rel="noopener noreferrer">
            <div
              key={item.id}
              className="flex flex-col justify-center items-center h-full w-full bg-[#f0f0f0] min-h-[170px] rounded-[30px] relative"
            >
              <Image
                alt="banner"
                className="rounded-[30px] object-cover"
                fill
                priority
                src={item?.thumbnail ?? "/icons/logo.png"}
              />
            </div>
          </a>
        ))}
      </Slider>
    </div>
  );
};

export default NewsMain;
