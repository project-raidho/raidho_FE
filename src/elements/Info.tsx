import React from "react";
import styled from "styled-components";
import { AiOutlineInfo } from "react-icons/ai";

const Info = () => {
  return (
    <StInfo>
      <AiOutlineInfo />
    </StInfo>
  );
};

export default Info;

const StInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: var(--lightBlue-color);
  svg {
    width: 70%;
    height: 70%;

    path {
      color: var(--bg-color);
    }
  }
`;
