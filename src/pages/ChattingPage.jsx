import React from "react";
import styled from "styled-components";

import ChattingRoom from "../components/chatting/ChattingRoom";

// 채팅 페이지 컴포넌트
const Chatting = () => {
  // const dispatch = useDispatch();
  // React.useEffect(() => {
  //   dispatch(chatActions.getChatList());
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <Container>
      <ChatWrap>
        <ChattingRoom />
      </ChatWrap>
    </Container>
  );
};

const Container = styled.div`
  /* ${(props) => props.theme.flex_row}; */
  /* ${(props) => props.theme.border_box}; */
`;

// ChatName, MessageList 감싸는 요소
const ChatWrap = styled.div`
  ${(props) => props.theme.flex_column};
  justify-content: flex-start;
  ${(props) => props.theme.border_box};
  height: 80vh;
  width: 100%;
  position: relative;
`;

export default Chatting;
