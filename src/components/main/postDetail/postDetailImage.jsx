import styled from "styled-components";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";

const PostDeailImage= ({ images }) => {
    
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
            <img key={index} src={img} alt="stay slide" />
          ))}
        </StyledSlide>
      );
    };
    export default PostDeailImage;
    
    
    const StyledSlide = styled(Slider)`
      
      .slick-slide {
        display: inline-block;
      }
      .slick-list {
        margin-top: 50px;   
       width:570px;

        
        z-index: 100;
        overflow: hidden;
      }
    
      .slick-prev,
      .slick-next {
        z-index: 9999;
        width: 50px !important;
        opacity: 1;
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
/*     
      .slick-prev:hover,
      .slick-next:hover {
        opacity: 1;
      } */
    
      .slick-prev:hover:before,
      .slick-next:hover:before {
        color: white;
      }
    
      .slick-dots {
        margin-top: 5px;
        z-index: 999;
        position: relative;
        bottom: 10px;
    
        li button:before {
          color:  #7188FF;
        }
      }
    `;
    
    
 