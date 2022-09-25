import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../assets/raidhoLogo.svg";
import HeaderRightMenu from "./HeaderRightMenu";
import SearchContainer from "./search/SearchContainer";

const HeaderContainer = () => {
  const [rightMenuWidth, setRightMenuWidth] = useState();

  // ::: 로그인 여부 확인하기
  const [isLogin, setIsLogin] = useState(false);
  const userIsLogin = localStorage.getItem("Authorization");

  const checkRightMenuWidth = (size) => {
    setRightMenuWidth(size);
  };

  console.log(rightMenuWidth);
  useEffect(() => {
    // ::: 로그인 여부 확인하기
    userIsLogin !== null ? setIsLogin(true) : setIsLogin(false);
  }, [userIsLogin]);

  return (
    <StHeaderContainerWrap rightMenuWidth={rightMenuWidth}>
      <StHeaderLogo>
        <Link to="/">
          <img src={Logo} alt="라이도 홈페이지 홈으로 가기" />
        </Link>
      </StHeaderLogo>
      <StSearchBox isLogin={isLogin}>
        <SearchContainer />
      </StSearchBox>
      <HeaderRightMenu
        checkRightMenuWidth={checkRightMenuWidth}
        isLogin={isLogin}
      />
    </StHeaderContainerWrap>
  );
};

export default HeaderContainer;

const StHeaderContainerWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 55px;
  border-bottom: 1px solid var(--gray-color);
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
`;

const StSearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) =>
    props.isLogin ? "calc(100% - 480px)" : "calc(100% - 330px)"};
  height: 40px;
`;
