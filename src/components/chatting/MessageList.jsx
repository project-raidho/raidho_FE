import React, { useEffect, Fragment } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Message from "./Message";
import { useQuery } from "react-query";
import { authInstance } from "../../shared/api";

import { useQueryClient, useMutation, useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import Loading from "../../elements/Loading";
import Error from "../../elements/Error";

const getMessageList = async ({ queryKey }) => {
  return await authInstance.get(`/api/chat/messages/${queryKey[1]}?page=0`);
  // console.log(id);
  // console.log(pageParam, pageParam - 1);
  // console.log(response);
  // const { content, last, number } = response.data;
  // console.log(number);
  // return { content, nextPage: pageParam - 1, last };
};

// 메시지 리스트 컴포넌트
const MessageList = ({ messages, setMessages, id }) => {
  // const { id } = useParams();

  const { ref, inView } = useInView();
  console.log(id);

  // const { data, status, fetchNextPage, isFetchingNextPage, error } =
  //   useInfiniteQuery(
  //     "messageList",
  //     ({ pageParam = 0 }) => getMessageList(id, pageParam),
  //     {
  //       // getNextPageParam: (lastPage) => {
  //       //   return !lastPage.last
  //       //     ? lastPage.nextPage
  //       //     : console.log("====> 마지막페이지 입니다");
  //       // },
  //     }
  //   );

  // useEffect(() => {
  //   if (inView) fetchNextPage();
  // }, [inView, fetchNextPage]);

  const allMessageListQuery = useQuery(["messageList", id], getMessageList, {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  console.log(allMessageListQuery);

  // 스크롤 대상
  const messageEndRef = React.useRef(null);
  //  하단 스크롤 함수
  const scrollTomBottom = () => {
    // 모바일이면 실행하지 않기
    if (window.innerWidth <= 375) {
      return;
    }
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 렌더링시 이동
  useEffect(() => {
    scrollTomBottom();
  }, [messages, id]);

  // if (status === "loading") return <Loading />;
  // if (status === "error") return <Error message={error.message} />;
  console.log(messages);

  if (allMessageListQuery.isLoading) {
    return null;
  }

  return (
    <Container className="scroll" id="messagelist">
      {allMessageListQuery.data.data.content.map((m, idx) => (
        <Message key={idx} messageInfo={m} />
      ))}

      {/* {isFetchingNextPage ? <Loading /> : <div ref={ref}></div>}
      {data?.pages.map((page, idx) => (
        <Fragment key={idx}>
          {page?.content.map((m, idx) => (
            <Message key={idx} messageInfo={m} />
          ))}
        </Fragment>
      ))} */}
      {messages.map((m, idx) => {
        return <Message key={idx} messageInfo={m} is_me={true} />;
      })}

      <div ref={messageEndRef}></div>
    </Container>
  );
};

const Container = styled.div`
  ${(props) => props.theme.border_box};
  ${(props) => props.theme.flex_column};
  background-color: #9bbbd4;
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
