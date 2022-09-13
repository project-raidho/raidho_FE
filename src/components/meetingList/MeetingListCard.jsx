import React from "react";
import Button from "../../elements/Button";
import styled from "styled-components";

const MeetingListCard = ({ meeting }) => {
  return (
    <StMeetingListCardWrap>
      <StMeetingCardUpDown>
        <StMeetingCardRow className="flexBetweenLayout">
          <p className="infoStatus">
            {meeting.meetingStatus === 1 && (
              <span>
                모집중 D<b>-10</b>
              </span>
            )}
            {meeting.meetingStatus === 2 && (
              <span>
                모집완료 D<b>-10</b>
              </span>
            )}
            {meeting.meetingStatus === 3 && <span>여행완료</span>}
          </p>
          <p className="infoStatus">
            모집인원 {meeting.meetingParticipant}/{meeting.meetingPeople}
          </p>
        </StMeetingCardRow>
        <h3>{meeting.meetingTitle}</h3>
        <p>{meeting.meetingPeriod}</p>
        <p>{meeting.meetingAddress}</p>
      </StMeetingCardUpDown>
      <StMeetingCardUpDown>
        <StMeetingCardRow>
          {meeting.meetingTags.map((tag, index) => (
            <span key={tag + index}>#{tag}&nbsp;</span>
          ))}
        </StMeetingCardRow>
        <StMeetingCardRow>
          <p className="memberImageBox">
            <img src={meeting.memberImage} alt={meeting.memberName} />
          </p>
          <p className="memberNameBox">@{meeting.memberName}</p>
        </StMeetingCardRow>
        <StMeetingCardRow>
          <Button size="tag" variant="gray">
            {meeting.meetingTheme}
          </Button>
          <Button size="tag" variant="gray">
            {meeting.locationTag}
          </Button>
        </StMeetingCardRow>
      </StMeetingCardUpDown>
    </StMeetingListCardWrap>
  );
};

export default MeetingListCard;

const StMeetingListCardWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 340px;
  height: 430px;
  margin: 1rem;
  padding: 1.7rem;
  background-color: var(--subBg-color);
  border: 1px solid var(--gray-color);
  border-radius: 20px;

  h3 {
    font-size: 2rem;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
  }
`;

const StMeetingCardUpDown = styled.div`
  width: 100%;
`;

const StMeetingCardRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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
  p {
    font-size: 1.5rem;
  }

  & > span {
    font-size: 1.3rem;
    font-weight: 400;
  }

  .infoStatus {
    font-size: 1.27rem;
    color: var(--main-color);

    & > span {
      font-size: 1.27rem;
      color: var(--main-color);

      & > b {
        font-size: 1.27rem;
        color: var(--main-color);
      }
    }
  }

  .memberImageBox {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 1rem;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .memberNameBox {
    font-size: 1.25rem;
  }
`;
