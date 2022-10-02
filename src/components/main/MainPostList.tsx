import React, { Fragment, useEffect } from "react";
import { authInstance } from "../../shared/api";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import MainPostCard from "./MainPostCard";
import Loading from "../../elements/Loading";
import Error from "../../elements/Error";
import styled from "styled-components";
import { MainContentProps } from "../../elements/Type";

const getPostList = async (state: string, pageParam: number) => {
  const response = await authInstance.get(
    `/api/post/${state}?page=${pageParam}`
  );
  const { content, last, number } = response.data.data;
  return { content, nextPage: number + 1, last };
};

const MainPostList = ({ state }: { state: string }) => {
  const { ref, inView } = useInView();
  const { data, status, fetchNextPage, isFetchingNextPage, error } =
    useInfiniteQuery(
      ["postLists"],
      ({ pageParam = 0 }) => getPostList(state, pageParam),
      {
        cacheTime: 3000,
        getNextPageParam: (lastPage) => {
          if (!lastPage.last) {
            return lastPage.nextPage;
          } else {
            return;
          }
        },
      }
    );

  useEffect(() => {
    if (inView) fetchNextPage();
    // eslint-disable-next-line
  }, [inView]);

  if (status === "loading") return <Loading />;
  if (status === "error") return <Error message={(error as any).message} />;

  console.log(data);

  return (
    <StPostLisWrap>
      <StitemList>
        {data?.pages.map((page, index) => (
          <Fragment key={index}>
            {page.content.map((post: MainContentProps) => (
              <MainPostCard
                key={post.id}
                id={post.id}
                commentCount={post.commentCount}
                heartCount={post.heartCount}
                isHeartMine={post.isHeartMine}
                isImages={post.isImages}
                memberImage={post.memberImage}
                memberName={post.memberName}
                multipartFiles={post.multipartFiles}
              />
            ))}
          </Fragment>
        ))}
        {isFetchingNextPage ? <Loading /> : <div ref={ref}></div>}
      </StitemList>
    </StPostLisWrap>
  );
};

export default MainPostList;

const StPostLisWrap = styled.div`
  display: flex;
`;

const StitemList = styled.div`
  column-width: 310px;
  column-gap: 15px;
`;
