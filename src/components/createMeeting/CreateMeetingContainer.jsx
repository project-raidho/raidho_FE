import React, { useState } from "react";
import styled from "styled-components";
import ThemeSelect from "./ThemeSelect";
// import { useForm } from "react-hook-form";
import { authInstance } from "../../shared/api";
import Button from "../../elements/Button";
import TripPeriod from "./TripPeriod";
import AlertModal from "../../global/globalModal/AlertModal";
import Potal from "../../global/globalModal/Potal";

import TagInput from "../../elements/TagInput";
import RoomCloseDateBox from "./RoomCloseDateBox";
import MeetingLocationSearch from "./MeetingLocationSearch";
import TripPeopleCount from "./TripPeopleCount";
import { useNavigate } from "react-router-dom";

//리액트 쿼리
import { useMutation, useQueryClient } from "react-query";
import { useEffect } from "react";
import MeetingTitle from "./MeetingTitle";
import ContentTextArea from "../../elements/ContentTextArea";

const CreateMeetingContatiner = () => {
  const [theme, setTheme] = useState("");
  const [meetingTags, setMeetingTags] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [people, setPeople] = useState(2);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [roomCloseDate, setRoomCloseDate] = useState("");
  const [departLocation, setDepartLocation] = useState("");
  const [maxRoomCloseDate, setmaxRoomCloseDate] = useState("");
  //모달 상태관리
  const [modalOn, setModalOn] = useState(false);
  const [modalIcon, setModalIcon] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  const onCloseModal = () => {
    setModalOn(!modalOn);
  };
  const onClickYes = () => {
    setModalOn(!modalOn);
    navigate(`/meetingList/all`);
  };
  const data = {
    themeCategory: theme,
    meetingTags: meetingTags,
    title: title,
    desc: desc,
    startDate: startDate,
    endDate: endDate,
    people: Number(people),
    roomCloseDate: roomCloseDate,
    departLocation: departLocation,
  };
  // console.log(data, people);

  const navigate = useNavigate();
  const postCreateMeeting = async () => {
    if (theme.length < 1) {
      setAllValMsg("대륙을 선택해주세요");
      return setThemeValMsg("대륙을 선택해주세요");
    } else if (meetingTags.length < 1) {
      setAllValMsg("나라/도시를 입력해주세요");
      return setTagValrMsg("나라/도시를 입력해주세요");
    } else if (startDate.length < 1) {
      setAllValMsg("여행시작일을 선택해주세요");
      return setPeriodValMsg("여행시작일을 선택해주세요");
    } else if (isValidDateFormat(startDate) === false) {
      setAllValMsg("여행시작일의 날짜형식이 잘못되었습니다.");
      return setPeriodValMsg("여행시작일의 날짜형식이 잘못되었습니다.");
    } else if (endDate.length < 1) {
      setAllValMsg("여행종료일을 선택해주세요");
      return setPeriodValMsg("여행종료일을 선택해주세요");
    } else if (isValidDateFormat(endDate) === false) {
      setAllValMsg("여행종료일의 날짜형식이 잘못되었습니다.");
      return setPeriodValMsg("여행종료일의 날짜형식이 잘못되었습니다.");
    } else if (String(people).length < 1) {
      setAllValMsg("여행희망인원을 선택해주세요");
      return setPeopleValMsg("여행희망인원을 선택해주세요");
    } else if (title.length < 1) {
      setAllValMsg("모집글 제목을 입력해주세요");
      return setTitleValMsg("모집글 제목을 입력해주세요");
    } else if (desc.length < 1) {
      setAllValMsg("모집글 설명을 입력해주세요");
      return setdescValMsg("모집글 설명을 입력해주세요");
    } else if (roomCloseDate.length < 1) {
      setAllValMsg("모집마감일자를 선택해주세요");
      return setRoomCloseDateValMsg("모집마감일자를 선택해주세요");
    } else if (isValidDateFormat(roomCloseDate) === false) {
      setAllValMsg("모집마감일자의 날짜 형식이 잘못되었습니다.");
      return setRoomCloseDateValMsg(
        "모집마감일자의 날짜 형식이 잘못되었습니다."
      );
    } else if (departLocation.length < 1) {
      setAllValMsg("모집 후 모일 장소를 선택해주세요");
      return setDepartLocationValMsg("모집 후 모일 장소를 선택해주세요");
    } else {
      const res = await authInstance.post(`/api/meeting`, data);

      const chattingId = res.data.data.id;

      await authInstance.post(`/api/chat/room/create`, {
        roomName: title,
        meetingPostId: chattingId,
        people: people,
        // theme: theme,
      });
      setModalIcon("success");
      setAlertMsg("모집글과 채팅방이 생성되었습니다.");
      setModalOn(true);
    }
  };

  // ::: 유효성 검사 메시지 상태관리하기
  const [themeValMsg, setThemeValMsg] = useState("");
  const [tagValMsg, setTagValrMsg] = useState("");
  const [periodValMsg, setPeriodValMsg] = useState("");
  const [peopleValMsg, setPeopleValMsg] = useState("");
  const [titleValMsg, setTitleValMsg] = useState("");
  const [descValMsg, setdescValMsg] = useState("");
  const [roomCloseDateValMsg, setRoomCloseDateValMsg] = useState("");
  const [departLocationValMsg, setDepartLocationValMsg] = useState("");
  const [allValMsg, setAllValMsg] = useState("");

  //실시간 유효성 검사
  useEffect(() => {
    if (theme.length > 0) {
      setThemeValMsg("");
    }
    if (meetingTags.length > 0) {
      setTagValrMsg("");
    }
    if (startDate.length > 0) {
      setPeriodValMsg("");
    }
    if (isValidDateFormat(startDate)) {
      setPeriodValMsg("");
    }
    if (endDate.length > 0) {
      setPeriodValMsg("");
    }
    if (isValidDateFormat(endDate)) {
      setPeriodValMsg("");
    }
    if (people.length > 0) {
      setPeopleValMsg("");
    }
    if (title.length > 0) {
      setTitleValMsg("");
    }
    if (desc.length > 0) {
      setdescValMsg("");
    }
    if (roomCloseDate.length > 0) {
      setRoomCloseDateValMsg("");
    }
    if (isValidDateFormat(roomCloseDate)) {
      setRoomCloseDateValMsg("");
    }
    if (departLocation?.length > 0) {
      setDepartLocationValMsg("");
    }

    if (isValidAll) {
      setAllValMsg("");
    } else {
      setAllValMsg("빈칸을 모두 입력해주세요");
    }
    // eslint-disable-next-line
  }, [
    theme,
    meetingTags,
    startDate,
    endDate,
    people,
    title,
    desc,
    roomCloseDate,
    departLocation,
  ]);

  //post mutation
  const queryClient = useQueryClient();
  const { mutate } = useMutation(postCreateMeeting, {
    onSuccess: () => {
      queryClient.invalidateQueries("meetingList");
    },
  });

  //유효성 검사
  // 모든 input의 value가 1자 이상이 되어야 한다
  const isValidAll =
    theme.length >= 1 &&
    title.length >= 1 &&
    desc.length >= 1 &&
    meetingTags.length >= 1 &&
    String(people).length >= 1 &&
    roomCloseDate.length >= 1 &&
    startDate.length >= 1 &&
    endDate.length >= 1 &&
    departLocation.length >= 1;

  //날짜 유효성 검사
  function isValidDateFormat(date) {
    // 자릿수검사
    if (date.length !== 10) return false;

    // 특수문자 제거
    let regex = /(\.)|(-)|(\/)/g;
    date = date.replace(regex, "");

    // 타입 검사 (숫자)
    let format = /^[12][0-9]{7}/;
    // .test: 해당 date가 정규식에 충족하는지 boolean 형태로 반환
    if (!format.test(date)) return false;

    // 월 일 검사
    let y = parseInt(date.substr(0, 4));
    let m = parseInt(date.substr(4, 2));
    let d = parseInt(date.substr(6));

    if (m < 1 || m > 12) return false;

    let lastDay = new Date(y, m, 0).getDate();
    if (d < 1 || d > lastDay) return false;

    return true;
  }

  const selectedMeetingTags = (tags) => {
    setMeetingTags(tags);
  };
  const typedMeetingContent = (text) => {
    setDesc(text);
  };

  const onChangeMeetingTitle = (text) => {
    setTitle(text);
  };

  return (
    <StContainer>
      <StStepTitle>여행정보 입력</StStepTitle>

      <h1>대륙 선택 *</h1>
      <ThemeSelect theme={""} setTheme={setTheme} />
      <StValidationMsg>{themeValMsg}</StValidationMsg>
      <h1>여행갈 나라/도시 태그 입력 *(**태그입력은 엔터로 입력됩니다!)</h1>
      <StTags>
        <TagInput
          selectedTags={selectedMeetingTags}
          tags={[]}
          tagMassage={
            meetingTags.length === 0 ? "엔터키를 치시면 입력됩니다." : ""
          }
          tagValMsg={tagValMsg}
        />
      </StTags>
      <StPeriodPeople>
        <div>
          <TripPeriod
            className="periodBox"
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setmaxRoomCloseDate={setmaxRoomCloseDate}
          />
          <StValidationMsg>{periodValMsg}</StValidationMsg>
        </div>
        <div className="peopleBox">
          <TripPeopleCount people={2} setPeople={setPeople} />
          <StValidationMsg>{peopleValMsg}</StValidationMsg>
        </div>
      </StPeriodPeople>
      <br />

      <StStepTitle>모집글정보 입력</StStepTitle>
      <h1>모집글/채팅방 제목 *</h1>
      <MeetingTitle
        onChangeMeetingTitle={onChangeMeetingTitle}
        placeholderText={"모집글 제목을 써주세요."}
      />
      <StValidationMsg>{titleValMsg}</StValidationMsg>
      <h1>모집글 설명 *</h1>
      <ContentTextArea
        typedPostContent={typedMeetingContent}
        placeholderText={"모집글 설명을 써주세요."}
        initialContent=""
        ValRedMsg={descValMsg}
      />
      <RoomCloseDateBox
        setRoomCloseDate={setRoomCloseDate}
        maxRoomCloseDate={maxRoomCloseDate}
      />
      <StValidationMsg>{roomCloseDateValMsg}</StValidationMsg>
      <MeetingLocationSearch setDepartLocation={setDepartLocation} />
      <StValidationMsg>{departLocationValMsg}</StValidationMsg>
      <StbottonBox>
        <Button
          className="createButton"
          size="small"
          variant="primary"
          onClick={mutate}
          // disabled={validState ? false : true}
        >
          등록하기
        </Button>
        <StValidationMsg>{allValMsg}</StValidationMsg>
      </StbottonBox>
      <Potal>
        {modalOn && (
          <AlertModal
            onCloseModal={onCloseModal}
            modalIcon={modalIcon}
            alertMsg={alertMsg}
            onClickYes={onClickYes}
          />
        )}
      </Potal>
    </StContainer>
  );
};
export default CreateMeetingContatiner;

const StContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  padding-bottom: 50px;
  h2 {
    font-size: 30px;
    margin-top: 30px;
  }
  h1 {
    font-size: 1.3rem;
    margin-top: 20px;
    margin-bottom: 13px;
  }
  .tagBox {
    border-radius: 15px;
  }
  textarea {
    border-radius: 15px;
  }
`;

const StStepTitle = styled.h2`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.7rem;
  padding-top: 1.2rem;
  margin-bottom: 1.5rem;
  @media ${(props) => props.theme.mobile} {
    font-size: 1rem;
  }
`;

const StTags = styled.div`
  .kkqTPl {
    width: 90%;
    height: 55px;
    border-radius: 10px;
    border: 1px solid #a0a0a0;
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
    border: 1px solid;
  }
`;

const StPeriodPeople = styled.div`
  display: flex;
  .peopleBox {
    margin-left: 50px;
  }
  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
    .peopleBox {
      margin-left: 0;
    }
  }
`;
const StbottonBox = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  float: right;
  align-items: flex-end;
  .createButton {
    margin-right: 0;
  }
`;

const StValidationMsg = styled.p`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  font-size: 1rem;
  color: var(--red-color);
  margin-bottom: 1rem;
  margin-top: 1rem;
`;
