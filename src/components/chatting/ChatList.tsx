import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Chat from "./Chat";

// 채팅 리스트 컴포넌트
interface ChatListProps {
  prevRoomId: string | undefined;
  chatList: {
    roomMasterId: number;
    roomName: string;
    roomPic: string;
  }[];
}

const ChatList = ({ prevRoomId, chatList }: ChatListProps) => {
  const navigate = useNavigate();

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
            _onClick?: React.MouseEventHandler<HTMLDivElement>;
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
