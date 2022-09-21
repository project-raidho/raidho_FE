import React from "react";

import styled from "styled-components";

// 이미지 컴포넌트
import Image from "../../elements/Image";
import { useParams } from "react-router-dom";

// 현재 존재하는 채팅을 보여주는 컴포넌트
const Chat = ({ roomId, roomName, _onClick, roomPic }) => {
  const { id } = useParams();
  // const {
  //   roomName,
  //   _onClick,
  //   roomId,
  //   roomPic,
  //   category,
  // } = props;
  // 카테고리 2개까지 표시
  // const categoryInfo = [];
  // for (let i = 0; i < 2; i++) {
  //   if (category[i] === undefined) {
  //     continue;
  //   }
  //   categoryInfo.push(category[i]);
  // }

  let is_same = false;
  // 사용자의 현재 방 id와 채팅 리스트의 방 id가 같은 경우
  if (Number(id) === roomId) {
    is_same = true;
  }
  return (
    <Container onClick={_onClick} selected={is_same}>
      <Image size="50px" src={roomPic} />
      <ChatColumn>
        <ChatTitle>{roomName}</ChatTitle>
        {/* <ChatText>
          <Image size="15px" src={userProfile} />
          {userName}
          <CategoryText>
            {categoryInfo.map((c, idx) => {
              return " " + c + " ";
            })}
          </CategoryText>
        </ChatText> */}
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

  border-left: ${(props) => (props.selected ? `5px solid #7188FF;` : "none;")};

  padding: 5px;
  height: 15%;
  width: 100%;
  background-color: whitesmoke;
  ${(props) => props.theme.border_box}
  margin: 0px 0px 20px 0px;
  cursor: pointer;
  color: ${(props) => props.theme.font_color};
  @media ${(props) => props.theme.mobile} {
    height: 100%;
    margin: 0;
    padding: 0;
    flex-direction: column;
    justify-content: space-between;
    border-left: none;
    border-bottom: ${(props) =>
      props.selected ? `5px solid #7188FF;` : "none;"};
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

// const ChatText = styled.div`
//   ${(props) => props.theme.border_box}
//   ${(props) => props.theme.flex_row}
//   margin-top: 10px;
//   @media ${(props) => props.theme.mobile} {
//     display: none;
//   }
// `;

// const CategoryText = styled.div`
//   ${(props) => props.theme.flex_row}
//   font-size: 10px;
//   align-items: center;
//   margin-left: 5px;
//   padding-top: 2px;
//   @media ${(props) => props.theme.mobile} {
//     display: none;
//   }
// `;

export default Chat;
