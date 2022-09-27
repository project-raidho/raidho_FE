import React from "react";
import styled from "styled-components";

const GlobalFooter = () => {
  return (
    <>
      <StFooterWrap>ddddd</StFooterWrap>
    </>
  );
};

export default GlobalFooter;

const StFooterWrap = styled.div`
  width: 100%;
  height: 100px;
  background-color: var(--sub-color);

  @media (max-width: 639px) {
    height: 200px;
    padding-bottom: 100px;
  }
`;
