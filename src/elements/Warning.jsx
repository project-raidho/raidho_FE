import React from "react";
import styled from "styled-components";
import { AiOutlineInfo } from "react-icons/ai";

const Warning = () => {
  return (
    <StWarningWrap>
      <AiOutlineInfo />
    </StWarningWrap>
  );
};

export default Warning;

const StWarningWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: var(--red-color);
  svg {
    width: 70%;
    height: 70%;

    path {
      color: var(--bg-color);
    }
  }
`;
