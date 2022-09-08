import React from "react";
import { useSelector } from "react-redux";
import Button from "../../elements/Button";
import MeetingListCard from "./MeetingListCard";
import styled from "styled-components";

const MeetingListContainer = () => {
  const themeList = useSelector((state) => state.themeSlice.themeList);
  const locationList = useSelector((state) => state.themeSlice.locationList);
  const meetingList = useSelector((state) => state.meetingSlice.meetingList);

  console.log(locationList);
  console.log(meetingList);

  return (
    <StMeetingListContainerWrap>
      <StMeetingCategoryRow className="themeCategoryRow">
        {themeList.map((theme, index) => (
          <Button size="medium" variant="gray" key={theme.themeName + index}>
            {theme.themeName}
          </Button>
        ))}
      </StMeetingCategoryRow>

      <StMeetingCategoryRow>
        {locationList.map((location, index) => (
          <Button size="medium" variant="gray" key={location + index}>
            {location}
          </Button>
        ))}
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
`;

const StMeetingCategoryRow = styled.div`
  width: 100%;
  border: 1px solid var(--gray-color);
  padding: 1rem 0 0;
  margin-bottom: 1rem;
  button {
    margin-right: 1rem;
    margin-bottom: 1rem;
  }
  &.themeCategoryRow {
  }
`;

const StMeetingCardBox = styled.div`
  border: 1px solid var(--gray-color);
`;
