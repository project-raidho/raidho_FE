import React from "react";
import IconError from "../assets/iconError.svg";
import styled from "styled-components";

const NotFound = () => {
  return (
    <StNotFound>
      <p>
        <img src={IconError} alt="에러 페이지 입니다" />
      </p>
      <h3>NOT FOUND</h3>
      <h4>찾을 수 없는 페이지입니다.</h4>
    </StNotFound>
  );
};

export default NotFound;

const StNotFound = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  min-height: calc(100vh - 330px);

  p {
    width: 140px;
    height: 140px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  h3 {
    width: 180px;
    font-size: 1.9rem;
    text-align: center;
  }
  h4 {
    width: 180px;
    font-size: 1rem;
    text-align: center;
  }
`;
