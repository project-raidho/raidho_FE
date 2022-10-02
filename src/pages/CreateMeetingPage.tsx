import React from "react";
import CreateMeetingContainer from "../components/createMeeting/CreateMeetingContainer";
import styled from "styled-components";

const CreateMeetingPage = () => {
  return (
    <StCreateMeetingWrap>
      <CreateMeetingContainer />
    </StCreateMeetingWrap>
  );
};

export default CreateMeetingPage;

const StCreateMeetingWrap = styled.div`
  padding-bottom: 50px;
`;
