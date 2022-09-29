import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DesktopLogo from "../../assets/raidhoLogo.svg";
import MobileLogo from "../../assets/raidhoMobileLogo.svg";
import HeaderRightMenu from "./HeaderRightMenu";
import SearchContainer from "./search/SearchContainer";

const HeaderContainer = () => {
  // ::: 로그인 여부 확인하기
  const [isLogin, setIsLogin] = useState(false);
  // ::: 모바일 여부 확인하기
  const [isMobile, setIsMobile] = useState(false);

  // ::: 디바이스 화면 크기 확인
  const checkDiviceWidth = () => {
    const browserWidth = window.innerWidth;
    browserWidth <= 639 ? setIsMobile(true) : setIsMobile(false);
  };

  useEffect(() => {
    checkDiviceWidth();
    window.addEventListener("resize", checkDiviceWidth);
    return () => {
      window.removeEventListener("resize", checkDiviceWidth);
    };
  }, []);

  return (
    <StHeaderWrap>
      <StHeaderContainerWrap>
        <StHeaderLogo>
          <Link to="/">
            {isMobile ? (
              <img src={MobileLogo} alt="라이도 홈페이지 홈으로 가기" />
            ) : (
              <img src={DesktopLogo} alt="라이도 홈페이지 홈으로 가기" />
            )}
          </Link>
        </StHeaderLogo>
        <StSearchBox isLogin={isLogin}>
          <SearchContainer isMobile={isMobile} />
        </StSearchBox>
        <HeaderRightMenu isLogin={isLogin} setIsLogin={setIsLogin} />
      </StHeaderContainerWrap>
    </StHeaderWrap>
  );
};

export default HeaderContainer;

const StHeaderWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 55px;
  background-color: var(--bg-color);
  box-shadow: var(--header-shadow);
  padding: 0 1rem;
  z-index: 15;
`;

const StHeaderContainerWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

const StHeaderLogo = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 100%;

  a {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;

    img {
      display: block;
      width: 100%;
    }
  }

  @media ${(props) => props.theme.mobile} {
    width: 32px;
    padding: 14px 0;
    a {
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
`;

const StSearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) =>
    props.isLogin ? "calc(100% - 480px)" : "calc(100% - 560px)"};
  height: 40px;

  @media (max-width: 639px) {
    width: ${(props) =>
      props.isLogin ? "calc(100% - 40px)" : "calc(100% - 40px)"};
  }
`;
