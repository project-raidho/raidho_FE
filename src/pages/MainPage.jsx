import React from "react";
import styled from "styled-components";
import MainMenu from "../components/main/MainMenu";

const MainPage = () => {
  return (
    <StMainPageWrap>
      <MainMenu />
    </StMainPageWrap>
  );
};

export default MainPage;

const StMainPageWrap = styled.div``;
