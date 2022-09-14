import React from "react";

import MeetingListContainer from "../components/meetingList/MeetingListContainer";
import styled from "styled-components";

const MeetingListPage = () => {
  return (
    <StMeetingListPageWrap>
      <MeetingListContainer />
    </StMeetingListPageWrap>
  );
};

export default MeetingListPage;

const StMeetingListPageWrap = styled.div``;
