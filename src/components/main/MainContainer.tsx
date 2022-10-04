import React from "react";
import styled from "styled-components";

import MainPostList from "./MainPostList";

interface MainProps {
  state: string;
}

const MainContainer = ({ state }: MainProps) => {
  return (
    <StMainContainer>
      {state === "latest" && <MainPostList state={state} />}
      {state === "likelist" && <MainPostList state={state} />}
    </StMainContainer>
  );
};

export default MainContainer;

const StMainContainer = styled.div`
  @media (max-width: 767px) {
    padding-top: 0;
  }
  @media (max-width: 639px) {
    padding-top: 25px;
  }
`;
