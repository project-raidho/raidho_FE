import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const GlobalLayout = ({ children }) => {
  const location = useLocation();

  // ::: 페이지 변경될 때마다 스크롤 제일 위로 올리기
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [location.pathname]);
  return <StGlobalLayoutWrap>{children}</StGlobalLayoutWrap>;
};

export default GlobalLayout;

const StGlobalLayoutWrap = styled.div`
  width: 100%;
  max-width: 1305px;
  margin: 0 auto;
  padding: 80px 0 0 0;

  @media (max-width: 1023px) {
    max-width: 1023px;
    padding: 80px 0 0 0;
  }
  @media (max-width: 767px) {
    max-width: 767px;
  }
  @media (max-width: 639px) {
    max-width: 639px;
    padding: 55px 0 10px;
  }
`;
