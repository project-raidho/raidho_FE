import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../assets/raidhoLogo.svg";
import HeaderRightMenu from "./HeaderRightMenu";
import SearchContainer from "./search/SearchContainer";

const HeaderContainer = () => {
  // ::: 로그인 여부 확인하기
  const [isLogin, setIsLogin] = useState(false);

  return (
    <StHeaderWrap>
      <StHeaderContainerWrap>
        <StHeaderLogo>
          <Link to="/">
            <img src={Logo} alt="라이도 홈페이지 홈으로 가기" />
          </Link>
        </StHeaderLogo>
        <StSearchBox isLogin={isLogin}>
          <SearchContainer />
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
  border-bottom: 1px solid var(--gray-color);
  background-color: var(--bg-color);
  padding: 0 1rem;
  z-index: 8;
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

  @media (max-width: 639px) {
    display: none;
  }
`;

const StSearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) =>
    props.isLogin ? "calc(100% - 480px)" : "calc(100% - 330px)"};
  height: 40px;

  @media (max-width: 639px) {
    width: 100%;
  }
`;
