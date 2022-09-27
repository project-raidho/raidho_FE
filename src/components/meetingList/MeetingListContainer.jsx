import React, { useState } from "react";
import { authInstance } from "../../shared/api";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import MeetingListCard from "./MeetingListCard";
import styled from "styled-components";

//::: 모집글 카테고리별 조회 axios
const getMeetingList = ({ queryKey }) => {
  console.log("queryKey", queryKey);
  if (queryKey[2]) {
    return authInstance.get(`/api/meeting/filter/1/${queryKey[1]}`);
  }
  return authInstance.get(`/api/meeting/${queryKey[1]}`);
};

const MeetingListContainer = () => {
  const [selectedTheme, setSelectedTheme] = useState("");
  const [checkStatus, setCheckStatus] = useState(false);

  const meetingAllListQuery = useQuery(
    ["meetingList", selectedTheme, checkStatus],
    getMeetingList,
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  const themeList = useSelector((state) => state.themeSlice.themeList);

  const clickStatus = () => {
    setCheckStatus(!checkStatus);
  };

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
      <StFixedMenu>
        <StMeetingCategoryRow className="themeCategoryRow">
          {themeList.map((theme, index) => (
            <p
              className="themeCategoryButton"
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
        <StCheckStatus>
          <p
            onClick={clickStatus}
            className={checkStatus ? "activeButton" : "inactiveButton"}
          >
            <span></span>
            <strong>모집중만 보기</strong>
          </p>
        </StCheckStatus>
      </StFixedMenu>
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
  padding-top: 150px;

  h2 {
    font-size: 1.8rem;
  }
`;

const StFixedMenu = styled.div`
  position: fixed;
  left: 0;
  top: 55px;
  width: 100%;
  background-color: var(--bg-color);
  box-shadow: var(--header-shadow);
  z-index: 7;
`;

const StCheckStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  padding-bottom: 0.3rem;
  p {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-right: 1rem;

    span {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      border: 1px solid var(--gray-color);
      background-color: var(--bg-color);
      margin-right: 8px;
    }
    strong {
      color: var(--gray-color);
      font-weight: 300;
    }

    &.activeButton span {
      border: 1px solid var(--blue-color);
      background-color: var(--lightBlue-color);
    }
    &.activeButton strong {
      color: var(--lightBlue-color);
    }
    &.inactiveButton span {
      border: 1px solid var(--gray-color);
      background-color: var(--bg-colr);
    }
  }
  @media (max-width: 639px) {
    p {
      strong {
        font-size: 0.9rem;
      }
    }
  }
`;

const StMeetingCategoryRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 1rem 0 0 1rem;
  margin-bottom: 1rem;
  &.flexRightLayout {
    justify-content: flex-end;
  }
  .themeCategoryButton {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 250px;
    height: 55px;

    border: 1px solid var(--gray-color);
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
      font-size: 1.3rem;
      font-weight: 700;
      width: 100%;
      height: 100%;
      &.active {
        background-color: var(--lightBlue-color);
        border: 1px solid var(--blue-color);
        color: #ffffff;
      }
    }
  }

  @media (max-width: 767px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    .themeCategoryButton {
      width: auto;

      a {
        font-size: 1.2rem;
      }
    }
  }
  @media (max-width: 639px) {
    margin-bottom: 0;
    .themeCategoryButton {
      height: 45px;
      border-radius: 10px;
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
      a {
        font-size: 0.9rem;
      }
    }
  }
`;

const StMeetingCardBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding-bottom: 5rem;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 639px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
