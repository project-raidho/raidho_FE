import React from "react";
import Slider from "react-slick";
import "../../elements/slider/slick-theme.css";
import "../../elements/slider/slick.css";
import styled from "styled-components";

const MainBanner = () => {
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
        <div className="contentBox">1</div>
        <div className="contentBox">2</div>
        <div className="contentBox">3</div>
      </Slider>
    </StMainBannerWrap>
  );
};

export default MainBanner;

const StMainBannerWrap = styled.div`
  position: absolute;
  top: 70px;
  left: 0;
  width: 100%;
  height: 375px;
  background-color: var(--gray-color);

  .contentBox {
    text-align: center;
    line-height: 375px;
    width: 100%;
    height: 375px;
  }
`;
