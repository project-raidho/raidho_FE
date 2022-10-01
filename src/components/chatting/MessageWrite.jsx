import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import MessageInput from "./MessageInput";
import Button from "../../elements/Button";

// 메시지 입력 컴포넌트
const MessageWrite = ({ sendMessage, setMessageInput }) => {
  // 메시지 텍스트 입력받기
  const [messageText, setMessageText] = useState("");

  // 텍스트 기록 함수
  const handleMessageText = (e) => {
    setMessageText(e.target.value);
    setMessageInput(e.target.value);
    // dispatch(chatActions.writeMessage(e.target.value));
  };

  // 오토 포커스 대상
  const autoFocusRef = useRef(null);
  useEffect(() => {
    autoFocusRef.current?.focus();
  }, []);

  return (
    <Container>
      <MessageInput
        MessageWrite
        value={messageText}
        _onChange={handleMessageText}
        onSubmit={() => {
          sendMessage();
          setMessageText("");
        }}
        mref={autoFocusRef}
      />

      <StButton
        size="small"
        variant={messageText === "" ? "gray" : "primary"}
        onClick={() => {
          sendMessage();
          setMessageText("");
        }}
        disabled={messageText === ""}
      >
        전송
      </StButton>
    </Container>
  );
};

const Container = styled.div`
  ${(props) => props.theme.flex_row};
  border-top: 1px solid var(--gray-color);
  border-bottom: 1px solid var(--gray-color);
  background-color: var(--bg-color);
  width: 100%;
  height: 10%;

  @media ${(props) => props.theme.mobile} {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 45px;
    height: 8%;
    z-index: 10;
  }
`;

const StButton = styled(Button)`
  width: 100px;
  box-shadow: none;
  ${(props) =>
    props.variant === "gray" &&
    css`
      box-shadow: none;
      cursor: default;

      &:hover {
        background-color: var(--lightGray-color);
        color: var(--title-color);
      }
    `};
`;

export default MessageWrite;
