import React from 'react';
import styled from 'styled-components';
import GlobalLayout from '../global/GlobalLayout';
import GlobalHeader from '../global/GlobalHeader';
import SearchTagContainer from '../components/searchTag/SearchTagContainder';

function SearchTagPage() {
  return (
    <StSearchTagPageWrap>
      <GlobalHeader />
      <GlobalLayout>
        <SearchTagContainer />
      </GlobalLayout>
    </StSearchTagPageWrap>
  );
}

export default SearchTagPage;

const StSearchTagPageWrap = styled.div`
  background-color: var(--bg-color);
  min-height: 100vh;
`;
