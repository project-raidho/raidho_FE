import styled from "styled-components";
import "../../elements/slider/slick-theme.css";
import "../../elements/slider/slick.css";
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
    <StyledSlider {...settings}>
      {images.map((img, index) => (
        <div className="imageBox" key={index}>
          <img className="slideImage" src={img} alt="stay slide" />
        </div>
      ))}
    </StyledSlider>
  );
};
export default PostDetailImg;

const StyledSlider = styled(Slider)`
  text-align: center;
  margin-bottom: 10px;

  .slick-prev {
    left: -30px;
  }
  .slick-next {
    right: -30px;
  }
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
      object-fit: cover;
      margin: 0 auto;
    }
  }
`;
