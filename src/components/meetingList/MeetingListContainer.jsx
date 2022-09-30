import React, { useState } from "react";
import { authInstance } from "../../shared/api";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import DatePicker from "react-datepicker";
import "../../elements/datePicker/datepicker.css";
import { ko } from "date-fns/esm/locale";
import MeetingListCard from "./MeetingListCard";
import Button from "../../elements/Button";
import styled from "styled-components";

//::: 모집글 카테고리별 조회 axios
const getMeetingList = ({ queryKey }) => {
  // console.log("queryKey", queryKey);
  // ::: 기간O
  if (queryKey[3] !== "" && queryKey[4] !== "") {
    if (queryKey[1] === "") {
      // ::: 기간O 카테고리 전체 조회
      return authInstance.get(
        `/api/meeting/filter/date/${queryKey[3]}/${queryKey[4]}`
      );
    }
    // ::: 기간O 카테고리별 조회
    return authInstance.get(
      `/api/meeting/filter/date/${queryKey[1]}/${queryKey[3]}/${queryKey[4]}`
    );
  }
  if (queryKey[3] === "" && queryKey[4] === "" && queryKey[2] === true) {
    // ::: 기간X 모집중 조회
    return authInstance.get(`/api/meeting/filter/1/${queryKey[1]}`);
  }
  // ::: 기간X 모집중X 카테고리별 조회
  return authInstance.get(`/api/meeting/${queryKey[1]}`);
};

const MeetingListContainer = () => {
  const themeList = useSelector((state) => state.themeSlice.themeList);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [checkStatus, setCheckStatus] = useState(false);
  const [checkStartDate, setCheckStartDate] = useState(new Date());
  const [checkEndDate, setCheckEndDate] = useState(new Date());

  // ::: 조회 시작 날짜, 조회 종료 날짜 문자열 변환 "yyyy-mm-dd"
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const meetingAllListQuery = useQuery(
    ["meetingList", selectedTheme, checkStatus, startDate, endDate],
    getMeetingList,
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  // ::: 모집중 클릭시 상태 조절
  const clickStatus = () => {
    if (checkStatus) {
      // ::: 초기화
      setCheckStartDate("");
      setCheckEndDate("");
      setStartDate("");
      setEndDate("");
      setCheckStatus(!checkStatus);
    }
    setCheckStatus(!checkStatus);
  };

  // ::: 날짜 검색 형변환
  const checkSearchDate = () => {
    let startMM = "";
    let startDD = "";
    let endMM = "";
    let endDD = "";

    const changeStart = checkStartDate.toLocaleDateString("ko").split(`. `);
    const changeEnd = checkEndDate.toLocaleDateString("ko").split(`. `);

    const daySplitDotStart = changeStart[2].split(".")[0];
    const daySplitDotEnd = changeEnd[2].split(".")[0];

    changeStart[1]?.length === 1
      ? (startMM = `0${changeStart[1]}`)
      : (startMM = `${changeStart[1]}`);
    daySplitDotStart?.length === 1
      ? (startDD = `0${daySplitDotStart}`)
      : (startDD = `${daySplitDotStart}`);
    changeEnd[1]?.length === 1
      ? (endMM = `0${changeEnd[1]}`)
      : (endMM = `${changeEnd[1]}`);
    daySplitDotEnd?.length === 1
      ? (endDD = `0${daySplitDotEnd}`)
      : (endDD = `${daySplitDotEnd}`);

    const startDateToString = `${changeStart[0]}-${startMM}-${startDD}`;
    const endDateToString = `${changeEnd[0]}-${endMM}-${endDD}`;

    setStartDate(startDateToString);
    setEndDate(endDateToString);
    setCheckStatus(true);
  };

  // console.log(checkStartDate, checkEndDate);
  // console.log(startDate, endDate);

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
        <div className="centerBox">
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
            <div className="datePickerWrap">
              <DatePicker
                locale={ko}
                dateFormat="yyyy-MM-dd(eee)"
                selected={checkStartDate}
                onChange={(date) => setCheckStartDate(date)}
                selectsStart
                startDate={checkStartDate}
                endDate={checkEndDate}
                minDate={new Date()}
              />
              <DatePicker
                locale={ko}
                dateFormat="yyyy-MM-dd(eee)"
                selected={checkEndDate}
                onChange={(date) => setCheckEndDate(date)}
                selectsEnd
                startDate={checkStartDate}
                endDate={checkEndDate}
                minDate={checkStartDate}
              />
              <Button
                size="small"
                variant="lineLightBlue"
                onClick={checkSearchDate}
              >
                조회
              </Button>
            </div>
            <p
              onClick={clickStatus}
              className={checkStatus ? "activeButton" : "inactiveButton"}
            >
              <span className="filterMeetingStatus"></span>
              <strong>모집중만 보기</strong>
            </p>
          </StCheckStatus>
        </div>
      </StFixedMenu>
      <StMeetingCardBox>
        {meetingAllListQuery.data.data.data.content.map((meeting) => (
          <MeetingListCard
            key={meeting.id}
            meeting={meeting}
            themeList={themeList}
            onClickTheme={onClickTheme}
          />
        ))}
      </StMeetingCardBox>
    </StMeetingListContainerWrap>
  );
};

export default MeetingListContainer;

const StMeetingListContainerWrap = styled.div`
  min-height: 100vh;
  background-color: var(--bg-color);
  padding-top: 180px;

  h2 {
    font-size: 1.8rem;
  }
  @media ${(props) => props.theme.mobile} {
    padding-top: 210px;
  }
`;

const StFixedMenu = styled.div`
  position: fixed;
  left: 0;
  top: 55px;
  width: 100%;
  background-color: var(--bg-color);
  z-index: 7;

  .centerBox {
    width: 100%;
    max-width: 1305px;
    margin: 0 auto;
  }
`;

const StCheckStatus = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  max-width: 1305px;
  padding-bottom: 0.3rem;
  p,
  .datePickerWrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: 1rem;

    &.activeButton,
    &.inactiveButton {
      padding-right: 1rem;
    }

    span.filterMeetingStatus {
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
    button {
      width: 100px;
      margin-left: 0.8rem;
    }
    &.datePickerWrap {
      width: auto;
    }
  }
  .react-datepicker-wrapper,
  .react-datepicker__input-container {
    width: 200px;
  }
  .react-datepicker-wrapper {
    margin-left: 0.8rem;
  }
  .react-datepicker-wrapper:first-child {
    margin-left: 0rem;
  }
  .react-datepicker__input-container > input {
    width: 200px;
    font-size: 1rem;
    color: var(--title-color);
  }
  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
    .react-datepicker-wrapper,
    .react-datepicker__input-container {
      width: 130px;
    }
    .react-datepicker-wrapper {
      margin-left: 0.5rem;
    }
    .react-datepicker__input-container > input {
      width: 130px;
      font-size: 0.9rem;
    }
    p,
    .datePickerWrap {
      padding-right: 1rem;
      strong {
        font-size: 0.9rem;
      }
      button {
        width: 80px;
        margin-left: 0.5rem;
      }

      &.datePickerWrap {
        width: 100%;
        text-align: center;
        border-top: 1px dashed var(--gray-color);
        padding: 0.5rem 1rem;
        margin-bottom: 0;
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
    transition: all 0.3s ease;
    overflow: hidden;
    cursor: pointer;
    &:hover {
      box-shadow: var(--box-shadow);
      background-color: var(--lightBlue-color);
      border: 1px solid var(--blue-color);
    }
    &:hover a {
      color: #ffffff;
    }
    &:active {
      border: 1px solid var(--blue-color);
    }
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
  @media ${(props) => props.theme.mobile} {
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
  @media ${(props) => props.theme.mobile} {
    grid-template-columns: repeat(1, 1fr);
  }
`;
