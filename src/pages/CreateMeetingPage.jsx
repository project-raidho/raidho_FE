import React from "react";
import styled from "styled-components";
import CreateMeetingContainer from "../components/createMeeting/CreateMeetingContainer";

import GlobalHeader from "../global/GlobalHeader";
import GlobalLayout from "../global/GlobalLayout";

const CreateMeetingPage = () => {
  return (
    <StCreateMeetingPageWrap>
      <GlobalHeader />
      <GlobalLayout>
        <CreateMeetingContainer />
      </GlobalLayout>
    </StCreateMeetingPageWrap>
  );
};

export default CreateMeetingPage;

const StCreateMeetingPageWrap = styled.div``;
