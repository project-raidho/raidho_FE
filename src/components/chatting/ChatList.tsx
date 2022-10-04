import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

import Chat from "./Chat";
import { authInstance } from "../../shared/api";

// 채팅 리스트 컴포넌트
// 모바일, 데스크탑에 따라 위치가 달리지도록 한다
//  모바일 : 채팅 리스트를 상단의 원으로 표시
//  데스크탑 : 채팅 리스트를 좌측에 리스트로 표시

// ::: 채팅 리스트 가져오기
const getChatList = async () => {
  return await authInstance.get(`/api/chat/chatList`);
};

const ChatList = ({ prevRoomId }: { prevRoomId: string | undefined }) => {
  const navigate = useNavigate();

  //채팅단건 조회 useQuery
  const chatListQuery = useQuery("chatList", getChatList);
  if (chatListQuery.isLoading) {
    return null;
  }

  const chatList = chatListQuery.data?.data;
  // 채팅방 들어가기
  const enterRoom = (roomId: number) => {
    // 입장한 채팅방을 다시 클릭하면 리턴
    if (Number(prevRoomId) === roomId) {
      return;
    }
    navigate(`/chatting/${roomId}`);
  };

  return (
    <StChatList>
      <ChatListWrap className="scroll">
        {chatList.map(
          (chat: {
            roomMasterId: number;
            roomName: string;
            _onClick: React.MouseEventHandler<HTMLDivElement>;
            roomPic: string;
          }) => {
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
          }
        )}
      </ChatListWrap>
    </StChatList>
  );
};

const StChatList = styled.div`
  width: 30%;
  height: 100%;

  ${(props) => props.theme.border_box};
  /* justify-content: center; */

  position: relative;
  @media (max-width: 1023px) {
    padding-top: 0px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    height: 13%;
    margin-bottom: 10px;
  }
`;

// const Title = styled.div`
//   ${(props) => props.theme.border_box};
//   height: 10%;
//   color: ${(props) => props.theme.font_color};
//   padding: 20px 20px 20px 30px;
//   font-size: 26px;
//   font-weight: 700;
//   @media ${(props) => props.theme.mobile} {
//     display: none;
//   }
// `;

const ChatListWrap = styled.div`
  ${(props) => props.theme.border_box};
  width: 100%;
  height: 90%;
  overflow: auto;
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
