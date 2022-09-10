import React from "react";
import { useSelector } from "react-redux";
import Button from "../../elements/Button";
import MeetingListCard from "./MeetingListCard";
import styled from "styled-components";

const MeetingListContainer = () => {
  const themeList = useSelector((state) => state.themeSlice.themeList);
  const meetingList = useSelector((state) => state.meetingSlice.meetingList);

  const meetingStatus = [
    {
      statusNum: 1,
      statusText: "모집중",
    },
    {
      statusNum: 2,
      statusText: "모집완료",
    },
    {
      statusNum: 3,
      statusText: "여행완료",
    },
  ];

  return (
    <StMeetingListContainerWrap>
      <h2>원하는 여행 지역을 선택해주세요!</h2>
      <StMeetingCategoryRow className="themeCategoryRow">
        {themeList.map((theme, index) => (
          <Button size="medium" variant="gray" key={theme.themeName + index}>
            {theme.themeName}
          </Button>
        ))}
      </StMeetingCategoryRow>

      <StMeetingCategoryRow className="flexRightLayout">
        {meetingStatus.map((status) => (
          <label key={status.statusNum}>
            <input type="checkbox" value={status.statusNum} />
            <span>{status.statusText}</span>
          </label>
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

  h2 {
    font-size: 1.8rem;
  }
`;

const StMeetingCategoryRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 1rem 0 0;
  margin-bottom: 1rem;
  &.flexRightLayout {
    justify-content: flex-end;
  }
  button {
    margin-right: 1rem;
    margin-bottom: 1rem;
  }

  label {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-left: 1rem;
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
