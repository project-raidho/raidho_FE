import React from "react";
import styled from "styled-components";

// 이미지 컴포넌트
import Image from "../../elements/Image";
import { useParams } from "react-router-dom";

// 현재 존재하는 채팅을 보여주는 컴포넌트
const Chat = ({ roomId, roomName, _onClick, roomPic }) => {
  const { id } = useParams();

  let is_same = false;
  // 사용자의 현재 방 id와 채팅 리스트의 방 id가 같은 경우
  if (Number(id) === roomId) {
    is_same = true;
  }
  return (
    <Container onClick={_onClick} selected={is_same}>
      <Image size="40px" src={roomPic} />
      <ChatColumn>
        <ChatTitle>{roomName}</ChatTitle>
      </ChatColumn>
    </Container>
  );
};

Chat.defaultProps = {
  _onClick: () => {},
  roomName: false,
};

const Container = styled.div`
  ${(props) => props.theme.flex_row};
  justify-content: flex-start;
  border: ${(props) =>
    props.selected ? `3px solid #7188FF;` : "1px solid var(--gray-color)"};

  padding: 5px;
  height: 15%;
  width: 90%;

  ${(props) => props.theme.border_box}

  margin:0 20px 20px 20px;
  cursor: pointer;
  color: ${(props) => props.theme.font_color};
  @media ${(props) => props.theme.mobile} {
    height: 100%;
    margin: 0;
    padding: 0;
    flex-direction: column;

    border: ${(props) => (props.selected ? `3px solid #7188FF;` : "none")};
  }
`;
const ChatColumn = styled.div`
  margin-left: 15px;
  width: 70%;
  ${(props) => props.theme.flex_column}
  align-items: flex-start;
  justify-content: center;
  ${(props) => props.theme.border_box}
  @media ${(props) => props.theme.mobile} {
    width: 80px;
    margin-left: 0px;
  }
`;
const ChatTitle = styled.span`
  ${(props) => props.theme.border_box}
  font-weight: 600;
  font-size: 1.2rem;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media ${(props) => props.theme.mobile} {
    font-size: 0.75rem;
    text-align: center;
  }
`;

export default Chat;
