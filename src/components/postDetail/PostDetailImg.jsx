import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const PostDetailImg = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <StyledSlide {...settings}>
      {images.map((img, index) => (
        <img className="slideImage" key={index} src={img} alt="stay slide" />
      ))}
    </StyledSlide>
  );
};
export default PostDetailImg;

const StyledSlide = styled(Slider)`
  max-width: 100%;
  max-height: 700px;
  text-align: center;
  margin-bottom: 10px;

  .slideImage {
    display: block;
    width: auto !important;
    max-width: 100%;
    height: 100% !important;
    margin: 0 auto !important;
  }

  .slick-slide {
    display: inline-block;
  }
  &:hover .slick-next {
    opacity: 1;
  }
  &:hover .slick-prev {
    opacity: 1;
  }
  .slick-list {
    margin-top: 50px;
    width: 100%;
    z-index: 3;
    overflow: hidden;
  }

  .slick-prev,
  .slick-next {
    z-index: 9999;
    width: 50px !important;
    opacity: 0;

    /* background-color: var(--title-color); */
  }

  .slick-prev {
    left: 5px;
  }
  .slick-next {
    right: 5px;
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 30px;
  }

  .slick-prev:hover:before,
  .slick-next:hover:before {
    /* color: white; */
    color: var(--title-color);
  }

  .slick-dots {
    margin-top: 5px;
    z-index: 999;
    position: relative;
    bottom: 10px;

    li button:before {
      color: #7188ff;
    }
  }
`;
