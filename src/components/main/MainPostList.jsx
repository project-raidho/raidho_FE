import React, { Fragment, useEffect } from "react";
import styled from "styled-components";
import { authInstance } from "../../shared/api";
// import { useQuery } from "react-query";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import MainPostCard from "./MainPostCard";

const getPostList = async (state, page) => {
  console.log(state);
  console.log(page);
  const response = await authInstance.get(`/api/post/${state}?page=${page}`);
  console.log("===>", response.data.data);

  const { content, last, number } = response.data.data;
  return { content, nextPage: number + 1, last };
};

const MainPostList = ({ state }) => {
  const { ref, inView } = useInView();
  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    "postLists",
    ({ pageParam = 0 }) => getPostList(state, pageParam),
    {
      getNextPageParam: (lastPage) => {
        return !lastPage.last ? lastPage.nextPage : undefined;
      },
    }
  );

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  if (status === "loading") return <div>Loading!!!</div>;
  if (status === "error") return <div>error!!!</div>;
  console.log(data.pages);
  // const postListQuery = useQuery(["postList", state], getPostList, {
  //   onSuccess: (data) => {
  //     console.log(data);
  //   },
  //   //fresh 타임 늘리는 옵션
  //   // staleTime: 10000
  // });
  //   console.log(postListQuery);

  //   const { ref, inView } = useInView();
  //   const {
  //     data,
  //     hasNextPage,
  //     fetchNextPage,
  //     isFetchingNextPage,
  //     status,
  //     error,
  //   } = useInfiniteQuery(
  //     "postList",
  //     ({ pageParam = 1 }) => {
  //       return getPostList(pageParam);
  //     },
  //     {
  //       refetchOnWindowFocus: false,
  //       getNextPageParam: (_lastPage, pages) => {
  //         if (pages.length < pages[0].pageData) {
  //           return pages.length + 1;
  //         } else {
  //           return undefined;
  //         }
  //       },
  //     }
  //   );

  // if (postListQuery.isLoading) {
  //   return null;
  // }

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
        {isFetchingNextPage ? (
          <div>Loading!!!!!!!!</div>
        ) : (
          <div ref={ref}></div>
        )}
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
