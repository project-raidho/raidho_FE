import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

// Components
import MessageList from "./MessageList";
import MessageWrite from "./MessageWrite";
import ChatList from "./ChatList";
import ChatName from "./ChatName";
import NoRoom from "./NoRoom";

// 소켓 통신
import Stomp from "stompjs";
import SockJS from "sockjs-client";

// 채팅 방 컴포넌트
const ChattingRoom = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<
    {
      memberId: number;
      memberImage: string | null;
      message: string;
      messageTime: string | null;
      roomId: string;
      sender: string;
      type: string;
    }[]
  >([]);

  // 소켓 통신 객체
  const sock = new SockJS(`https://wjsxogns.shop/ws-stomp`);
  const ws = Stomp.over(sock);

  const { chattingId } = useParams();

  // 토큰
  const token = localStorage.getItem("Authorization");

  // 보낼 메시지 텍스트
  const [messageInput, setMessageInput] = useState("");

  let sender = localStorage.getItem("memberName");
  let memberImage = localStorage.getItem("memberImage");
  let memberId = localStorage.getItem("memberId");
  // 렌더링 될 때마다 연결,구독 다른 방으로 옮길 때 연결, 구독 해제
  React.useEffect(() => {
    setMessages([]);
    wsConnectSubscribe();
    return () => {
      wsDisConnectUnsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chattingId]);

  // 웹소켓 연결, 구독
  function wsConnectSubscribe() {
    try {
      ws.connect(
        {
          token: token,
        },
        () => {
          ws.subscribe(
            `/sub/chat/message/${chattingId}`,
            (data: { body: string }) => {
              const newMessage = JSON.parse(data.body);

              //트러블 슈팅 적어보기 밑에건 안쌓이고 밑밑에건 쌓인다 왜??
              // setMessages([...messages, newMessage]);

              setMessages((prev) => {
                return [...prev, newMessage];
              });
            },
            { token: token }
          );
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  // // 연결해제, 구독해제
  function wsDisConnectUnsubscribe() {
    try {
      ws.disconnect(
        () => {
          ws.unsubscribe("sub-0");
        },
        { token: token }
      );
    } catch (error) {
      console.log(error);
    }
  }

  // 웹소켓이 연결될 때 까지 실행하는 함수
  function waitForConnection(
    ws: { ws: { readyState: number } },
    callback: { (): void; (): void }
  ) {
    setTimeout(
      function () {
        // 연결되었을 때 콜백함수 실행
        if (ws.ws.readyState === 1) {
          callback();
          // 연결이 안 되었으면 재호출
        } else {
          waitForConnection(ws, callback);
        }
      },
      1 // 밀리초 간격으로 실행
    );
  }

  // 메시지 보내기
  function sendMessage() {
    try {
      // token이 없으면 로그인 페이지로 이동
      if (!token) {
        alert(" 다시 로그인 해주세요.");
        navigate("/");
      }
      // send할 데이터
      const data = {
        type: "TALK",
        roomId: Number(chattingId),
        sender: sender,
        message: messageInput,
        memberId: Number(memberId),
        memberImage: memberImage,
      };
      //   // 빈문자열이면 리턴
      if (messageInput === "") {
        return;
      }

      //   // 로딩 중
      waitForConnection(ws, function () {
        ws.send(
          `/pub/chat/send/${chattingId}`,
          { token: token },
          JSON.stringify(data)
        );

        setMessageInput("");
      });
    } catch (error) {
      console.log(error);
      console.log(ws.ws.readyState);
    }
  }

  return (
    <Container>
      <ChatList prevRoomId={chattingId} />
      {!chattingId && <NoRoom />}
      {chattingId && (
        <ChatWrap>
          <ChatName />
          <MessageList chattingId={chattingId} messages={messages} />
          <MessageWrite
            setMessageInput={setMessageInput}
            sendMessage={sendMessage}
          />
        </ChatWrap>
      )}
    </Container>
  );
};

const Container = styled.div`
  ${(props) => props.theme.border_box};
  display: flex;
  width: 100%;
  height: 100%;

  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
  }
`;

const ChatWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 90%;
  border: 1px solid var(--gray-color);
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    height: 85%;
    border: none;
  }
`;

export default ChattingRoom;
