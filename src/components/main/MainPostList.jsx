import React, { Fragment, useEffect } from "react";
import styled from "styled-components";
import { authInstance } from "../../shared/api";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import MainPostCard from "./MainPostCard";
import Loading from "../../elements/Loading";
import Error from "../../elements/Error";

const getPostList = async (state, pageParam) => {
  console.log(state);
  console.log(pageParam);
  const response = await authInstance.get(
    `/api/post/${state}?page=${pageParam}`
  );
  console.log("===>", response.data.data);

  const { content, last, number } = response.data.data;
  return { content, nextPage: number + 1, last };
};

const MainPostList = ({ state }) => {
  const { ref, inView } = useInView();
  const { data, status, fetchNextPage, isFetchingNextPage, error } =
    useInfiniteQuery(
      "postLists",
      ({ pageParam = 0 }) => getPostList(state, pageParam),
      {
        getNextPageParam: (lastPage) => {
          return !lastPage.last
            ? lastPage.nextPage
            : console.log("====> 마지막페이지 입니다");
        },
      }
    );

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  console.log("1====>", data);

  if (status === "loading") return <Loading />;
  if (status === "error") return <Error message={error.message} />;
  return (
    <StPostLisWrapp>
      <StitemList>
        {data?.pages.map((page, index) => (
          <Fragment key={index}>
            {page.content.map((post) => (
              <MainPostCard key={post.id} post={post} />
            ))}
          </Fragment>
        ))}
        {isFetchingNextPage ? <Loading /> : <div ref={ref}></div>}
      </StitemList>
    </StPostLisWrapp>
  );
};

export default MainPostList;

const StPostLisWrapp = styled.div`
  display: flex;
`;

const StitemList = styled.div`
  margin-top: 20px;
  column-width: 310px;
  column-gap: 15px;
`;
