import React from "react";
import { useSelector } from "react-redux";
import Button from "../../elements/Button";
import TripLocationSelect from "../createMeeting/TripLocationSelect";
import MeetingListCard from "./MeetingListCard";
import styled from "styled-components";

const MeetingListContainer = () => {
  const themeList = useSelector((state) => state.themeSlice.themeList);
  const meetingList = useSelector((state) => state.meetingSlice.meetingList);

  return (
    <StMeetingListContainerWrap>
      <h2>원하는 테마를 선택해주세요!</h2>
      <StMeetingCategoryRow className="themeCategoryRow">
        {themeList.map((theme, index) => (
          <Button size="medium" variant="gray" key={theme.themeName + index}>
            {theme.themeName}
          </Button>
        ))}
      </StMeetingCategoryRow>

      <h2>원하는 여행 지역을 선택해주세요!</h2>
      <StMeetingCategoryRow>
        <TripLocationSelect />
      </StMeetingCategoryRow>

      <StMeetingCardBox>
        {meetingList.map((meeting) => (
          <MeetingListCard key={meeting.id} meeting={meeting} />
        ))}
      </StMeetingCardBox>
    </StMeetingListContainerWrap>
  );
};

export default MeetingListContainer;

const StMeetingListContainerWrap = styled.div`
  min-height: 100vh;
  background-color: var(--bg-color);

  h2 {
    font-size: 1.8rem;
  }
`;

const StMeetingCategoryRow = styled.div`
  width: 100%;
  padding: 1rem 0 0;
  margin-bottom: 1rem;
  button {
    margin-right: 1rem;
    margin-bottom: 1rem;
  }
  &.themeCategoryRow {
  }
  .locationList {
    width: 100%;
    max-width: 430px;
    height: 50px;
    border: 1px solid var(--gray-color);

    li {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 50px;
      border-bottom: 1px solid var(--gray-color);
    }
  }
`;

const StMeetingCardBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding-bottom: 5rem;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
