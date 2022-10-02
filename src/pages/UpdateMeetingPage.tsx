import React from "react";
import styled from "styled-components";
import UpdateMeetingContainer from "../components/createMeeting/UpdateMeetingContainer";

const UpdateMeetingPage = () => {
  return (
    <StUpdatePostPageWrap>
      <UpdateMeetingContainer />
    </StUpdatePostPageWrap>
  );
};

export default UpdateMeetingPage;

const StUpdatePostPageWrap = styled.div`
  width: 100%;
`;
