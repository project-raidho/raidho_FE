import React, { useRef, useState } from "react";
import Input from "../../../elements/Input";
import styled from "styled-components";

const SearchContainer = ({ isLogin }) => {
  const [ isFocusSearch, setIsFocusSearch ] = useState(false);
  console.log(isLogin);
  const searchFocusRef = useRef();
  

  const onFocusSearch = (event) => {
    console.log(event.target);
    console.log(searchFocusRef.current);
    setIsFocusSearch(true);
  }
  
  //setIsFocusSearch(false);
  return(
    <StSearchContainerWrap 
      isLogin={isLogin}
    >
      <StSearchDetailBox
        ref={searchFocusRef}
        isFocusSearch={isFocusSearch}
      >
        <Input
          size="large" 
          variant="search" 
          onClick={onFocusSearch}
        />
      <StSearchDetailList>
        <h3>최근 검색 기록</h3>

        <h3>추천 테마</h3>
      </StSearchDetailList>
      
      </StSearchDetailBox>
      
    </StSearchContainerWrap>
  );
};

export default SearchContainer;

const StSearchContainerWrap = styled.div`
  position: relative;
  width: ${(props) => props.isLogin === true ? "70%" : "74%"};
  height: 55px;
  background-color: yellow;
`;

const StSearchDetailBox = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height:${(props)=>props.isFocusSearch === true ? "416px" : "58px"};
  border:${(props)=>props.isFocusSearch === true ? "1px solid var(--gray-color)" : "none"};
  border-top-left-radius: ${(props)=>props.isFocusSearch === true && "20px"};
  border-top-right-radius: ${(props)=>props.isFocusSearch === true && "20px"};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow:${(props)=>props.isFocusSearch === true ? "var(--box-shadow)" : "none"};
  background-color: var(--bg-color);
  overflow: hidden;
  transition: 0.5s;
  z-index: 5;

  input {
    border: ${(props)=>props.isFocusSearch === true && "none"};
  }
`;

const StSearchDetailList = styled.div`
  width: calc(100% - 2rem);
  border-top: 1px solid var(--gray-color);
  margin: 1rem auto;
`;