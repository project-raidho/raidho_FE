import React from "react";
import styled from "styled-components";
import { AiOutlineInfo } from "react-icons/ai";

const Info = () => {
  return (
    <StInfoWrap>
      <AiOutlineInfo />
    </StInfoWrap>
  );
};

export default Info;

const StInfoWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: var(--lightBlue-color);
  svg {
    width: 70%;
    height: 70%;

    path {
      color: var(--bg-color);
    }
  }
`;
