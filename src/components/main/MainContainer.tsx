import React from "react";
import MainPostList from "./MainPostList";
import styled from "styled-components";

interface MainProps {
  state: string;
}

const MainContainer = ({ state }: MainProps) => {
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
