import React from "react";
import Button from "../../elements/Button";
import styled from "styled-components";

const MeetingListCard = ({ meeting }) => {
  return (
    <StMeetingListCardWrap>
      <StMeetingCardRow className="flexBetweenLayout">
        <p>
          <Button size="small">#{meeting.meetingTheme}</Button>
          <Button size="small">#{meeting.locationTag}</Button>
        </p>
        <Button size="small" variant="line">
          {meeting.meetingStatus === 1 && <span>모집중</span>}
          {meeting.meetingStatus === 2 && <span>모집완료</span>}
          {meeting.meetingStatus === 3 && <span>여행완료</span>}
        </Button>
      </StMeetingCardRow>
      <StMeetingCardRow>
        <p className="memberImageBox">
          <img src={meeting.memberImage} alt={meeting.memberName} />
        </p>
        <dl className="meetingInfo">
          <dd>@{meeting.memberName}</dd>
          <dt>{meeting.meetingTitle}</dt>
          <dd>{meeting.meetingPeriod}</dd>
          <dd>{meeting.meetingAddress}</dd>
        </dl>
      </StMeetingCardRow>
      <StMeetingCardRow>
        {meeting.meetingTags.map((tag, index) => (
          <span key={tag + index}>#{tag}&nbsp;</span>
        ))}
      </StMeetingCardRow>
      <StMeetingCardRow className="flexBetweenLayout">
        <p>
          참여중인 인원 | {meeting.meetingParticipant}/{meeting.meetingPeople}
        </p>
        <Button size="small">상세보기</Button>
      </StMeetingCardRow>
    </StMeetingListCardWrap>
  );
};

export default MeetingListCard;

const StMeetingListCardWrap = styled.div`
  min-width: 300px;
  margin: 10px;
  padding: 1rem;
  background-color: var(--subBg-color);
  border: 1px solid var(--gray-color);
  border-radius: 20px;
`;

const StMeetingCardRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }

  &.flexBetweenLayout {
    justify-content: space-between;
  }
  button {
    padding: 0px 20px;
    margin-right: 0.5rem;
    &:last-child {
      margin-right: 0;
    }
  }

  .memberImageBox {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 1rem;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .meetingInfo {
    dd,
    dt {
      margin-bottom: 0.5rem;
    }
    dt {
      font-size: 1.5rem;
    }
  }
`;
