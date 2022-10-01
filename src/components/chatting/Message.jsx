import React from "react";

import styled from "styled-components";

// 프로필 사진
import Image from "../../elements/Image";

// Spinner
// import { Spinner } from '@class101/ui';

// 사용자 - 상대방의 메시지 내용을 출력할 말풍선 컴포넌트
const Message = ({ messageInfo }) => {
  // 사용자 아이디, 프로필 사진을 가져오기
  // let { id, profileUrl } = useSelector((state) => state.user.userInfo);
  let memberId = Number(localStorage.getItem("memberId"));
  React.useEffect(() => {
    // 로딩중
    if (!messageInfo) {
      return (
        <MessageWrap>
          {/* <Spinner /> */}
          <p>로딩중</p>
        </MessageWrap>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 메시지의 유저 id 정보와 현재 유저 id가 같으면 본인 메시지
  if (memberId === Number(messageInfo.memberId)) {
    return (
      <MessageWrap is_me={true}>
        <SenderWrap>
          <SenderSpan is_me={true}>
            {messageInfo.user ? messageInfo.user.username : messageInfo.sender}
          </SenderSpan>
          <div>
            <SenderSpan is_me={true}>{messageInfo.messageTime}</SenderSpan>
            <ElMessage is_me={true}>{messageInfo.message}</ElMessage>
          </div>
        </SenderWrap>
        <ImageWrap>
          <Image size="40px" src={messageInfo.memberImage} />
        </ImageWrap>
      </MessageWrap>
    );
  }
  // 사용자 입장 메시지
  if (messageInfo.type === "ENTER") {
    return <EnterWrap>{messageInfo.message}</EnterWrap>;
  }
  // 사용자 퇴장 메시지
  if (messageInfo.type === "QUIT") {
    return <QuitWrap>{messageInfo.message}</QuitWrap>;
  }
  // 상대방 메시지
  else {
    return (
      <MessageWrap>
        <ImageWrap>
          <Image size="40px" src={messageInfo.memberImage} />
        </ImageWrap>
        <SenderWrap>
          <SenderSpan>
            {messageInfo.user ? messageInfo.user.username : messageInfo.sender}
          </SenderSpan>
          <div>
            <ElMessage>{messageInfo.message}</ElMessage>
            <SenderSpan>{messageInfo.messageTime}</SenderSpan>
          </div>
        </SenderWrap>
      </MessageWrap>
    );
  }
};

Message.defaultProps = {};
export default Message;

const MessageWrap = styled.div`
  ${(props) => props.theme.border_box};
  ${(props) => props.theme.flex_row};
  justify-content: ${(props) => (props.is_me ? "flex-end" : "flex-start")};
  width: 100%;
  height: auto;
  margin: 0px 0px 15px 0px;
`;

const ElMessage = styled.span`
  display: inline-block;
  ${(props) => props.theme.border_box};
  background-color: ${(props) =>
    props.is_me ? "#7188ff" : props.theme.message_you};
  color: ${(props) => (props.is_me ? "whitesmoke" : "black")};
  ${(props) =>
    props.is_me
      ? "border-radius: 15px 15px 0px 15px;"
      : "border-radius: 15px 15px 15px 0px;"}
  padding: 10px;
  width: auto;
  max-width: 90%;
  height: auto;
`;

const EnterWrap = styled.div`
  ${(props) => props.theme.border_box};
  ${(props) => props.theme.flex_row};
  justify-content: center;
  width: 40%;
  height: auto;
  padding: 5px;
  margin: 0px 0px 40px 0px;
  background-color: #7188ff;
  color: whitesmoke;
  border-radius: 40px;
  opacity: 0.8;
  @media ${(props) => props.theme.mobile} {
    width: 80%;
  }
`;

const QuitWrap = styled.div`
  ${(props) => props.theme.border_box};
  ${(props) => props.theme.flex_row};
  justify-content: center;
  width: 40%;
  height: auto;
  padding: 5px;
  margin: 0px 0px 40px 0px;
  background-color: #7188ff;
  color: whitesmoke;
  border-radius: 40px;
  opacity: 0.8;
  @media ${(props) => props.theme.mobile} {
    width: 80%;
  }
`;

const SenderWrap = styled.div`
  ${(props) => props.theme.flex_column};
  color: ${(props) => props.theme.main_color};
`;

const SenderSpan = styled.span`
  font-size: 0.9rem;
  min-width: 50px;
  width: 100%;
  ${(props) => (props.is_me ? "text-align: right" : "text-align: left")};
  margin: 5px 10px;
`;

const ImageWrap = styled.div`
  ${(props) => props.theme.flex_column};
  justify-content: flex-end;
  ${(props) => props.theme.border_box};
  margin: 5px;
`;
