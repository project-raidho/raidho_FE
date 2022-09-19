import React from "react";
import Button from "../../elements/Button";
import DefaultProfileImage from "../../assets/defaultProfileImage.svg";
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";
import { authInstance } from "../../shared/api";

// ::: 모집글 삭제 axios
const onDeleteMeeting = async (meetingId) => {
  try {
    await authInstance.delete(`/api/meeting/${meetingId}`);
  } catch (error) {
    console.log(error);
  }
};

const MeetingListCard = ({ meeting }) => {
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

  return (
    <StMeetingListCardWrap>
      <StMeetingCardUpDown>
        <StMeetingCardRow className="flexBetweenLayout">
          <p className="infoStatus">
            {meeting.meetingStatus === 1 && (
              <span>
                모집중 D-<b>{dday}</b>
              </span>
            )}
            {meeting.meetingStatus === 2 && (
              <span>
                모집완료 D<b>-10</b>
              </span>
            )}
            {meeting.meetingStatus === 3 && <span>여행완료</span>}
          </p>
          <p className="infoStatus">
            모집인원 {meeting.meetingParticipant}/{meeting.people}
          </p>
        </StMeetingCardRow>
        <h3>{meeting.title}</h3>
        <p>
          {tripPeriod === 0
            ? `${tripPeriod + 1}일`
            : `${tripPeriod}박 ${tripPeriod + 1}일`}
          <span>{` (${meeting.startDate.split("-")[1]}/${
            meeting.startDate.split("-")[2]
          } - ${meeting.endDate.split("-")[1]}/${
            meeting.endDate.split("-")[2]
          })`}</span>
        </p>
        <p>{meeting.departLocation}</p>
        <p className="desc">{meeting.desc}</p>
      </StMeetingCardUpDown>
      <StMeetingCardUpDown>
        <StMeetingCardRow>
          {meeting.meetingTags.map((tag, index) => (
            <span key={tag + index}>{tag}&nbsp;</span>
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
            {meeting.isMine && <Button variant="gray">수정하기</Button>}
            {meeting.isMine && (
              <Button variant="primary" onClick={() => mutate(meeting.id)}>
                삭제하기
              </Button>
            )}
            {!meeting.isMine && (
              <Button
                variant="primary"
                // onClick={() =>
                //   onDeleteMeeting(meeting.id)
                // }
              >
                참여하기
              </Button>
            )}
          </div>
        </StMeetingCardRow>
      </StMeetingCardUpDown>
    </StMeetingListCardWrap>
  );
};

export default MeetingListCard;

const StMeetingListCardWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 300px;
  height: 500px;
  margin: 1rem;
  padding: 1.7rem;
  background-color: var(--subBg-color);
  border: 1px solid var(--gray-color);
  border-radius: 20px;

  h3 {
    font-size: 2rem;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
  }
`;

const StMeetingCardUpDown = styled.div`
  width: 100%;

  .desc {
    padding-top: 1rem;
    font-size: 1.3rem;
  }
`;

const StMeetingCardRow = styled.div`
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
    font-size: 1.27rem;
    color: var(--main-color);

    & > span {
      font-size: 1.27rem;
      color: var(--main-color);

      & > b {
        font-size: 1.27rem;
        color: var(--main-color);
      }
    }
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
      object-fit: contain;
    }
  }
  .memberNameBox {
    font-size: 1.25rem;
  }
`;
