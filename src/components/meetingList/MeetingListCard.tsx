import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

import { authInstance } from "../../shared/api";
import Button from "../../elements/Button";
import MarkButton from "../../elements/MarkButton";
import { MeetingContentProps, ThemeListProps } from "../../elements/Type";
import Potal from "../../global/globalModal/Potal";
import LoginModal from "../login/LoginContainer";
import AlertModal from "../../global/globalModal/AlertModal";
import CofirmModal from "../../global/globalModal/CofirmModal";

import DefaultProfileImage from "../../assets/defaultProfileImage.svg";

// ::: 모집글 삭제 axios
const onDeleteMeeting = async (meetingId: number) => {
  await authInstance.delete(`/api/meeting/${meetingId}`);
};

const MeetingListCard = (Props: MeetingContentProps) => {
  //모달 상태관리
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [confirmModalOn, setConfirmModalOn] = useState<boolean>(false);
  const [modalIcon, setModalIcon] = useState<
    "success" | "warning" | "info" | ""
  >("");
  const [alertMsg, setAlertMsg] = useState<string>("");

  const [loginModalOn, setLoginModalOn] = useState<boolean>(false);
  const handleLoginModal = () => {
    setLoginModalOn(!loginModalOn);
  };
  const onCloseModal = () => {
    setModalOn(false);
    setConfirmModalOn(false);
  };

  const onClickYesConfirm = () => {
    mutate(Props.id);
    setConfirmModalOn(false);
  };
  const onDeleteHandler = () => {
    setModalIcon("warning");
    setAlertMsg("정말 이 모집글을 삭제하시겠습니까?");
    setConfirmModalOn(true);
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(onDeleteMeeting, {
    onSuccess: () => {
      queryClient.invalidateQueries("meetingList");
      queryClient.invalidateQueries("meetingListMine");
      queryClient.invalidateQueries("tagMeetingList");
    },
  });

  // ::: 날짜 차이 계산하기
  const dateCalculation = (day1: string, day2: string) => {
    const dateStart = new Date(day1.replace(/-/g, "/"));
    const dateEnd = new Date(day2.replace(/-/g, "/"));

    const diffDate = dateStart.getTime() - dateEnd.getTime();
    return Math.abs(diffDate / (1000 * 60 * 60 * 24));
  };

  // ::: 모집날짜 몇 박 몇 일 계산하기
  const tripPeriod = dateCalculation(Props.startDate, Props.endDate);

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
  const dday = Math.floor(dateCalculation(today, Props.roomCloseDate));

  const onJoinRoom = async (id: number) => {
    try {
      const res = await authInstance.get(`/api/chat/chatting/${id}`);
      console.log(res);
      //인원 풀이면 오류 처리
      if (res.data.body === "FULL") {
        setModalIcon("info");
        setAlertMsg("인원이 가득찼습니다");
        return setModalOn(true);
      }
      if (res.data.body.errorCode === "CHATTING_ROOM_ALREADY_FULL") {
        setModalIcon("info");
        setAlertMsg("인원이 가득찼습니다");
        return setModalOn(true);
      }
      navigate(`/chatting/${Props.id}`);
    } catch (e) {
      console.log(e);
      setLoginModalOn(true);
    }
  };

  // ::: 태그 클릭시 상세페이지 이동
  const onClickMeetingTag = (tag: string) => {
    const sliceTag = tag.substr(1);
    // console.log(sliceTag);
    navigate(`/meeting/chat?tag=${sliceTag}`, {
      state: {
        tagKeyword: sliceTag,
      },
    });
  };

  // ::: 카테고리 클릭시 해당 카테고리로 이동
  const onClickMeetingCategory = (meetingCategory: string) => {
    Props.themeList?.map((theme: ThemeListProps) => {
      if (theme.themeName === meetingCategory) {
        navigate(`/meetingList/${theme.themePath}`);

        if (Props.onClickTheme === undefined) {
        } else {
          Props.onClickTheme(theme.themeName);
        }
      }
      return false;
    });
  };

  // ::: 찜하기 버튼 기능 구현
  const changeStar = async () => {
    if (!Props.isStarMine) {
      await authInstance.post(`/api/meetingPostStar/${Props.id}`);
    } else {
      await authInstance.delete(`/api/meetingPostStar/${Props.id}`);
    }
  };

  const mutateStar = useMutation(changeStar, {
    onSuccess: () => {
      queryClient.invalidateQueries("meetingList");
      queryClient.invalidateQueries("meetingListMine");
      queryClient.invalidateQueries("MeetingListLiked");
      queryClient.invalidateQueries("tagMeetingList");
    },
    onError: () => {
      setModalIcon("warning");
      setAlertMsg("로그인 후 찜하기 버튼을 누를수 있습니다.");
      setModalOn(true);
    },
  });

  return (
    <StMeetingListCard>
      <p className="markButton">
        <MarkButton
          star={Props.isStarMine}
          onClick={() => mutateStar.mutate()}
        />
      </p>
      <StMeetingCardUpDown>
        <StMeetingCardRow className="flexBetweenLayout">
          <p className="infoStatus">
            {Props.meetingStatus === 1 && (
              <span className="statusIng">
                <i></i>모집중 D-
                <b>{Number(dday) === 0 ? "day" : Number(dday)}</b>
              </span>
            )}
            {Props.meetingStatus === 2 && (
              <span className="statusComplete">
                <i></i>모집마감 D-
                <b>{Number(dday) === 0 ? "day" : Number(dday)}</b>
              </span>
            )}
            {Props.meetingStatus === 3 && (
              <span className="statusFinished">
                <i></i>모집종료
              </span>
            )}
          </p>
          {Props.meetingStatus === 1 && (
            <p className="infoStatus">
              모집인원 {Props.memberCount}/{Props.people}
            </p>
          )}
          {Props.meetingStatus === 2 && (
            <p className="infoStatus statusComplete">
              모집인원 {Props.memberCount}/{Props.people}
            </p>
          )}
        </StMeetingCardRow>
        <h3>{Props.title}</h3>
        <p className="meetingPeriod">
          <strong>여행 날짜</strong>
          <span>
            {` ${Props.startDate.split("-")[1]}/${
              Props.startDate.split("-")[2]
            }-${Props.endDate.split("-")[1]}/${Props.endDate.split("-")[2]}`}
            {tripPeriod === 0
              ? `(${tripPeriod + 1}일)`
              : `(${tripPeriod}박 ${tripPeriod + 1}일)`}
          </span>
          <i className="bgMiddleLine"></i>
        </p>
        <p className="meetingAddress">
          <strong>만남 장소</strong>
          <span>{Props.departLocation}</span>
          <i className="bgMiddleLine"></i>
        </p>
        {Props.desc.length > 100 ? (
          <Stdesc className="desc" length="long">
            {Props.desc}
          </Stdesc>
        ) : (
          <Stdesc className="desc" length="short">
            {Props.desc}
          </Stdesc>
        )}
      </StMeetingCardUpDown>
      <StMeetingCardUpDown>
        <StMeetingCardRow>
          <div className="tagList">
            {Props.meetingTags.map((tag, index) => (
              <span
                key={index}
                className="tag"
                onClick={() => onClickMeetingTag(tag)}
              >
                {tag}&nbsp;
              </span>
            ))}
          </div>
        </StMeetingCardRow>
        <StMeetingCardRow>
          <p className="memberImageBox">
            <img
              src={
                Props.memberImage === null
                  ? DefaultProfileImage
                  : Props.memberImage
              }
              alt={Props.memberName}
            />
          </p>
          <p className="memberNameBox">@{Props.memberName}</p>
        </StMeetingCardRow>
        <StMeetingCardRow className="flexBetweenLayout">
          <StThemeButton
            size="tag"
            variant="gray"
            theme={Props.themeCategory}
            onClick={() => onClickMeetingCategory(Props.themeCategory)}
          >
            {Props.themeCategory}
          </StThemeButton>
          <div>
            {Props.isMine && (
              <Button
                size="small"
                variant="lineLightBlue"
                onClick={() => {
                  navigate(`/updateMeeting/${Props.id}`);
                }}
              >
                수정하기
              </Button>
            )}
            {Props.isMine && (
              <Button
                className="deleteButton"
                size="small"
                variant="lineGray"
                onClick={() => onDeleteHandler()}
              >
                삭제하기
              </Button>
            )}
            {!Props.isMine &&
              Props.meetingStatus === 1 &&
              !Props.isAlreadyJoin && (
                <Button
                  size="small"
                  variant="lineLightBlue"
                  onClick={() => onJoinRoom(Props.id)}
                >
                  참여하기
                </Button>
              )}

            {Props.isAlreadyJoin && <p className="isInMeetingMsg">참여중</p>}
          </div>
        </StMeetingCardRow>
      </StMeetingCardUpDown>
      <Potal>{loginModalOn && <LoginModal onClose={handleLoginModal} />}</Potal>

      <Potal>
        {modalOn && (
          <AlertModal
            onCloseModal={onCloseModal}
            modalIcon={modalIcon}
            alertMsg={alertMsg}
            onClickYes={onCloseModal}
          />
        )}
      </Potal>
      <Potal>
        {confirmModalOn && (
          <CofirmModal
            onCloseModal={onCloseModal}
            modalIcon={modalIcon}
            alertMsg={alertMsg}
            onClickYes={onClickYesConfirm}
            onClickNo={onCloseModal}
          />
        )}
      </Potal>
    </StMeetingListCard>
  );
};

export default MeetingListCard;

const StMeetingListCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 320px;
  height: 460px;
  margin: 1rem;
  padding: 1.7rem;
  background-color: var(--subBg-color);
  border: 1px solid var(--gray-color);
  border-radius: 15px;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: var(--box-shadow);
  }

  .markButton {
    position: absolute;
    width: 34px;
    right: 6px;
    top: -4px;
  }

  h3 {
    font-size: 1.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 0.5rem;

    &.meetingPeriod,
    &.meetingAddress {
      font-size: 1.2rem;
      position: relative;
      display: flex;
      justify-content: space-between;
      strong {
        font-size: 1.1rem;
        font-weight: 500;
        background-color: var(--bg-color);
        padding-right: 0.5rem;
        z-index: 2;
      }
      span {
        width: 190px;
        font-size: 0.9rem;
        background-color: var(--bg-color);
        padding-left: 0.5rem;
        z-index: 2;
      }
    }

    .bgMiddleLine {
      position: absolute;
      top: 10px;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: var(--line-color);
      z-index: 1;
    }
  }

  .tagList {
    display: block;
    text-align: left;
  }
  .tag {
    display: inline-block;
    color: var(--lightBlue-color);
    font-size: 1rem;
    margin-right: 0.3rem;
    cursor: pointer;
  }

  @media ${(props) => props.theme.mobile} {
    padding: 1rem;
    height: 520px;
    border-radius: 10px;

    h3 {
      font-size: 1.5rem;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }

    p {
      margin-bottom: 0.5rem;

      &.meetingPeriod {
        span {
          font-size: 1rem;
        }
      }

      .tag {
        color: var(--lightBlue-color);
        font-size: 1.1rem;
        cursor: pointer;
      }

      &.meetingPeriod,
      &.meetingAddress {
        font-size: 1rem;
        strong {
          font-size: 1rem;
        }
        span {
          font-size: 1rem;
        }
      }
    }
  }
`;

const StMeetingCardUpDown = styled.div`
  width: 100%;

  .desc {
  }
`;

const Stdesc = styled.p<{ length: string }>`
  padding-top: 10px;
  white-space: pre-wrap;

  ${(props) => props.length === "long" && `font-size:0.8rem `}
  ${(props) => props.length === "short" && `font-size:1rem `}
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
    &.deleteButton {
      margin-right: 0;
    }
    &:last-child {
      margin-right: 0;
    }
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
        i {
          background-color: var(--gray-color);
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
    display: flex;
    align-items: center;
    height: 30px;
    bottom: 45px;
    right: -28px;
    font-size: 1rem;
    color: #ffffff;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    background-color: var(--lightBlue-color);
    box-shadow: var(--box-shadow);
    padding: 3px 2rem 3px 20px;
  }

  @media (max-width: 639px) {
    & > span {
      font-size: 1rem;
    }

    .infoStatus {
      font-size: 1rem;

      &.infoStatus:last-child {
        margin-right: 28px;
      }
    }
    .memberImageBox {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-right: 0.5rem;
    }
    .memberNameBox {
      font-size: 1.1rem;
    }

    button {
      padding: 0px 8px;
    }

    .isInMeetingMsg {
      height: 30px;
      bottom: 45px;
      right: -16px;
      font-size: 0.8rem;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      padding: 3px 1rem 3px 20px;
    }
  }
`;

const StThemeButton = styled(Button)`
  min-width: 45px;
  ${(props) =>
    props.theme === "국내" &&
    `background-color:var(--theme-korea-color); color: var(--title-color);`}
  ${(props) =>
    props.theme === "유럽" &&
    `background-color:var(--theme-europe-color); color: #1e1e1e;`}
    ${(props) =>
    props.theme === "아메리카" &&
    `background-color:var(--theme-america-color); color: #1e1e1e;`}
    ${(props) =>
    props.theme === "아시아" &&
    `background-color:var(--theme-asia-color); color: var(--title-color);`}
    ${(props) =>
    props.theme === "오세아니아" &&
    `background-color:var(--theme-oseania-color); color: var(--title-color);`}
    ${(props) =>
    props.theme === "아프리카" &&
    `background-color:var(--theme-africa-color); color: #ffffff;`}

    &:hover {
    ${(props) =>
      props.theme === "국내" &&
      `background-color:var(--theme-korea-color); color: var(--title-color);`}
    ${(props) =>
      props.theme === "유럽" &&
      `background-color:var(--theme-europe-color); color: #1e1e1e;`}
    ${(props) =>
      props.theme === "아메리카" &&
      `background-color:var(--theme-america-color); color: #1e1e1e;`}
    ${(props) =>
      props.theme === "아시아" &&
      `background-color:var(--theme-asia-color); color: var(--title-color);`}
    ${(props) =>
      props.theme === "오세아니아" &&
      `background-color:var(--theme-oseania-color); color: var(--title-color);`}
    ${(props) =>
      props.theme === "아프리카" &&
      `background-color:var(--theme-africa-color); color: #ffffff;`}
  }
`;
