import { useRouter } from "next/navigation";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const NewsMain = () => {
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
        <div className="flex flex-col justify-center items-center h-full w-full bg-[#f0f0f0] min-h-[200px] rounded-[30px] relative">
          <Image
            alt="banner"
            fill
            src={"/images/bikebanner.png"}
            className="rounded-[30px] object-cover"
          />
        </div>
        <div className="flex flex-col justify-center items-center h-full w-full bg-[#f0f0f0] min-h-[200px] rounded-[30px] relative">
          두번째
        </div>
        <div className="flex flex-col justify-center items-center h-full w-full bg-[#f0f0f0] min-h-[200px] rounded-[30px] relative">
          세번째
        </div>
      </Slider>
    </div>
  );
};

export default NewsMain;
