import React from "react";
import styled from "styled-components";
// elements
import ChatInput from "../../elements/ChatInput";

// 아이콘
import { IoSend } from "react-icons/io5";

// 리덕스 접근
import {
  // useSelector,
  useDispatch,
} from "react-redux";

// 채팅 관련 함수들 가져오기
import { chatActions } from "../../redux/modules/chat";

// 메시지 입력 컴포넌트
const MessageWrite = (props) => {
  const dispatch = useDispatch();
  // 메시지 텍스트 입력받기
  const [messageText, setMessageText] = React.useState();

  const { sendMessage } = props;

  //   const loading = useSelector((state) => state.chat.loading);
  const loading = true;

  // 텍스트 기록 함수
  const handleMessageText = (e) => {
    setMessageText(e.target.value);
    dispatch(chatActions.writeMessage(e.target.value));
  };

  // 오토 포커스 대상
  const autoFocusRef = React.useRef(null);
  React.useEffect(() => {
    autoFocusRef.current?.focus();
  }, []);

  return (
    <Container>
      <ChatInput
        MessageWrite
        value={messageText}
        _onChange={handleMessageText}
        onSubmit={() => {
          sendMessage();
          setMessageText("");
        }}
        mref={autoFocusRef}
        loading={loading}
      />

      {/* 로딩중이면 보내기 막기 */}
      {loading && (
        <SendIcon
          onClick={() => {
            sendMessage();
            setMessageText("");
          }}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  ${(props) => props.theme.flex_row};
  /* background-color: ${(props) => props.theme.main_color_thick}; */
  justify-content: flex-start;
  width: 100%;
  height: 10%;
  opacity: 0.5;
 
  @media ${(props) => props.theme.mobile} {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
  }
`;

const SendIcon = styled(IoSend)`
  ${(props) => props.theme.flex_row};
  justify-content: center;
  width: 5%;
  font-size: 20px;
  cursor: pointer;
`;

export default MessageWrite;
