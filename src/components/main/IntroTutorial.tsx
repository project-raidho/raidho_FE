import React from "react";
import Slider from "react-slick";
import "../../elements/slider/slick-theme.css";
import "../../elements/slider/slick.css";
import Button from "../../elements/Button";
import styled from "styled-components";
import ImageIntro1 from "../../assets/banner/intro1.jpeg";
import ImageIntro2 from "../../assets/banner/intro2.jpeg";
import ImageIntro3 from "../../assets/banner/intro3.jpeg";

const IntroTutorial = ({ onClose }: { onClose: Function }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const changeFirstUser = () => {
    localStorage.setItem("firstUser", "true");
    onClose();
  };
  return (
    <>
      <Background />
      <ModalContentBox>
        <div className="contents">
          <StIntroTutorialWrap>
            <Slider {...settings}>
              <div className="slideItems">
                <img src={ImageIntro1} alt="서비스소개" />
              </div>
              <div className="slideItems">
                <img src={ImageIntro3} alt="서비스소개" />
              </div>
              <div className="slideItems slideItemLast">
                <img src={ImageIntro2} alt="서비스소개" />
                <Button
                  size="medium"
                  variant="linePrimary"
                  onClick={() => changeFirstUser}
                >
                  시작하기
                </Button>
              </div>
            </Slider>
          </StIntroTutorialWrap>
        </div>
      </ModalContentBox>
    </>
  );
};

export default IntroTutorial;

const StIntroTutorialWrap = styled.div`
  width: 100%;
  height: 100%;
  .slideItems {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
    }
    &.slideItemLast {
      position: relative;
      height: 536px;
      background-color: #fff;
      img {
        width: 90%;
        margin: 0 auto;
      }
      button {
        position: absolute;
        bottom: 10px;
        left: 50%;
        margin-left: -75px;
      }
    }
  }

  @media ${(props) => props.theme.mobile} {
    .slideItems {
      line-height: 400px;

      &.slideItemLast {
        position: relative;
        height: 361px;
        background-color: #fff;
        img {
          width: 90%;
          margin: 0 auto;
        }
        button {
          position: absolute;
          width: 100px;
          height: 32px;
          bottom: 5px;
          left: 50%;
          margin-left: -50px;
        }
      }
    }
  }
`;

const Background = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  text-align: center;
  background: rgba(0, 0, 0, 0);
  z-index: 20;
`;

const ModalContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  height: 600px;
  width: 450px;
  top: 50%;
  left: 50%;
  margin-top: -300px;
  margin-left: -225px;
  padding: 1.5rem;
  background-color: var(--bg-color);
  border-radius: 15px;
  box-shadow: var(--box-shadow);
  z-index: 20;
  text-align: center;
  overflow: hidden;

  .contents {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  svg.closeButton {
    position: absolute;
    right: 1rem;
    top: 1rem;
    width: 30px;
    height: 30px;
    cursor: pointer;
    z-index: 2;
    path {
      color: var(--title-color);
    }
  }
  @media (max-width: 1023px) {
  }
  @media (max-width: 767px) {
  }
  @media ${(props) => props.theme.mobile} {
    width: 300px;
    height: 450px;
    top: 70px;
    left: 50%;
    margin-top: 0;
    margin-left: -150px;
    padding: 0.5rem;
    .contents {
      padding: 1vh;
    }
    svg.closeButton {
      width: 25px;
      height: 25px;
    }
  }
`;
