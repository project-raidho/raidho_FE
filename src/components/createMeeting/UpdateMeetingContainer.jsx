import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ThemeSelect from "./ThemeSelect";
// import { useForm } from "react-hook-form";
import { authInstance } from "../../shared/api";

import TripPeriod from "./TripPeriod";
import CreatePostTags from "../createPost/CreatePostTags";
import RoomCloseDateBox from "./RoomclosedateBox";
import MeetingLocationSearch from "./MeetingLocationSearch";
import TripPeopleCount from "./TripPeopleCount";
import TextField from "@mui/material/TextField";
import Modal from "../../global/globalModal/Modal";
import Potal from "../../global/globalModal/Potal";
import Button from "../../elements/Button";
import { useNavigate, useParams } from "react-router-dom";

const UpdateMeetingContainer = () => {
  const navigate = useNavigate();
  // // ::: 게시글 아이디
  const { meetingId } = useParams();

  //서버에서 받아온 데이터
  const [meetingDetail, setMeetintDetail] = useState({
    theme: "국내",
    tags: ["#여긴", "#한국"],
    title: "내가 가는 이길이",
    desc: "어디로 가는지",
    tripPeriod: { startDate: "2022-09-18", endDate: "2022-09-20" },
    people: "3",
    roomClosedate: "2022-10-10",
    departLocation: "경기도 안양시 만안구",
  });

  // ::: 입력된 데이터 취합하기
  const [theme, setTheme] = useState(meetingDetail.theme);
  const [title, setTitle] = useState(meetingDetail.title);
  const [desc, setDesc] = useState(meetingDetail.desc);
  const [tags, setTags] = useState(meetingDetail.tags);
  const [people, setPeople] = useState(meetingDetail.people);
  const [roomClosedate, setRoomCloseDate] = useState(
    meetingDetail.roomClosedate
  );
  const [tripPeriod, setTripPeriod] = useState(meetingDetail.tripPeriod);
  const [departLocation, setDepartLocation] = useState(
    meetingDetail.departLocation
  );

  const data = {
    theme: theme,
    tags: tags,
    title: title,
    desc: desc,
    tripPeriod: tripPeriod,
    people: people,
    roomClosedate: roomClosedate,
    departLocation: departLocation,
  };

  // ::: 수정데이터 서버에 전송
  const onUpdateMeeting = async () => {
    const formData = new FormData();
    formData.append("theme", theme);
    formData.append("tags", tags);
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("tripPeriod", tripPeriod);
    formData.append("people", people);

    try {
      const res = await authInstance.put(`/api/meeting/${meetingId}`, formData);
      console.log("postResponse", res.data);
      navigate(-1);
    } catch (error) {
      console.log("게시글 수정 데이터 전송 오류가 났습니다!", error);
      setModalOn(!modalOn);
    }
  };

  // ::: 에러메세지(createPotal) 컨트롤 하기
  const [modalOn, setModalOn] = useState(false);
  const handleModal = () => {
    setModalOn(!modalOn);
  };

  const selectedTags = (tags) => {
    setTags(tags);
  };

  // :::  모집글 단건 조회
  const getMeetingDetail = async () => {
    try {
      const res = await authInstance.get(`/api/post/${meetingId}`);
      console.log(res.data);
      setMeetintDetail(res.data.data[0]);
    } catch (error) {
      console.log("모집글 단건조회 에러", error);
    }
  };

  // ::: 모집글 상세 내용 불러오기
  useEffect(() => {
    getMeetingDetail(meetingId);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setTitle(meetingDetail.title);
    setDesc(meetingDetail.desc);
    setTags(meetingDetail.tags);
    setPeople(meetingDetail.people);
    setRoomCloseDate(meetingDetail.roomCloseDate);
    setTripPeriod(meetingDetail.tripPeriod);
    setDepartLocation(meetingDetail.departLocation);
  }, [meetingDetail]);

  return (
    <StCreatePostContainerWrap>
      <StCreatePostColumn>
        <h2>step 1. 여행정보 입력</h2>
        <h1>대륙 선택</h1>
        <ThemeSelect theme={theme} setTheme={setTheme} />

        <h1>여행갈 나라/도시 입력</h1>
        <StTags>
          <CreatePostTags
            className="tagbox"
            selectedTags={selectedTags}
            tags={tags}
            tagMassage={"엔터키를 치시면 입력됩니다."}
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

        <h1>모집마감일자</h1>
        <RoomCloseDateBox setRoomCloseDate={setRoomCloseDate} />

        <h1>모집 후 모일 장소</h1>
        <MeetingLocationSearch setDepartLocation={setDepartLocation} />
        <StButtonWrap>
          <Button
            size="small"
            variant="gray"
            onClick={() => {
              navigate(-1);
            }}
          >
            취소
          </Button>
          <Button size="small" onClick={onUpdateMeeting}>
            등록
          </Button>
        </StButtonWrap>
      </StCreatePostColumn>
      <Potal>
        {modalOn && (
          <Modal onClose={handleModal}>
            <StErrorMessage>
              죄송합니다. <br />
              게시글을 수정하는 데 오류가 났습니다. <br />
              다시 한 번 시도해주세요.
            </StErrorMessage>
            <StButtonWrap>
              <Button size="medium" onClick={handleModal}>
                다시 수정하기
              </Button>
            </StButtonWrap>
          </Modal>
        )}
      </Potal>
    </StCreatePostContainerWrap>
  );
};

export default UpdateMeetingContainer;

const StCreatePostContainerWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  h2 {
    font-size: 30px;
    margin-top: 50px;
  }
  h1 {
    font-size: 20px;
    margin-top: 50px;
  }

  @media (max-width: 1023px) {
    flex-direction: column;
  }
  @media (max-width: 767px) {
  }
  @media (max-width: 639px) {
  }
`;
const StCreatePostColumn = styled.div`
  width: 100%;
  padding: 1rem;
`;

const StStepTitle = styled.h2`
  font-size: 1.5rem;
  padding-top: 1.2rem;
  margin-bottom: 1rem;
`;

const StButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  width: 100%;

  button {
    margin-left: 10px;
  }
`;

const StErrorMessage = styled.div`
  width: 100%;
  height: 150px;
  font-size: 1.2rem;
  line-height: 1.5;
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
