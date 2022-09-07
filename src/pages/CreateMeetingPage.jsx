import React from "react";
import styled from "styled-components";
import CreateMeetingContatiner from "../components/createMeeting/CreateMeetingContainer";
import GlobalHeader from "../global/GlobalHeader";
import GlobalLayout from "../global/GlobalLayout";

const CreateMeetingPage = () => {

  return(
    <StCreateMeetingPageWrap>
    <GlobalHeader />
    <GlobalLayout>
      <CreateMeetingContatiner/>
    </GlobalLayout>
  </StCreateMeetingPageWrap>

  );
};

export default CreateMeetingPage;

const StCreateMeetingPageWrap = styled.div`
  background-color: skyblue;
`;