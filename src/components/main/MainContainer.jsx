import React from "react";
import MainPostList from "./MainPostList";
import styled from "styled-components";

const MainContainer = ({ state }) => {
  return (
    <StMainContainerWrap>
      {state === "latest" && <MainPostList state={state} />}
      {state === "likelist" && <MainPostList state={state} />}
    </StMainContainerWrap>
  );
};

export default MainContainer;

const StMainContainerWrap = styled.div`
  @media (max-width: 767px) {
    padding-top: 0;
  }
  @media (max-width: 639px) {
    padding-top: 25px;
  }
`;
