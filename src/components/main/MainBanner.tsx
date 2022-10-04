import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Slider from "react-slick";

import "../../elements/slider/slick-theme.css";
import "../../elements/slider/slick.css";

import Banner2 from "../../assets/banner/bannerContent2.png";
import BannerBg2 from "../../assets/banner/bannerBg2.png";
import Banner1 from "../../assets/banner/bannerContent1.png";
import BannerBg1 from "../../assets/banner/bannerBg1.png";
import BannerBgMobile1 from "../../assets/banner/bannerMobile1.png";
import BannerBgMobile2 from "../../assets/banner/bannerMobile2.png";

const MainBanner = () => {
  // ::: 모바일 여부 확인하기
  const [isMobile, setIsMobile] = useState(false);

  // ::: 디바이스 화면 크기 확인
  const checkDiviceWidth = () => {
    const browserWidth = window.innerWidth;
    browserWidth <= 639 ? setIsMobile(true) : setIsMobile(false);
  };

  useEffect(() => {
    checkDiviceWidth();
    window.addEventListener("resize", checkDiviceWidth);
    return () => {
      window.removeEventListener("resize", checkDiviceWidth);
    };
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <StMainBanner>
      <Slider {...settings}>
        <div className="contentBox contentBox1">
          <div className="centerBox">
            <img src={isMobile ? BannerBgMobile1 : Banner1} alt="라이도" />
          </div>
        </div>
        <div
          className="contentBox contentBox2"
          onClick={() =>
            window.open(
              "https://docs.google.com/forms/d/e/1FAIpQLSehlJ0ZeaBeZFfhWEiwtUOozM6A4RoYig-kxUAxdWDI4T4XEA/viewform",
              "_blank"
            )
          }
        >
          <div className="centerBox">
            <img
              src={isMobile ? BannerBgMobile2 : Banner2}
              alt="라이도 서비스를 이용해주시고 피드백을 남겨주세요."
            />
          </div>
        </div>
      </Slider>
    </StMainBanner>
  );
};

export default MainBanner;

const StMainBanner = styled.div`
  position: absolute;
  top: 55px;
  left: 0;
  width: 99.7%;
  height: 375px;
  background-image: url(${BannerBg1});
  background-repeat: repeat-x;
  background-size: cover;

  .contentBox {
    text-align: center;
    line-height: 375px;
    width: 100%;
    height: 375px;
    background-repeat: repeat-x;
    background-size: cover;
    cursor: pointer;
    &.contentBox1 {
      background-image: url(${BannerBg1});
    }
    &.contentBox2 {
      background-image: url(${BannerBg2});
    }
    .centerBox {
      width: auto;
      max-width: 1305px;
      height: 100%;
      margin: 0 auto;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }

  @media (max-width: 639px) {
    height: 300px;
    .contentBox {
      height: 300px;
      line-height: 1;
      &.contentBox1 {
        background-size: auto 100%;
        background-position-x: 45%;
      }
      &.contentBox2 {
        background-size: auto 100%;
        background-position-x: 35%;
      }
      .centerBox {
        width: 100%;
        max-width: 300px;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
  }
`;
