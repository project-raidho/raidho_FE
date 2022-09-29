import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "../../elements/slider/slick-theme.css";
import "../../elements/slider/slick.css";
import Banner from "../../assets/banner/bannerContent.png";
import BannerBg from "../../assets/banner/bannerBg2.png";
import BannerBgMobile from "../../assets/banner/bannerMobile1.png";
import styled from "styled-components";

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
    <StMainBannerWrap>
      <Slider {...settings}>
        <div
          className="contentBox"
          onClick={() =>
            window.open(
              "https://docs.google.com/forms/d/e/1FAIpQLSehlJ0ZeaBeZFfhWEiwtUOozM6A4RoYig-kxUAxdWDI4T4XEA/viewform",
              "_blank"
            )
          }
        >
          <div className="centerBox">
            <img
              src={isMobile ? BannerBgMobile : Banner}
              alt="라이도 서비스를 이용해주시고 피드백을 남겨주세요."
            />
          </div>
        </div>
        <div className="contentBox">2</div>
        <div className="contentBox">3</div>
      </Slider>
    </StMainBannerWrap>
  );
};

export default MainBanner;

const StMainBannerWrap = styled.div`
  position: absolute;
  top: 55px;
  left: 0;
  width: 99.7%;
  height: 375px;
  background-color: var(--gray-color);
  background-image: url(${BannerBg});
  background-repeat: repeat-x;
  background-size: cover;
  .contentBox {
    text-align: center;
    line-height: 375px;
    width: 100%;
    height: 375px;
    cursor: pointer;
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
