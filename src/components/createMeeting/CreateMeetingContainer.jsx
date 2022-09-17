import React, { useState } from "react";
import styled from "styled-components";
import ThemeSelect from "./ThemeSelect";
// import { useForm } from "react-hook-form";
import { authInstance } from "../../shared/api";
import Button from "../../elements/Button";
import TripPeriod from "./TripPeriod";

import CreatePostTags from "../createPost/CreatePostTags";
import RoomCloseDateBox from "./RoomCloseDateBox";
import MeetingLocationSearch from "./MeetingLocationSearch";
import TripPeopleCount from "./TripPeopleCount";
import TextField from "@mui/material/TextField";
import CreatePostContent from "../createPost/CreatePostContent";
import { useNavigate } from "react-router-dom";

// //리액트 쿼리
// import { useQuery } from "react-query";

const CreateMeetingContatiner = () => {
  const navigate = useNavigate();

  const postcreatemeeting = async () => {
    const res = await authInstance.post(`/api/meeting`, data);
    console.log(res);
    navigate("/meetingList");
    return res;
  };



  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { isSubmitting, isDirty, errors },
  // } = useForm({ mode: "onChange" });

  const [theme, setTheme] = useState("");
  // const [locationtags, setLocationTags] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [meetingTags, setMeetingTags] = useState([]);
  const [people, setPeople] = useState();
  const [roomCloseDate, setRoomCloseDate] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [departLocation, setDepartLocation] = useState();

  //유효성 검사
  // const [validState,setValidState] =useState();

  // 방 생성하기
  // const onClickCreateRoom = async () => {
  //   const roomData = {
  //     chatRoomTitle: title,
  //     people: people,
  //     tags: MeetingTags,
  //   };
  //   try {
  //     const res = await authInstance.post(`/api/chat/rooms`, roomData);
  //     window.alert("채팅방이 생성되었습니다.");

  //     navigate("/meetingList");
  //     return res;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const selectedLocationTags = (tags) => {
  //   setLocationTags(tags);
  // };

  const selectedMeetingTags = (tags) => {
    setMeetingTags(tags);
  };
  const typedMeetingContent = (text) => {
    console.log("typedPostContent", text);
    setDesc(text);
  };

  const data = {
    themeCategory: theme,
    meetingTags: meetingTags,
    title: title,
    desc: desc,
    startDate: startDate,
    endDate: endDate,
    people: people,
    roomCloseDate: roomCloseDate,
    departLocation: departLocation,
  };
  console.log(data);

  return (
    <StContainer>
      <StStepTitle>
        <strong>STEP 1</strong>여행정보 입력
      </StStepTitle>

      <h1>대륙 선택</h1>
      <ThemeSelect theme={""} setTheme={setTheme} />

      <h1>여행갈 나라/도시 입력</h1>
      <StTags>
        <CreatePostTags
          className="tagbox"
          selectedTags={selectedMeetingTags}
          tags={["예시)프랑스"]}
          tagMassage={"엔터키를 치시면 입력됩니다."}
        />
      </StTags>
      <h1>여행기간</h1>
      <TripPeriod setStartDate={setStartDate} setEndDate={setEndDate} />
      <h1>여행희망인원</h1>
      <TripPeopleCount people={2} setPeople={setPeople} />
      <br />
      <StStepTitle>
        <strong>STEP 2</strong>모집글정보 입력
      </StStepTitle>
      <h1>모집글 제목</h1>
      <StTitleBox
        multiline
        maxRows={4}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <h1>모집글 설명</h1>
      <CreatePostContent
        typedPostContent={typedMeetingContent}
        placeholderText={"모집글 설명을 써주세요."}
      />

      <h1>모집마감일자</h1>
      <RoomCloseDateBox setRoomCloseDate={setRoomCloseDate} />

      <h1>모집 후 모일 장소</h1>
      <MeetingLocationSearch setDepartLocation={setDepartLocation} />
      <StbottonBox>
        <Button
          size="small"
          variant="primary"
          onClick={() => {
            postcreatemeeting();
            // onClickCreateRoom();
          }}
          // disabled={validState ? false : true}
        >
          등록하기
        </Button>
      </StbottonBox>
    </StContainer>
  );
};
export default CreateMeetingContatiner;

const StContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-bottom: 50px;
  h2 {
    font-size: 30px;
    margin-top: 50px;
  }
  h1 {
    font-size: 20px;
    margin-top: 50px;
    margin-bottom: 13px;
  }
`;

const StStepTitle = styled.h2`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.7rem;
  padding-top: 1.2rem;
  margin-bottom: 1.5rem;

  strong {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    line-height: 1;
    color: #000;
    background-color: var(--gray-color);
    border-radius: 5px;
    border: 1px solid #000;
    margin-right: 0.7rem;
    padding: 0.5rem 0.7rem;
  }
`;
const StTitleBox = styled(TextField)`
  width: 100%;

  element.style {
    height: 55px;
  }
  .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
    height: 53px;
    font-size: 1.2rem;
    border: 1px solid var(--gray-color);
    padding: 1rem;
    margin-bottom: 1rem;
    background-color: var(--subBg-color);
  }
  .css-1sqnrkk-MuiInputBase-input-MuiOutlinedInput-input {
    font-size: 1.5rem;
    height: 55px;
    padding: 5px;
  }
`;

const StTags = styled.div`
  .kkqTPl {
    width: 50%;
    height: 55px;
    border-radius: 10px;
    border: 1px solid #a0a0a0;
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
    border: 1px solid;
  }
`;

const StbottonBox = styled.div`
  /* padding: 50px 10px; */
  float: right;
`;

// const StCategorySelectBox = styled.div`
/* display: flex; */
// `
// const StTriplocationBox = styled.div`
// /* display: flex; */
// `
