import React from "react";

import SearchTagContainer from "../components/searchTag/SearchTagContainder";
import styled from "styled-components";

const SearchTagPage = () => {
  return (
    <StSearchTagPageWrap>
      <SearchTagContainer />
    </StSearchTagPageWrap>
  );
};

export default SearchTagPage;

const StSearchTagPageWrap = styled.div`
  min-height: 100vh;
`;
