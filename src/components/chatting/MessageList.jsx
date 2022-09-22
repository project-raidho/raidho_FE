import React, { Fragment, useEffect } from "react";
import { authInstance } from "../../shared/api";
import styled from "styled-components";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
// elements
import Message from "./Message";
import Loading from "../../elements/Loading";
import Error from "../../elements/Error";
import { useParams } from "react-router-dom";

const getMessageList = async (id, pageParam) => {
  const response = await authInstance.get(
    `/api/chat/messages/${id}?page=${pageParam}`
  );
  console.log(response);
  const { content, last } = response.data;
  return { content, nextPage: pageParam + 1, last };
};

// 메시지 리스트 컴포넌트
const MessageList = ({ messages }) => {
  const { id } = useParams();
  // const { ref, inView } = useInView();
  // const { data, status, fetchNextPage, isFetchingNextPage, error } =
  //   useInfiniteQuery(
  //     "messageList",
  //     ({ pageParam = 0 }) => getMessageList(id, pageParam),
  //     {
  //       getNextPageParam: (lastPage) => {
  //         return !lastPage.last
  //           ? lastPage.nextPage
  //           : console.log("====> 마지막페이지 입니다");
  //       },
  //     }
  //   );
  // console.log(data);

  // useEffect(() => {
  //   if (inView) fetchNextPage();
  // }, [inView]);

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

  return (
    <Container className="scroll" id="messagelist">
      {/* {isFetchingNextPage ? <Loading /> : <div ref={ref}></div>}
      {data?.pages.reverse().map((page, idx) => (
        <Fragment key={idx}>
          {page.content.map((m) => (
            <Message key={m.id} messageInfo={m} />
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
