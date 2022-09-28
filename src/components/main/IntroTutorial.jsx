import React from "react";
import Slider from "react-slick";
import "../../elements/slider/slick-theme.css";
import "../../elements/slider/slick.css";

import styled from "styled-components";

const IntroTutorial = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <StIntroTutorialWrap>
      <Slider {...settings}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Slider>
    </StIntroTutorialWrap>
  );
};

export default IntroTutorial;

const StIntroTutorialWrap = styled.div``;
