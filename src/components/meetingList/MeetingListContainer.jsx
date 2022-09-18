import React, { useState } from "react";
import { authInstance } from "../../shared/api";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import MeetingListCard from "./MeetingListCard";
import styled from "styled-components";
//::: 모집글 카테고리별 조회 axios
const getMeetingList = ({ queryKey }) => {
  return authInstance.get(`/api/meeting/${queryKey[1]}`);
};

const MeetingListContainer = () => {
  const [selectedTheme, setSelectedTheme] = useState("");

  const meetingAllListQuery = useQuery(
    ["meetingList", selectedTheme],
    getMeetingList,
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  const themeList = useSelector((state) => state.themeSlice.themeList);

  // ::: 현재테마 바꾸는 함수
  const onClickTheme = async (theme) => {
    if (theme === "전체") {
      return setSelectedTheme("");
    }
    setSelectedTheme(theme);
  };

  if (meetingAllListQuery.isLoading) {
    return null;
  }

  return (
    <StMeetingListContainerWrap>
      <h2>원하는 여행 지역을 선택해주세요!</h2>
      <StMeetingCategoryRow className="themeCategoryRow">
        {themeList.map((theme, index) => (
          <p
            className="themeCategoryButton"
            size="squareTheme"
            variant="lineBlue"
            key={theme.themeName + index}
            onClick={() => onClickTheme(theme.themeName)}
          >
            <NavLink
              to={`/meetingList/${theme.themePath}`}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {theme.themeName}
            </NavLink>
          </p>
        ))}
      </StMeetingCategoryRow>

      <StMeetingCardBox>
        {meetingAllListQuery.data.data.data.content.map((meeting) => (
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
  .themeCategoryButton {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 250px;
    height: 55px;

    border: 1px solid var(--title-color);
    border-radius: 15px;
    background-color: var(--bg-color);
    margin-right: 1rem;
    margin-bottom: 1rem;
    overflow: hidden;
    cursor: pointer;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 700;
      width: 100%;
      height: 100%;
      &.active {
        background-color: var(--main-color);
      }
    }
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
