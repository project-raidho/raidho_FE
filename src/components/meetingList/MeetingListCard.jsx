import React, { useState } from "react";
import Button from "../../elements/Button";
import DefaultProfileImage from "../../assets/defaultProfileImage.svg";
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";
import { authInstance } from "../../shared/api";
import { useNavigate } from "react-router-dom";
import Modal from "../../global/globalModal/Modal";
import Potal from "../../global/globalModal/Potal";
// ::: 모집글 삭제 axios
const onDeleteMeeting = async (meetingId) => {
  try {
    await authInstance.delete(`/api/meeting/${meetingId}`);
  } catch (error) {
    console.log(error);
  }
};

const MeetingListCard = ({ meeting }) => {
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
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  //useMutation 첫번째 파라미터: 함수, 두번째 파라미터: 옵션
  const { mutate } = useMutation(onDeleteMeeting, {
    onSuccess: () => {
      queryClient.invalidateQueries("meetingList");
    },
  });

  // ::: 날짜 차이 계산하기
  const dateCalculation = (day1, day2) => {
    const dateStart = new Date(day1);
    const dateEnd = new Date(day2);

    const diffDate = dateStart.getTime() - dateEnd.getTime();
    return Math.abs(diffDate / (1000 * 60 * 60 * 24));
  };

  // ::: 모집날짜 몇 박 몇 일 계산하기
  const tripPeriod = dateCalculation(meeting.startDate, meeting.endDate);

  // ::: 오늘 날짜 계산하기
  const todayCalculation = () => {
    const originDate = new Date();
    const year = originDate.getFullYear();
    const month = originDate.getMonth() + 1;
    const date = originDate.getDate();

    return `${year}-${month}-${date}`;
  };
  const today = todayCalculation();

  // ::: 디데이 계산하기
  const dday = Math.floor(dateCalculation(today, meeting.roomCloseDate));

  const onJoinRoom = async (id) => {
    try {
      const res = await authInstance.get(`/api/chat/chatting/${id}`);
      console.log(res);
      //인원 풀이면 오류 처리
      if (res.data.body === "FULL") {
        setModalIcon("info");
        setAlertMsg("인원이 가득찼습니다");
        return setModalOn(true);
      }
      navigate(`/chatting/${meeting.id}`);
    } catch (e) {
      console.log(e);
      setModalIcon("warning");
      setAlertMsg("로그인이 필요합니다.");
      setModalOn(true);
    }
  };

  const onClickMeetingTag = (tag) => {
    const sliceTag = tag.substr(1);
    console.log(sliceTag);
    navigate(`/meeting/chat?tag=${sliceTag}`, {
      state: {
        tagKeyword: sliceTag,
      },
    });
  };

  return (
    <StMeetingListCardWrap>
      <StMeetingCardUpDown>
        <StMeetingCardRow className="flexBetweenLayout">
          <p className="infoStatus">
            {meeting.meetingStatus === 1 && (
              <span className="statusIng">
                <i></i>모집중 D-<b>{dday}</b>
              </span>
            )}
            {meeting.meetingStatus === 2 && (
              <span className="statusComplete">
                <i></i>모집마감 D-<b>{dday}</b>
              </span>
            )}
            {meeting.meetingStatus === 3 && (
              <span className="statusFinished">
                <i></i>모집종료
              </span>
            )}
          </p>
          {meeting.meetingStatus === 1 && (
            <p className="infoStatus">
              모집인원 {meeting.memberCount}/{meeting.people}
            </p>
          )}
          {meeting.meetingStatus === 2 && (
            <p className="infoStatus statusComplete">
              모집인원 {meeting.memberCount}/{meeting.people}
            </p>
          )}
        </StMeetingCardRow>
        <h3>{meeting.title}</h3>
        <p className="meetingPeriod">
          <span>{` ${meeting.startDate.split("-")[1]}/${
            meeting.startDate.split("-")[2]
          }-${meeting.endDate.split("-")[1]}/${
            meeting.endDate.split("-")[2]
          }`}</span>
          {tripPeriod === 0
            ? `(${tripPeriod + 1}일)`
            : `(${tripPeriod}박 ${tripPeriod + 1}일)`}
        </p>
        <p className="meetingAddress">{meeting.departLocation}</p>
        <p className="desc">{meeting.desc}</p>
      </StMeetingCardUpDown>
      <StMeetingCardUpDown>
        <StMeetingCardRow>
          {meeting.meetingTags.map((tag, index) => (
            <span
              key={index}
              className="tag"
              onClick={() => onClickMeetingTag(tag)}
            >
              {tag}&nbsp;
            </span>
          ))}
        </StMeetingCardRow>
        <StMeetingCardRow>
          <p className="memberImageBox">
            <img
              src={
                meeting.memberImage === null
                  ? DefaultProfileImage
                  : meeting.memberImage
              }
              alt={meeting.memberName}
            />
          </p>
          <p className="memberNameBox">@{meeting.memberName}</p>
        </StMeetingCardRow>
        <StMeetingCardRow className="flexBetweenLayout">
          <Button size="tag" variant="gray">
            {meeting.themeCategory}
          </Button>
          <div>
            {meeting.isMine && (
              <Button
                size="small"
                variant="lineLightBlue"
                onClick={() => {
                  navigate(`/updateMeeting/${meeting.id}`);
                }}
              >
                수정하기
              </Button>
            )}
            {meeting.isMine && (
              <Button
                size="small"
                variant="lineGray"
                onClick={() => mutate(meeting.id)}
              >
                삭제하기
              </Button>
            )}
            {!meeting.isMine &&
              meeting.meetingStatus === 1 &&
              !meeting.isAlreadyJoin && (
                <Button
                  size="small"
                  variant="lineLightBlue"
                  onClick={() => onJoinRoom(meeting.id)}
                >
                  참여하기
                </Button>
              )}
            {meeting.isAlreadyJoin && (
              <p className="isInMeetingMsg">이미 참여중인 모집입니다.</p>
            )}
          </div>
        </StMeetingCardRow>
      </StMeetingCardUpDown>

      <Potal>
        {modalOn && (
          <Modal
            onCloseModal={onCloseModal}
            modalIcon={modalIcon}
            alertMsg={alertMsg}
            onClickYes={onClickYes}
          />
        )}
      </Potal>
    </StMeetingListCardWrap>
  );
};

export default MeetingListCard;

const StMeetingListCardWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 320px;
  height: 500px;
  margin: 1rem;
  padding: 1.7rem;
  background-color: var(--subBg-color);
  border: 1px solid var(--gray-color);
  border-radius: 15px;

  h3 {
    font-size: 1.7rem;
    margin-top: 1.3rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;

    &.meetingPeriod {
      span {
        font-size: 1.2rem;
      }
    }

    &.meetingAddress {
      font-weight: 500;
      text-decoration: underline;
    }
  }

  .tag {
    color: var(--lightBlue-color);
    font-size: 1.2rem;
    cursor: pointer;
  }
`;

const StMeetingCardUpDown = styled.div`
  width: 100%;

  .desc {
    padding-top: 1rem;
    font-size: 1rem;
  }
`;

const StMeetingCardRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }

  &.flexBetweenLayout {
    justify-content: space-between;
  }
  button {
    padding: 0px 20px;
    margin-right: 0.5rem;
    &:last-child {
      margin-right: 0;
    }
  }
  p {
    font-size: 1.5rem;
  }

  & > span {
    font-size: 1.3rem;
    font-weight: 400;
  }

  .infoStatus {
    font-size: 1rem;
    color: var(--lightBlue-color);

    & > span {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      font-size: 1rem;
      color: var(--lightBlue-color);

      i {
        width: 13px;
        height: 13px;
        background-color: var(--lightBlue-color);
        margin-right: 5px;
        border-radius: 50%;
      }

      &.statusComplete {
        color: var(--red-color);

        b {
          color: var(--red-color);
        }
        i {
          background-color: var(--red-color);
        }
      }

      &.statusFinished {
        color: var(--gray-color);

        b {
          color: var(--gray-color);
        }
      }

      & > b {
        font-size: 1rem;
        color: var(--lightBlue-color);
      }
    }
  }

  .statusComplete {
    color: var(--red-color);
  }

  .memberImageBox {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 1rem;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .memberNameBox {
    font-size: 1.25rem;
  }

  .isInMeetingMsg {
    position: absolute;
    height: 15px;
    bottom: -30px;
    right: 10px;
    font-size: 0.8rem;
    font-style: italic;
  }
`;
