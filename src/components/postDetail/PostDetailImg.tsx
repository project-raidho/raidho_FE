import React from "react";
import styled from "styled-components";
import Slider from "react-slick";

import "../../elements/slider/slick-theme.css";
import "../../elements/slider/slick.css";

interface images {
  images: string[];
}

const PostDetailImg = ({ images }: images) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <StPostDetilImg {...settings}>
      {images.map((img, index) => (
        <div className="imageBox" key={index}>
          <img className="slideImage" src={img} alt="stay slide" />
        </div>
      ))}
    </StPostDetilImg>
  );
};
export default PostDetailImg;

const StPostDetilImg = styled(Slider)`
  width: 99.7%;
  text-align: center;
  margin-bottom: 10px;
  .imageBox {
    width: 100%;
    max-width: 738px;
    height: 100%;
    max-height: 738px;
    img {
      display: block;
      width: auto;
      height: auto;
      max-width: 738px;
      max-height: 738px;
      min-width: 100%;
      object-fit: contain;
      margin: 0 auto;
      @media (max-width: 639px) {
        width: 80%;
      }
    }
  }
  .slick-prev {
    left: -30px;
    @media (max-width: 639px) {
      display: none;
    }
  }
  .slick-next {
    right: -30px;
    @media (max-width: 639px) {
      display: none;
      right: 0px;
    }
  }
`;
