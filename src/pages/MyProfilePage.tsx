import React from 'react';
import styled from 'styled-components';
import GlobalLayout from '../global/GlobalLayout';
import GlobalHeader from '../global/GlobalHeader';
import MyProfileContainer from '../components/myProfile/MyProfileContainer';

function MyProfilePage() {
  return (
    <StMyProfilePageWrap>
      <GlobalHeader />
      <GlobalLayout>
        <MyProfileContainer />
      </GlobalLayout>
    </StMyProfilePageWrap>
  );
}

export default MyProfilePage;

const StMyProfilePageWrap = styled.div`
  min-height: 100vh;
  background-color: var(--bg-color);
`;
