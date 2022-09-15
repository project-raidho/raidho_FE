import React, { useState } from "react";
import styled from "styled-components";
import ThemeSelect from "./ThemeSelect";
// import { useForm } from "react-hook-form";
import axios from "axios";
import { authInstance } from "../../shared/api";
import Button from "../../elements/Button";
import TripPeriod from "./TripPeriod";

import CreatePostTags from "../createPost/CreatePostTags";
import RoomCloseDateBox from "./RoomclosedateBox";
import MeetingLocationSearch from "./MeetingLocationSearch";
import TripPeopleCount from "./TripPeopleCount";
import TextField from "@mui/material/TextField";
// import chat, { chatActions } from "../../redux/modules/chat";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateMeetingContatiner = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { isSubmitting, isDirty, errors },
  // } = useForm({ mode: "onChange" });

  const navigate = useNavigate();
  const [theme, setTheme] = useState("");
  const [locationtags, setLocationTags] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState([]);
  const [people, setPeople] = useState();
  const [roomClosedate, setRoomCloseDate] = useState();
  const [tripPeriod, setTripPeriod] = useState([
    { startDate: "", endDate: "" },
  ]);
  const [departLocation, setDepartLocation] = useState();

  //유효성 검사
  // const [validState,setValidState] =useState();

  // 방 생성하기
  const onClickCreateRoom = async () => {
    const roomData = {
      chatRoomTitle: title,
      people: people,
      tags: tags,
    };
    try {
      const res = await authInstance.post(`/api/chat/rooms`, roomData);
      window.alert("채팅방이 생성되었습니다.");

      navigate("/meetingList");
      return res;
    } catch (error) {
      console.log(error);
    }

    // dispatch(chatActions.createRoom(roomData));
  };

  const selectedLocationTags = (tags) => {
    setLocationTags(tags);
  };

  const selectedTags = (tags) => {
    setTags(tags);
  };

  const URI = process.env.REACT_APP_BASE_URI;
  // const accesstoken = localStorage.getItem("Authorization");
  // const refreshtoken = localStorage.getItem("RefreshToken");

  const data = {
    theme: theme,
    locationtags: locationtags,
    title: title,
    desc: desc,
    tripPeriod: tripPeriod,
    tags: tags,
    people: people,
    roomClosedate: roomClosedate,
    departLocation: departLocation,
  };
  console.log(data);
  const postcreatemeeting = async (id) => {
    const res = await axios.post(
      `${URI}/detail/${id}`,
      data
      // config
    );
    return res;
  };

  return (
    <StContainer>
      <h2>step 1. 여행정보 입력</h2>
      <h1>대륙 선택</h1>
      <ThemeSelect setTheme={setTheme} />

      <h1>여행갈 나라/도시 입력</h1>
      <StTags>
        <CreatePostTags
          className="tagbox"
          selectedTags={selectedLocationTags}
          tags={["예시)프랑스"]}
          tagMassage={"여행할 도시나 나라를 입력해주세요!"}
        />
      </StTags>
      <h1>여행기간</h1>
      <TripPeriod setTripPeriod={setTripPeriod} />
      <h1>여행희망인원</h1>
      <TripPeopleCount setPeople={setPeople} />
      <br />
      <h2>step 2. 모집글정보 입력</h2>
      <h1>모집글 제목</h1>
      <StTitleBox
        multiline
        maxRows={4}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <h1>모집글 설명</h1>
      <StDescBox
        id="outlined-multiline-static"
        multiline
        rows={4}
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <h1>해시태그</h1>
      <StTags>
        <CreatePostTags
          className="tagbox"
          selectedTags={selectedTags}
          tags={["예시)활동적"]}
          tagMassage={"홍보하고 싶은 내용을 자유롭게 입력해주세요!"}
        />
      </StTags>

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
            onClickCreateRoom();
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
  width: 50%;
  margin: 0 auto;
  h2 {
    font-size: 30px;
    margin-top: 50px;
  }
  h1 {
    font-size: 20px;
    margin-top: 50px;
  }
`;
const StTitleBox = styled(TextField)`
  width: 100%;
  height: 55px;

  element.style {
    height: 50px;
  }
  .css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root {
  }

  .css-1sqnrkk-MuiInputBase-input-MuiOutlinedInput-input {
    font-size: 1.5rem;
    height: 55px;
    padding: 5px;
  }
`;
const StDescBox = styled(TextField)`
  width: 100%;
  .css-1sqnrkk-MuiInputBase-input-MuiOutlinedInput-input {
    font-size: 1.5rem;
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
  padding: 50px 10px;
`;

// const StCategorySelectBox = styled.div`
/* display: flex; */
// `
// const StTriplocationBox = styled.div`
// /* display: flex; */
// `
