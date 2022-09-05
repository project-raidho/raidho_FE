import React from "react";
// import { useLocation } from "react-router-dom";
import GlobalLayout from "../global/GlobalLayout";
import GlobalHeader from "../global/GlobalHeader";
import SearchTagContainer from "../components/searchTag/SearchTagContainder";
import styled from "styled-components";

const SearchTagPage = () => {
  // const location = useLocation();
  // const decodeUri = decodeURI(location.search);
  

  // useEffect(() => {
  //   const searchTag = decodeUri.split("=")[1];
  //   // const searchlist = localStorage.getItem("recentSearches");
  // }, []);

  return(
    <StSearchTagPageWrap>
      <GlobalHeader />
      <GlobalLayout>
        <SearchTagContainer />
      </GlobalLayout>
    </StSearchTagPageWrap>
  );
};

export default SearchTagPage;

const StSearchTagPageWrap = styled.div`
  background-color: var(--bg-color);
  min-height: 100vh;
`;