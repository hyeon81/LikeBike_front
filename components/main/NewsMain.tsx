import styled from "styled-components";
import { MainBaseContainer } from "./MainBase";
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
    <Container className="slider-container">
      <Slider {...settings}>
        <Content>
          <Image
            alt="banner"
            fill
            src={"/images/bikebanner.png"}
            style={{
              borderRadius: "30px",
            }}
          />
        </Content>
        <Content>두번째</Content>
        <Content>세번째</Content>
      </Slider>
    </Container>
  );
};

export default NewsMain;

const Container = styled.div`
  cursor: pointer;
  height: 100%;
  min-height: 100px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: #f0f0f0;
  min-height: 200px;
  border-radius: 30px;
  position: relative;
`;
