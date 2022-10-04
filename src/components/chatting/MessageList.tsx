import React, { useEffect } from "react";
import styled from "styled-components";

import Message from "./Message";
import { useQuery } from "react-query";
import { authInstance } from "../../shared/api";

import Loading from "../../elements/Loading";
// import Error from "../../elements/Error";

interface MessageListProps {
  messages: {
    memberId: number;
    memberImage: string | null;
    message: string;
    messageTime: string | null;
    roomId: string;
    sender: string;
    type: string;
  }[];
  chattingId: string;
}

const getMessageList = async ({
  queryKey,
}: {
  queryKey: (string | undefined)[];
}) => {
  return await authInstance.get(
    `/api/chat/messages/${Number(queryKey[1])}?page=0`
  );
};

// 메시지 리스트 컴포넌트
const MessageList = ({ messages, chattingId }: MessageListProps) => {
  const allMessageListQuery = useQuery(
    ["messageList", chattingId],
    getMessageList,
    {
      // staleTime: 1000 * 60 * 60 * 24,
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  console.log(allMessageListQuery.data?.data.content);

  // 스크롤 대상
  const messageEndRef = React.useRef<null | HTMLDivElement>(null);
  //  하단 스크롤 함수
  const scrollTomBottom = () => {
    // // 모바일이면 실행하지 않기
    // if (window.innerWidth <= 375) {
    //   return;
    // }
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 렌더링시 이동
  useEffect(() => {
    scrollTomBottom();
  }, [messages, chattingId]);

  if (allMessageListQuery.status === "loading") return <Loading />;
  // if (status === "error") return <Error message={error.message} />;

  if (allMessageListQuery.isLoading) {
    return null;
  }

  return (
    <Container className="scroll" id="messagelist">
      {allMessageListQuery.data?.data.content.map(
        (
          m: {
            memberId: number;
            memberImage: string | null;
            message: string;
            messageTime: string | null;
            roomId: string;
            sender: string;
            type: string;
          },
          idx: number
        ) => (
          <Message key={idx} messageInfo={m} />
        )
      )}

      {messages.map(
        (
          m: {
            memberId: number;
            memberImage: string | null;
            message: string;
            messageTime: string | null;
            roomId: string;
            sender: string;
            type: string;
          },
          idx: number
        ) => {
          return <Message key={idx} messageInfo={m} />;
        }
      )}

      <div ref={messageEndRef}></div>
    </Container>
  );
};

const Container = styled.div`
  ${(props) => props.theme.border_box};
  ${(props) => props.theme.flex_column};
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 30px 30px 60px 30px;
  overflow: auto;

  @media ${(props) => props.theme.mobile} {
    height: 100%;
    padding: 30px 10px 80px 10px;
  }
`;

export default MessageList;
