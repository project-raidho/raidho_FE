import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import ThemeSelect from "./ThemeSelect";
// import TagInput from "../../elements/TagInput";
import { authInstance } from "../../shared/api";

import TripPeriod from "./TripPeriod";

import RoomCloseDateBox from "./RoomCloseDateBox";
import MeetingLocationSearch from "./MeetingLocationSearch";
import TripPeopleCount from "./TripPeopleCount";

import AlertModal from "../../global/globalModal/AlertModal";
import Potal from "../../global/globalModal/Potal";
import Button from "../../elements/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import MeetingTitle from "./MeetingTitle";
import ContentTextArea from "../../elements/ContentTextArea";

const UpdateMeetingContainer = () => {
  const { meetingId } = useParams();
  // ::: 입력된 데이터 취합하기
  const navigate = useNavigate();

  // ::: 에러메세지(createPotal) 컨트롤 하기
  const [modalOn, setModalOn] = useState(false);
  const [modalIcon, setModalIcon] = useState<
    "" | "success" | "warning" | "info"
  >("");
  const [alertMsg, setAlertMsg] = useState("");

  const onCloseModal = () => {
    setModalOn(!modalOn);
  };
  const onClickYes = () => {
    setModalOn(!modalOn);
    if (alertMsg === "모집글이 수정되었습니다.") {
      return navigate(-1);
    }
  };

  // :::  모집글 단건 조회
  const getMeetingDetail = async () => {
    return await authInstance.get(`/api/chat/rooms/${Number(meetingId)}`);
  };
  //첫번째 파라미터: 퀴리 키, 두번재 파라미터, axios 함수, 세번째 파라미터: 옵션
  const meetingDetail_query = useQuery("meetingDetail", getMeetingDetail, {
    onSuccess: (data) => {
      console.log(data);
    },
  });
  // console.log(meetingDetail_query);

  const [theme, setTheme] = useState("");
  const [meetingTags, setMeetingTags] = useState([""]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [people, setPeople] = useState<number | undefined>();
  const [roomCloseDate, setRoomCloseDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [departLocation, setDepartLocation] = useState("");
  const [maxRoomCloseDate, setmaxRoomCloseDate] = useState<Date | undefined>();
  //서버에서 받아온 데이터

  const data = {
    title: title,
    desc: desc,
    startDate: startDate,
    endDate: endDate,
    people: Number(people),
    roomCloseDate: roomCloseDate,
    departLocation: departLocation,
  };

  //날짜 유효성 검사
  function isValidDateFormat(date: string) {
    // 자릿수검사
    if (date?.length !== 10) return false;

    // 특수문자 제거
    let regex = /(\.)|(-)|(\/)/g;
    date = date.replace(regex, "");

    // 타입 검사 (숫자)
    let format = /^[12][0-9]{7}/;

    if (!format.test(date)) return false;
    // .test: 해당 date가 정규식에 충족하는지 boolean 형태로 반환

    // 월 일 검사
    let y = parseInt(date.substr(0, 4));
    let m = parseInt(date.substr(4, 2));
    let d = parseInt(date.substr(6));

    if (m < 1 || m > 12) return false;

    let lastDay = new Date(y, m, 0).getDate();
    if (d < 1 || d > lastDay) return false;

    return true;
  }

  // ::: 유효성 검사 메시지 상태관리하기

  const [periodValMsg, setPeriodValMsg] = useState("");
  const [peopleValMsg, setPeopleValMsg] = useState("");
  const [titleValMsg, setTitleValMsg] = useState("");
  const [descValMsg, setdescValMsg] = useState("");
  const [roomCloseDateValMsg, setRoomCloseDateValMsg] = useState("");
  const [departLocationValMsg, setDepartLocationValMsg] = useState("");
  const [allValMsg, setAllValMsg] = useState("");

  // ::: 수정데이터 유효성검사후 서버에 전송
  const onUpdateMeeting = async () => {
    if (startDate.length < 1) {
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
      await authInstance.put(`/api/meeting/${Number(meetingId)}`, data);
      setModalIcon("success");
      setAlertMsg("모집글이 수정되었습니다.");
      setModalOn(true);
    }
  };

  //실시간 유효성 검사
  useEffect(() => {
    if (String(people).length > 0) {
      setPeopleValMsg("");
    }
    if (title?.length > 0) {
      setTitleValMsg("");
    }
    if (desc?.length > 0) {
      setdescValMsg("");
    }
    if (roomCloseDate?.length > 0) {
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
  }, [people, title, desc, roomCloseDate, departLocation]);

  const isValidAll =
    theme?.length >= 1 &&
    title?.length >= 1 &&
    desc?.length >= 1 &&
    meetingTags?.length >= 1 &&
    String(people)?.length >= 1 &&
    roomCloseDate?.length >= 1 &&
    startDate?.length >= 1 &&
    endDate?.length >= 1 &&
    departLocation?.length >= 1;

  const queryClient = useQueryClient();
  //useMutation 첫번째 파라미터: 함수, 두번째 파라미터: 옵션
  const { mutate } = useMutation(onUpdateMeeting, {
    onSuccess: () => {
      queryClient.invalidateQueries("meetingList");
    },
    onError: () => {
      setModalIcon("warning");
      setAlertMsg("모집글 수정이 실패했습니다.");
      setModalOn(true);
    },
  });

  const meetingDetail = meetingDetail_query?.data?.data;
  useEffect(() => {
    setTheme(meetingDetail?.themeCategory);
    setMeetingTags(meetingDetail?.meetingTags);
    setTitle(meetingDetail?.title);
    setDesc(meetingDetail?.desc);
    setPeople(meetingDetail?.people);
    setRoomCloseDate(meetingDetail?.roomCloseDate);
    setStartDate(meetingDetail?.startDate);
    setEndDate(meetingDetail?.endDate);
    setDepartLocation(meetingDetail?.departLocation);
  }, [meetingDetail]);

  const onChangeContent = (content: string) => {
    setDesc(content);
  };

  const onChangeLocation = (Location: string) => {
    setDepartLocation(Location);
  };

  const onChangeTitle = (title: string) => {
    setTitle(title);
  };

  if (meetingDetail_query.isLoading) {
    return null;
  }
  return (
    <StContainer>
      <StCreatePostColumn>
        <h1>카테고리</h1>
        <div className="theme">{theme}</div>

        <h1>여행갈 나라/도시</h1>
        <StTags>
          <ul className="tags">
            {meetingTags?.map((tag, index) => (
              <li key={index} className="tag">
                <span className="tagName">{tag.slice(1)}</span>
              </li>
            ))}
          </ul>
        </StTags>
        <StStepTitle>1. 여행정보 수정</StStepTitle>
        <StPeriodPeople>
          <div>
            <TripPeriod
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              setmaxRoomCloseDate={setmaxRoomCloseDate}
            />
            <StValidationMsg>{periodValMsg}</StValidationMsg>
          </div>
          <div className="peopleBox">
            <TripPeopleCount people={people} setPeople={setPeople} />
            <StValidationMsg>{peopleValMsg}</StValidationMsg>
          </div>
        </StPeriodPeople>
        <br />
        <StStepTitle>2. 모집글정보 수정</StStepTitle>
        <h1>모집글/채팅방 제목 *</h1>

        <MeetingTitle
          onChangeMeetingTitle={onChangeTitle}
          placeholderText={"모집글 제목을 써주세요."}
          initialContent={title}
        />
        <StValidationMsg>{titleValMsg}</StValidationMsg>
        <h1>모집글 설명 *</h1>
        <ContentTextArea
          typedPostContent={onChangeContent}
          placeholderText={"모집글 설명을 써주세요."}
          initialContent={desc}
          ValRedMsg={descValMsg}
        />
        <RoomCloseDateBox
          roomCloseDate={roomCloseDate}
          setRoomCloseDate={setRoomCloseDate}
          maxRoomCloseDate={maxRoomCloseDate}
        />
        <StValidationMsg>{roomCloseDateValMsg}</StValidationMsg>
        <MeetingLocationSearch
          departLocation={departLocation}
          onChangeLocation={onChangeLocation}
        />
        <StValidationMsg>{departLocationValMsg}</StValidationMsg>
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

          <Button size="small" variant="primary" onClick={() => mutate()}>
            등록
          </Button>
        </StButtonWrap>
        <StValidationMsg className="allValMsg">{allValMsg}</StValidationMsg>
      </StCreatePostColumn>
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

export default UpdateMeetingContainer;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  h2 {
    font-size: 30px;
    margin-top: 30px;
    margin-bottom: 0;
  }
  h1 {
    font-size: 20px;
    margin-top: 15px;
    margin-bottom: 13px;
  }

  .tagBox {
    border-radius: 15px;
  }
  textarea {
    border-radius: 15px;
  }
  .theme {
    margin-top: 10px;
    width: 200px;
    height: 40px;
    border: 1px solid #7188ff;
    border-radius: 25px;
    background: #7188ff;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
  .allValMsg {
    float: right;
  }

  @media (max-width: 1023px) {
    flex-direction: column;
  }
  @media (max-width: 767px) {
  }
  @media ${(props) => props.theme.mobile} {
  }
`;
const StCreatePostColumn = styled.div`
  width: 100%;
  padding: 1rem;
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
  .tags {
    display: flex;
    margin: 8px 0 0 0;
  }
  .tag {
    width: auto;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-color);
    padding: 0 8px;
    font-size: 1.5rem;
    list-style: none;
    border-radius: 20px;
    margin-right: 8px;
    background: var(--main-color);
    .tagName {
      color: #fff;
      padding: 0 8px;
    }
  }
`;

const StValidationMsg = styled.p`
  font-size: 1.1rem;
  font-weight: 300;
  font-style: italic;
  color: var(--red-color);
  margin-bottom: 1rem;
  margin-top: 1rem;
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

const StButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  width: 100%;
  margin-top: 20px;
  button {
    margin-left: 10px;
    margin-right: 0;
  }
`;
