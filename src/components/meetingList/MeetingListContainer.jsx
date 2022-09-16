import React, { useState, useEffect } from "react";
import { authInstance } from "../../shared/api";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import MeetingListCard from "./MeetingListCard";
import styled from "styled-components";

const MeetingListContainer = () => {
  const themeList = useSelector((state) => state.themeSlice.themeList);

  // ::: ===> 서버 테스트 세팅
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [meetingList, setMeetingList] = useState([]);

  console.log("현재 선택된 테마 ::: ===>", selectedTheme);

  // ::: ===> 서버테스트 세팅
  // ::: 전체 리스트 불러오기
  const getMeetingList = async () => {
    try {
      const responseMeeting = await authInstance.get(`/api/meeting`);
      console.log(responseMeeting);
      return setMeetingList(responseMeeting.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ::: ===> 서버테스트 세팅
  // ::: 테마별 리스트 불러오기
  const onClickTheme = async (theme) => {
    setSelectedTheme(theme);
    try {
      const responseTheme = await authInstance.get(`/api/meeting/${theme}`);
      console.log(responseTheme);
      return setMeetingList(responseTheme.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMeetingList();
  }, []);

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

      {/* <StMeetingCategoryRow className="flexRightLayout">
        {meetingStatus.map((status) => (
          <label key={status.statusNum}>
            <input type="checkbox" value={status.statusNum} />
            <span>{status.statusText}</span>
          </label>
        ))}
      </StMeetingCategoryRow> */}

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
