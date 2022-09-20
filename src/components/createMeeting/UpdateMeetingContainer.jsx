import React, {
  useState,
  // useEffect
} from "react";
import styled from "styled-components";
import ThemeSelect from "./ThemeSelect";
// import { useForm } from "react-hook-form";
import { authInstance } from "../../shared/api";

import TripPeriod from "./TripPeriod";
import TagInput from "../../elements/TagInput";
import RoomCloseDateBox from "./RoomCloseDateBox";
import MeetingLocationSearch from "./MeetingLocationSearch";
import TripPeopleCount from "./TripPeopleCount";
import TextField from "@mui/material/TextField";
import Modal from "../../global/globalModal/Modal";
import Potal from "../../global/globalModal/Potal";
import Button from "../../elements/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";

const UpdateMeetingContainer = () => {
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
  //첫번째 파라미터: 퀴리 키, 두번재 파라미터, axios 함수, 세번째 파라미터: 옵션
  const meetingDetail_query = useQuery("meetingDetail", getMeetingDetail, {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const navigate = useNavigate();
  // // ::: 게시글 아이디
  const { meetingId } = useParams();

  //서버에서 받아온 데이터
  const [meetingDetail, setMeetintDetail] = useState({
    theme: "국내",
    meetingTags: ["#여긴", "#한국"],
    title: "내가 가는 이길이",
    desc: "어디로 가는지",
    startDate: "2022-09-18",
    endDate: "2022-09-20",
    people: 3,
    roomCloseDate: "2022-10-10",
    departLocation: "경기도 안양시 만안구",
  });

  // ::: 입력된 데이터 취합하기
  const [theme, setTheme] = useState(meetingDetail.theme);
  const [title, setTitle] = useState(meetingDetail.title);
  const [desc, setDesc] = useState(meetingDetail.desc);
  const [meetingTags, setMeetingTags] = useState(meetingDetail.meetingTags);
  const [people, setPeople] = useState(meetingDetail.people);
  console.log(meetingDetail.people);
  const [roomCloseDate, setRoomCloseDate] = useState(
    meetingDetail.roomCloseDate
  );
  console.log(roomCloseDate);
  const [startDate, setStartDate] = useState(meetingDetail.startDate);
  const [endDate, setEndDate] = useState(meetingDetail.endDate);
  const [departLocation, setDepartLocation] = useState(
    meetingDetail.departLocation
  );

  const [tagValidationMsg, setTagValidationMsg] = useState("");
  // const [meetingTagErrorMsg, setMeetingTagErrorMsg] = useState("");
  const [periodErrorMsg, setPeriodErrorMsg] = useState("");

  const data = {
    theme: theme,
    meetingTags: meetingTags,
    title: title,
    desc: desc,
    startDate: startDate,
    endDate: endDate,
    people: people,
    roomCloseDate: roomCloseDate,
    departLocation: departLocation,
  };

  const isValidDate =
    isValidDateFormat(endDate) &&
    isValidDateFormat(startDate) &&
    isValidDateFormat(roomCloseDate) === true;

  //날짜 유효성 검사
  function isValidDateFormat(date) {
    // 자릿수검사
    if (date.length !== 10) return false;

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

  // ::: 수정데이터 유효성검사후 서버에 전송
  const onUpdateMeeting = async () => {
    if (theme.length < 1) {
      return setTagValidationMsg("대륙을 선택해주세요");
    } else if (meetingTags.length < 1) {
      return setTagValidationMsg("나라/도시를 입력해주세요");
    } else if (startDate.length < 1) {
      return setTagValidationMsg("여행시작일을 선택해주세요");
    } else if (isValidDateFormat(startDate) === false) {
      setPeriodErrorMsg("여행시작일의 날짜형식이 잘못되었습니다.");
      return setTagValidationMsg("여행시작일의 날짜형식이 잘못되었습니다.");
    } else if (endDate.length < 1) {
      return setTagValidationMsg("여행종료일을 선택해주세요");
    } else if (isValidDateFormat(endDate) === false) {
      setPeriodErrorMsg("여행종료일의 날짜형식이 잘못되었습니다.");
      return setTagValidationMsg("여행종료일의 날짜형식이 잘못되었습니다.");
    } else if (String(people).length < 1) {
      return setTagValidationMsg("여행희망인원을 선택해주세요");
    } else if (title.length < 1) {
      return setTagValidationMsg("모집글 제목을 입력해주세요");
    } else if (desc.length < 1) {
      return setTagValidationMsg("모집글 설명을 입력해주세요");
    } else if (roomCloseDate.length < 1) {
      return setTagValidationMsg("모집마감일자를 선택해주세요");
    } else if (departLocation.length < 1) {
      return setTagValidationMsg("모집 후 모일 장소를 선택해주세요");
    } else if (isValidDate === false) {
      return setTagValidationMsg("날짜 형식이 잘못되었습니다");
    } else {
      try {
        const res = await authInstance.put(`/api/meeting/${meetingId}`, data);
        console.log(res);
        navigate(-1);
        return res;
      } catch (error) {
        setModalOn(!modalOn);
      }
    }
  };

  const queryClient = useQueryClient();
  //useMutation 첫번째 파라미터: 함수, 두번째 파라미터: 옵션
  const { mutate } = useMutation(onUpdateMeeting, {
    onSuccess: () => {
      queryClient.invalidateQueries("meetingList");
      navigate(-1);
    },
  });

  // ::: 에러메세지(createPotal) 컨트롤 하기
  const [modalOn, setModalOn] = useState(false);
  const handleModal = () => {
    setModalOn(!modalOn);
  };

  const selectedMeetingTags = (tags) => {
    setMeetingTags(tags);
  };

  // ::: 모집글 상세 내용 불러오기
  // useEffect(() => {
  //   getMeetingDetail();
  //   // eslint-disable-next-line
  // }, []);

  // useEffect(() => {
  //   setTitle(meetingDetail.title);
  //   setDesc(meetingDetail.desc);
  //   setMeetingTags(meetingDetail.meetingTags);
  //   setPeople(meetingDetail.people);
  //   setRoomCloseDate(meetingDetail.roomCloseDate);
  //   setStartDate(meetingDetail.startDate);
  //   setEndDate(meetingDetail.endDate);
  //   setDepartLocation(meetingDetail.departLocation);
  // }, [meetingDetail]);
  if (meetingDetail_query.isLoading) {
    return null;
  }
  // const meetingDetail= meetingDetail_query.data.data.data[0]
  return (
    <StCreatePostContainerWrap>
      <StCreatePostColumn>
        <StStepTitle>
          <strong>STEP 1</strong>여행정보 입력
        </StStepTitle>
        <h1>대륙 선택</h1>
        <ThemeSelect theme={theme} setTheme={setTheme} />

        <h1>여행갈 나라/도시 입력</h1>
        <StTags>
          <TagInput
            className="tagbox"
            selectedTags={selectedMeetingTags}
            tags={meetingTags}
            tagMassage={
              meetingTags.length === 0 ? "엔터키를 치시면 입력됩니다." : ""
            }
          />
        </StTags>
        <h1>여행기간</h1>
        <TripPeriod
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <StValidationMsg>{periodErrorMsg}</StValidationMsg>
        <h1>여행희망인원</h1>
        <TripPeopleCount people={people} setPeople={setPeople} />
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
        <StDescBox
          id="outlined-multiline-static"
          multiline
          rows={4}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <h1>모집마감일자</h1>
        <RoomCloseDateBox
          roomCloseDate={roomCloseDate}
          setRoomCloseDate={setRoomCloseDate}
        />

        <h1>모집 후 모일 장소</h1>
        <MeetingLocationSearch
          departLocation={departLocation}
          setDepartLocation={setDepartLocation}
        />
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
          <Button size="small" onClick={mutate}>
            등록
          </Button>
          <StValidationMsg>{tagValidationMsg}</StValidationMsg>
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
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.7rem;
  padding-top: 1.2rem;
  margin-bottom: 1.5rem;
  @media ${(props) => props.theme.mobile} {
    font-size: 1rem;
  }
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

const StButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  width: 100%;
  margin-top: 20px;
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
const StDescBox = styled(TextField)`
  width: 100%;
  .css-1sqnrkk-MuiInputBase-input-MuiOutlinedInput-input {
    font-size: 1.5rem;
    padding: 5px;
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

const StValidationMsg = styled.p`
  font-size: 1.1rem;
  font-weight: 300;
  font-style: italic;
  color: var(--red-color);
  margin-bottom: 1rem;
  margin-top: 1rem;
`;
