import React, { useState, useEffect } from "react";
import styled from "styled-components";

import "../../elements/slider/slick-theme.css";
import "../../elements/slider/slick.css";

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
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };
  return (
    <StMainBanner>
      {/* <Slider {...settings}> */}
      <div className="contentBox contentBox1">
        <div className="centerBox">
          <img
            src={
              isMobile
                ? "https://hgdjt-s3-bucket.s3.ap-northeast-2.amazonaws.com/raidho_member_image_4511665043216472.jpeg"
                : "https://hgdjt-s3-bucket.s3.ap-northeast-2.amazonaws.com/raidho_member_image_3451665043135358.jpeg"
            }
            alt="라이도"
          />
        </div>
      </div>
      {/* <div
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
        </div> */}
      {/* </Slider> */}
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
  /* background-image: url("https://hgdjt-s3-bucket.s3.ap-northeast-2.amazonaws.com/bannerBg1.png"); */
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
      background-image: url("https://hgdjt-s3-bucket.s3.ap-northeast-2.amazonaws.com/raidho_member_image_7191665043004888.jpeg");
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
