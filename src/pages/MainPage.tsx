import React from 'react';

import styled from 'styled-components';
import GlobalHeader from '../global/GlobalHeader';
import MainMenu from '../components/main/MainMenu';
import GlobalLayout from '../global/GlobalLayout';

function MainPage() {
  return (
    <StMainPageWrap>
      <GlobalHeader />
      <GlobalLayout>
        <MainMenu />
      </GlobalLayout>
    </StMainPageWrap>
  );
}

export default MainPage;

const StMainPageWrap = styled.div`
  background-color: var(--bg-color);
`;
