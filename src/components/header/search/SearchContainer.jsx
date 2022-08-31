import React from "react";
import Input from "../../../elements/Input";
import styled from "styled-components";

const SearchContainer = ({ isLogin }) => {
  console.log(isLogin);
  
  return(
    <StSearchContainerWrap isLogin={isLogin}>
      <Input size="large" variant="search" />
    </StSearchContainerWrap>
  );
};

export default SearchContainer;

const StSearchContainerWrap = styled.div`
  width: ${(props) => props.isLogin === true ? "70%" : "74%"};
`;