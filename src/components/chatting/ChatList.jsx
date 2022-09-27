import React from "react";
import styled from "styled-components";

// components
import Chat from "./Chat";

import { authInstance } from "../../shared/api";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

// 채팅 리스트 컴포넌트
// 모바일, 데스크탑에 따라 위치가 달리지도록 한다
//  모바일 : 채팅 리스트를 상단의 원으로 표시
//  데스크탑 : 채팅 리스트를 좌측에 리스트로 표시

// ::: 채팅 리스트 가져오기
const getChatList = async () => {
  return await authInstance.get(`/api/chat/chatList`);
};

const ChatList = ({ prevRoomId }) => {
  const navigate = useNavigate();

  //채팅단건 조회 useQuery
  const chatListQuery = useQuery("chatList", getChatList, {
    onSuccess: (data) => {},
  });
  if (chatListQuery.isLoading) {
    return null;
  }

  const chatList = chatListQuery.data.data;
  console.log(chatList);
  // 채팅방 들어가기
  const enterRoom = (roomId) => {
    // 입장한 채팅방을 다시 클릭하면 리턴
    if (prevRoomId === roomId) {
      return;
    }
    navigate(`/chatting/${roomId}`);
  };

  return (
    <Container>
      {/* <Title>채팅방 리스트</Title> */}

      <ChatListWrap className="scroll">
        {/* 받아온 채팅 리스트 구현하기 */}
        {chatList.map((chat) => {
          return (
            <Chat
              key={chat.roomMasterId}
              roomId={chat.roomMasterId}
              roomName={chat.roomName}
              roomPic={chat.roomPic}
              _onClick={() => {
                enterRoom(chat.roomMasterId);
              }}
            />
          );
        })}
      </ChatListWrap>
    </Container>
  );
};

const Container = styled.div`
  width: 30%;
  height: 100%;
  border-left: 1px solid;
  border-top: 1px solid;
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
  padding-top: 10px;
  ${(props) => props.theme.flex_column};
  justify-content: flex-start;
  ::-webkit-scrollbar {
    display: none;
  }
  @media ${(props) => props.theme.mobile} {
    height: 100%;
    flex-direction: row;
    align-items: center;
  }
`;

export default ChatList;
