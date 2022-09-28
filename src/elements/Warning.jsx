import React from "react";
import styled from "styled-components";
import IconError from "../assets/iconError.svg";

const Warning = () => {
  return (
    <StWarningWrap>
      {/* <AiOutlineInfo /> */}
      <img src={IconError} alt="error" />
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
