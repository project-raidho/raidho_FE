import React from "react";
import GlobalLayout from "./GlobalLayout";
import Input from "../elements/Input";
import styled from "styled-components";

const GlobalHeader = () => {

  return(
    <StGlobalHeaderWrap>
      <GlobalLayout>
        <Input size="medium" variant="default" />
      </GlobalLayout>
    </StGlobalHeaderWrap>
  );
};

export default GlobalHeader;

const StGlobalHeaderWrap = styled.div`
  width: 100%;
  height: 135px;
  padding-top: 80px;
  margin-bottom: 58px;
  background-color: var(--bg-color);
`;