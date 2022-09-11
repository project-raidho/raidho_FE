import React from 'react';
import styled from 'styled-components';
import GlobalHeader from '../global/GlobalHeader';
import GlobalLayout from '../global/GlobalLayout';
import MeetingListContainer from '../components/meetingList/MeetingListContainer';

function MeetingListPage() {
  return (
    <StMeetingListPageWrap>
      <GlobalHeader />
      <GlobalLayout>
        <MeetingListContainer />
      </GlobalLayout>
    </StMeetingListPageWrap>
  );
}

export default MeetingListPage;

const StMeetingListPageWrap = styled.div`
  min-height: 100vh;
  background-color: var(--bg-color);
`;
