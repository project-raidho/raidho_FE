import React, { useState } from "react";
import styled from "styled-components";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";

import { authInstance } from "../../shared/api";
import Button from "../../elements/Button";
import CofirmModal from "../../global/globalModal/CofirmModal";
import Potal from "../../global/globalModal/Potal";

interface ChatDetail {
  startDate: string;
  endDate: string;
  roomCloseDate: string;
  isMine: boolean;
  title: string;
  themeCategory: string;
  meetingTags: string[];
  memberNames: string[];
  memberCount: number;
  people: number;
  departLocation: string;
}

// 채팅방 정보 단건조회
const getChatDetail = async ({
  queryKey,
}: {
  queryKey: (string | undefined)[];
}) => {
  return await authInstance.get(`/api/chat/rooms/${Number(queryKey[1])}`);
};

//채팅방 삭제 axios
const deleteChatDetail = async (chattingId: string) => {
  return await authInstance.delete(`/api/chat/rooms/${Number(chattingId)}`);
};

const ChatName = () => {
  const { chattingId } = useParams();
  const navigate = useNavigate();
  const [isOpenInfo, setIsOpenInfo] = useState(false);

  // ::: 채팅방 나기기 클릭시 모달
  const [modalOn, setModalOn] = useState(false);
  const [modalIcon, setModalIcon] = useState<
    "" | "success" | "warning" | "info"
  >("");
  const [alertMsg, setAlertMsg] = useState("");

  const onCloseModal = () => {
    setModalOn(!modalOn);
  };

  const onClickYes = () => {
    if (chattingId === undefined) {
      return setModalOn(!modalOn);
    }
    mutate(chattingId);
    setModalOn(!modalOn);
  };

  //채팅단건 조회 useQuery
  const chatDetailQuery = useQuery(["chatDetail", chattingId], getChatDetail, {
    onSuccess: (data) => {},
  });

  //채팅단건삭제 mutation
  const queryClient = useQueryClient();
  //useMutation 첫번째 파라미터: 함수, 두번째 파라미터: 옵션
  const { mutate } = useMutation(deleteChatDetail, {
    onSuccess: () => {
      queryClient.invalidateQueries("chatList");
      navigate("/chatting");
    },
  });

  if (chatDetailQuery.isLoading) {
    return null;
  }

  const chatDetail: ChatDetail = chatDetailQuery.data?.data;

  // ::: 날짜 차이 계산하기
  const dateCalculation = (day1: string, day2: string) => {
    const dateStart = new Date(day1);
    const dateEnd = new Date(day2);

    const diffDate = dateStart.getTime() - dateEnd.getTime();
    return Math.abs(diffDate / (1000 * 60 * 60 * 24));
  };

  // ::: 모집날짜 몇 박 몇 일 계산하기
  const tripPeriod = dateCalculation(chatDetail.startDate, chatDetail.endDate);

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
  const dday = Math.floor(dateCalculation(today, chatDetail.roomCloseDate));

  const onDeleteHandler = () => {
    if (chatDetail.isMine) {
      setModalIcon("warning");
      setAlertMsg(
        "작성하신 모집글과 채팅방이 삭제됩니다. 정말 니가시겠습니까?"
      );
      setModalOn(true);
    } else {
      setModalIcon("warning");
      setAlertMsg("이 채팅방을 정말 나가시겠습니까?");
      setModalOn(true);
    }
  };

  return (
    <Container>
      <StInfoBox isOpenInfo={isOpenInfo}>
        <StTitleBox>
          <div className="title">
            <div>{chatDetail.title}</div>
            {isOpenInfo ? (
              <FaAngleUp
                className="icon"
                size="24"
                onClick={() => setIsOpenInfo(false)}
              />
            ) : (
              <FaAngleDown
                className="icon"
                size="24"
                onClick={() => setIsOpenInfo(true)}
              />
            )}
          </div>

          <StRightButtonSet>
            <Button
              size="small"
              variant="lineBlue"
              onClick={() => onDeleteHandler()}
            >
              나가기
            </Button>
          </StRightButtonSet>
        </StTitleBox>
        {isOpenInfo && (
          <div>
            <p>카테고리 : {chatDetail.themeCategory}</p>
            <p>
              여행장소 :{" "}
              {chatDetail.meetingTags.map((tag: string, index: number) => (
                <span key={index}>{tag.slice(1)}&nbsp;</span>
              ))}
            </p>
            <p>
              여행기간 :{" "}
              {tripPeriod === 0
                ? `${tripPeriod + 1}일`
                : `${tripPeriod}박 ${tripPeriod + 1}일`}
              <span>{` (${chatDetail.startDate.split("-")[1]}/${
                chatDetail.startDate.split("-")[2]
              } - ${chatDetail.endDate.split("-")[1]}/${
                chatDetail.endDate.split("-")[2]
              })`}</span>
            </p>
            <p>
              채팅상대 :{" "}
              {chatDetail.memberNames.map((name: string, idx: number) => (
                <span key={idx}>{name} </span>
              ))}
            </p>
            <p>
              현재/모집인원 : {chatDetail.memberCount}/{chatDetail.people}명
            </p>

            <p>
              모집마감일 : D-
              <b>
                {dday} ({chatDetail.roomCloseDate})
              </b>
            </p>
            <p className="location">
              모임장소 <br /> {chatDetail.departLocation}
            </p>
          </div>
        )}
      </StInfoBox>
      <Potal>
        {modalOn && (
          <CofirmModal
            onCloseModal={onCloseModal}
            modalIcon={modalIcon}
            alertMsg={alertMsg}
            onClickYes={onClickYes}
            onClickNo={onCloseModal}
          />
        )}
      </Potal>
    </Container>
  );
};

export default ChatName;

const Container = styled.div`
  position: relative;
  display: block;
  ${(props) => props.theme.border_box};
  ${(props) => props.theme.flex_row}

  width: 100%;

  text-overflow: ellipsis;
  white-space: nowrap;
  height: 10%;

  color: ${(props) => props.theme.font_color};
  padding: 20px;

  .title {
    display: flex;
    div {
      margin-top: 3px;
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      @media ${(props) => props.theme.mobile} {
        max-width: 140px;
      }
    }
  }
  .icon {
    font-size: 1rem;
    cursor: pointer;
    margin-right: 5px;
    margin-left: 10px;
    color: #fff;
    path {
      color: #fff;
    }
  }
  button {
    width: 70px;
    font-size: 1rem;
    background-color: transparent;
    border: 1px solid #fff;
    margin-right: 5px;
    margin-left: 10px;
    color: #fff;
    padding: 0 10px;
  }

  @media ${(props) => props.theme.mobile} {
    font-size: 1rem;
  }
`;

const StInfoBox = styled.div<{ isOpenInfo: boolean }>`
  padding: 0 10px;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 5;
  transition: 0.1s;
  background-color: var(--lightBlue-color);

  height: ${(props) => (props.isOpenInfo === true ? "250px" : "50px")};

  p {
    margin-bottom: 3px;
    color: #fff;
  }
  .location {
    @media ${(props) => props.theme.mobile} {
      display: inline;
      max-width: 300px;
    }
  }
  b,
  span {
    color: #fff;
  }
`;

const StTitleBox = styled.div`
  margin: auto 0;
  color: #fff;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
`;

const StRightButtonSet = styled.div`
  align-items: center;
  button {
    font-size: 1rem;
  }
`;
