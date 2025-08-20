import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Slider from "react-slick";

import { NewsItem } from "@/app/api/news/route";

const NewsTempMain = () => {
  return (
    <div className="cursor-pointer h-full min-h-[100px] slider-container">
      <Link
        href={`https://www.bikeseoul.com/customer/notice/noticeView.do?noticeSeq=4683&currentPageNo=1`}
      >
        <div className="flex flex-col justify-center items-center h-full w-full bg-[#f0f0f0] min-h-[170px] rounded-[30px] relative">
          <img
            alt="banner"
            className="rounded-[30px] object-cover"
            src={"/images/tempBanner.png"}
            width={"100%"}
            height={"100%"}
          />
        </div>
      </Link>
    </div>
  );
};

export default NewsTempMain;
