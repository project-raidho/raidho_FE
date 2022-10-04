import React from "react";
import styled from "styled-components";
import IconError from "../assets/iconError.svg";

const Warning = () => {
  return (
    <StWarning>
      <img src={IconError} alt="error" />
    </StWarning>
  );
};

export default Warning;

const StWarning = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  svg {
    width: 70%;
    height: 70%;

    path {
      color: var(--bg-color);
    }
  }
`;
