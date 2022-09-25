import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";

const Slider = ({ slideSettings, children }) => {
  const slideRef = useRef(null);
  console.log(slideSettings.itemWidth);

  const onClickPrev = () => {};

  const onClickNext = () => {};

  useEffect(() => {}, []);
  return (
    <StSlideWrap>
      <StSlideView>
        <StSlideItems itemWidth={slideSettings.itemWidth} ref={slideRef}>
          {children}
        </StSlideItems>
        <strong className="buttonPrev buttonSlide" onClick={onClickPrev}>
          <MdArrowBackIosNew />
        </strong>
        <strong className="buttonNext buttonSlide" onClick={onClickNext}>
          <MdArrowForwardIos />
        </strong>
      </StSlideView>
    </StSlideWrap>
  );
};

export default Slider;

const StSlideWrap = styled.div`
  width: 100%;
  height: 100%;
`;

const StSlideView = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .buttonSlide {
    position: absolute;
    top: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -20px;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background-color: var(--main-color);
    cursor: pointer;

    &.buttonPrev {
      left: 1rem;
    }

    &.buttonNext {
      right: 1rem;
    }

    svg {
      width: 60%;
      height: 60%;

      path {
        color: var(--title-color);
      }
    }
  }
`;

const StSlideItems = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  & > div {
    width: ${(props) => props.itemWidth};
  }
`;
