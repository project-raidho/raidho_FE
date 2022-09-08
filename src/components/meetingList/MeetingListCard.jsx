import React from "react";
import styled from "styled-components";

const MeetingListCard = ({ meeting }) => {
  console.log("meetingCard ::: ", meeting);
  return (
    <StMeetingListCardWrap>
      <div>현재상태{meeting.meetingStatus}</div>
      <div>{meeting.locationTag}</div>
      <div>{meeting.meetingTheme}</div>
      <div>{meeting.meetingTitle}</div>
      <div>{meeting.meetingAddress}</div>
      <div>{meeting.meetingPeople}</div>
      <div>{meeting.meetingPeriod}</div>
      <div>{meeting.meetingTags}</div>
      <div>{meeting.meetingTheme}</div>
      <div>
        <p>{meeting.memberName}</p>
        <img src={meeting.memberImage} alt={meeting.memberName} />
      </div>
    </StMeetingListCardWrap>
  );
};

export default MeetingListCard;

const StMeetingListCardWrap = styled.div``;
