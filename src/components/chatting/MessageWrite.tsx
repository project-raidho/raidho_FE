import React, { useState, SetStateAction, Dispatch } from "react";
import styled, { css } from "styled-components";
import Button from "../../elements/Button";
import Input from "../../elements/Input";

interface MessageWriteProps {
  sendMessage: () => void;
  setMessageInput: Dispatch<SetStateAction<string>>;
}

// 메시지 입력 컴포넌트
const MessageWrite = ({ sendMessage, setMessageInput }: MessageWriteProps) => {
  // 메시지 텍스트 입력받기
  const [messageText, setMessageText] = useState("");

  // 텍스트 기록 함수
  const handleMessageText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
    setMessageInput(e.target.value);
  };

  return (
    <Container>
      <Input
        value={messageText}
        onChange={handleMessageText}
        placeholder={"텍스트를 입력해주세요."}
        onSubmit={() => {
          sendMessage();
          setMessageText("");
        }}
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
  input {
    height: auto;
    border: none;
    width: 75%;
    margin-left: 10px;
    padding: 12px 4px;
    box-sizing: border-box;
    background-color: var(--bg-color);
    outline: none;
    font-size: 20px;
    border-radius: 0;
    &:focus {
      border: none;
      box-shadow: none;
    }
    @media ${(props) => props.theme.mobile} {
      font-size: 1rem;
    }
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
