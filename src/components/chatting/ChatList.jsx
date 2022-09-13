import React, { useEffect, useState } from "react";

import styled from "styled-components";

// components
import Chat from "./Chat";
// import Popup from '../components/Popup';

// 채팅 관련 함수들 가져오기
import { chatActions } from "../../redux/modules/chat";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// select
// import { Select } from '@class101/ui';

// 카테고리 통신
// import { chatAPI } from '../../shared/api';

// 채팅 리스트 컴포넌트
// 모바일, 데스크탑에 따라 위치가 달리지도록 한다
//  모바일 : 채팅 리스트를 상단의 원으로 표시
//  데스크탑 : 채팅 리스트를 좌측에 리스트로 표시
const ChatList = (props) => {
  const [chatList, setChatList] = useState([
    {
      id: 1,
      chatRoomName: "산골짜기여행",
      createdAt: "8월 8일",
      modifiedAt: "8월 8일",
      chatRoomImg: "",
      user: {
        username: "상욱님",
        profileUrl: "",
      },
      category: "",
    },
    {
      id: 2,
      chatRoomName: "바닷가여행",
      createdAt: "8월 8일",
      modifiedAt: "8월 8일",
      chatRoomImg: "",
      user: {
        username: "태훈님",
        profileUrl: "",
      },
      category: "",
    },
  ]);
  const navigate = useNavigate();
  useEffect(() => {
    // getChatList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const getChatList = async () => {
  //   try {
  //     const res = await axios.get(`/api/chat/rooms`);
  //     // dispatch(getChat(res.data));
  //     return setChatList(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // 조회할 태그(카테고리)
  // const [tag, setTag] = React.useState("");

  const { prevRoomId } = props;

  // // 팝업창 키기/종료
  // //  false가 기본 상태
  // const [popupOpen, setPopupOpen] = React.useState(false);

  // // 팝업창 키기/끄기 함수
  // const openPopup = () => {
  //   setPopupOpen(true);
  // };
  // const closePopup = () => {
  //   setPopupOpen(false);
  // };
  //  태그 고르기
  // const selectTag = async (e) => {
  //   setTag(e.target.value)
  //   if (e.target.value === '전체조회') {
  //     // 전체조회를 선택한 경우 전체조회 API 호출
  //     const totalList = await chatAPI.getChatList();
  //     dispatch(chatActions.getChat(totalList.data));
  //     return
  //   }
  //   const tagChatList = await chatAPI.selectCategory(e.target.value);
  //   console.log(tagChatList)
  //   dispatch(chatActions.getChat(tagChatList.data))
  // }

  // 채팅방 들어가기
  const enterRoom = (roomId) => {
    console.log(prevRoomId, roomId);

    // 입장한 채팅방을 다시 클릭하면 리턴
    // if (prevRoomId === roomId) {
    //   return;
    // }
    navigate(`/chatting/${roomId}`);
  };

  return (
    <Container>
      <Title>채팅방 리스트</Title>

      <ChatListWrap className="scroll">
        {/* 받아온 채팅 리스트 구현하기 */}
        {chatList.map((info, idx) => {
          return (
            <Chat
              key={idx}
              roomId={info.id}
              roomName={info.chatRoomName}
              createdAt={info.createdAt}
              modifiedAt={info.modifiedAt}
              roomImg={info.chatRoomImg}
              userName={info.user?.username}
              userProfile={info.user?.profileUrl}
              category={info.category}
              _onClick={(e) => {
                enterRoom(info.id, info.chatRoomName, info.category);
              }}
            />
          );
        })}
      </ChatListWrap>
      {/* <FloatingButton onClick={openPopup}>+</FloatingButton> */}

      {/* 채팅 생성 팝업 창 */}
      {/* {popupOpen && <Popup visible={popupOpen} closePopup={closePopup} />} */}
    </Container>
  );
};

const Container = styled.div`
  width: 30%;
  height: 100%;
  ${(props) => props.theme.border_box};
  justify-content: center;
  /* background-color: ${(props) => props.theme.theme_gray}; */

  position: relative;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    height: 15%;
  }
`;

const Title = styled.div`
  ${(props) => props.theme.border_box};
  height: 10%;
  color: ${(props) => props.theme.font_color};
  padding: 20px 20px 20px 30px;
  font-size: 26px;
  font-weight: 700;
  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;

const ChatListWrap = styled.div`
  ${(props) => props.theme.border_box};
  width: 100%;
  height: 90%;
  overflow: auto;
  padding: 10px 10px 0px 10px;
  ${(props) => props.theme.flex_column};
  justify-content: flex-start;
  @media ${(props) => props.theme.mobile} {
    height: 100%;
    flex-direction: row;
    align-items: center;
    padding: 5px;
  }
`;

// const FloatingButton = styled.div`
//   width: 50px;
//   height: 50px;
//   position: absolute;
//   bottom: 50px;
//   right: 16px;
//   background-color: ${(props) => props.theme.theme_yellow};
//   color: #ffffff;
//   box-sizing: border-box;
//   font-size: 36px;
//   font-weight: 800;
//   border-radius: 50%;
//   text-align: center;
//   padding: 3px;
//   cursor: pointer;
//   @media ${(props) => props.theme.mobile} {
//     position: fixed;
//     top: 22vh;
//   }
// `;

export default ChatList;
