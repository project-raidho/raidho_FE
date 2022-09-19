import React from "react";
import styled from "styled-components";

const GlobalLayout = ({ children }) => {
  return <StGlobalLayoutWrap>{children}</StGlobalLayoutWrap>;
};

export default GlobalLayout;

const StGlobalLayoutWrap = styled.div`
  width: 100%;
  max-width: 1305px;
  margin: 0 auto;
  padding-top: 100px; // 헤더 높이만큼

  @media (max-width: 1023px) {
    max-width: 1023px;
  }
  @media (max-width: 767px) {
    max-width: 767px;
  }
  @media (max-width: 639px) {
    max-width: 639px;
  }
`;
