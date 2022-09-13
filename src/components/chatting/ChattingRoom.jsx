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
import { authInstance } from "../../shared/api";

// 채팅 방 컴포넌트
const ChattingRoom = (props) => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [messages, setMessages] = useState([
    {
      userId: 2,
      message: "믿고 있을게요",
      createdAt: "2022-09-05 18:15",
      user: {
        username: "유진님",
        profileUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReXiJKCJfUo-QZzQ5gpm4ol9qtYe9W8BevUw&usqp=CAU",
      },
    },
    {
      userId: 1,
      message: "믿지 마세요;;;",
      createdAt: "2022-09-05 18:16",
      sender: "경문",
    },
  ]);

  // 소켓 통신 객체
  const sock = new SockJS("http://15.164.97.250:8080/chatting");
  const ws = Stomp.over(sock);

  const { id } = useParams();
  const roomId = id;

  // 토큰
  const token = localStorage.getItem("Authorization");

  // 보낼 메시지 텍스트
  const [messageInput, setMessageInput] = useState();

  let sender = localStorage.getItem("memberName");

  // 렌더링 될 때마다 연결,구독 다른 방으로 옮길 때 연결, 구독 해제
  React.useEffect(() => {
    wsConnectSubscribe();
    getMessageList(id);
    return () => {
      wsDisConnectUnsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // 웹소켓 연결, 구독
  function wsConnectSubscribe() {
    try {
      ws.connect(
        {
          token: token,
        },
        () => {
          ws.subscribe(
            `/sub/api/chat/rooms/${roomId}`,
            (data) => {
              const newMessage = JSON.parse(data.body);
              // dispatch(chatActions.getMessages(newMessage));
              // 실험해볼것 : 실시간으로 적용되는지?
              setMessages([...messages, newMessage]);
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
  function waitForConnection(ws, callback) {
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
        alert("토큰이 없습니다. 다시 로그인 해주세요.");
        navigate("/");
      }
      // send할 데이터
      const data = {
        type: "TALK",
        roomId: roomId,
        sender: sender,
        message: messageInput,
      };
      // 빈문자열이면 리턴
      if (messageInput === "") {
        return;
      }
      // 로딩 중
      // dispatch(chatActions.isLoading());
      waitForConnection(ws, function () {
        ws.send(
          "/pub/api/chat/message",
          { token: token },
          JSON.stringify(data)
        );
        console.log(ws.ws.readyState);
        setMessageInput("");
      });
    } catch (error) {
      console.log(error);
      console.log(ws.ws.readyState);
    }
  }

  // DB에 존재하는 채팅방 메시지들 가져오기
  const getMessageList = async (roomId) => {
    try {
      const res = await authInstance.get(`/api/chat/rooms/${roomId}/messages`);

      return setMessages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <ChatList prevRoomId={roomId} />
      {!roomId && <NoRoom />}
      {roomId && (
        <ChatWrap>
          <ChatName />
          <MessageList messages={messages} />
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
  ${(props) => props.theme.flex_row}
  width: 100%;
  height: 100%;
  background-color: white;
  color: ${(props) => props.theme.theme_yellow};
  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
  }
`;

const ChatWrap = styled.div`
  ${(props) => props.theme.flex_column}
  width: 70%;
  height: 100%;
  border: 1px solid;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    height: 85%;
  }
`;

export default ChattingRoom;
