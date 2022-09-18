// import axios from "axios";
import React from "react";
import styled from "styled-components";
import { authInstance } from "../../shared/api";
import { useQuery } from "react-query";
import MainPostCard from "./MainPostCard";
// import { useInView } from "react-intersection-observer";

const getPostList = async ({ queryKey }) => {
  return authInstance.get(`/api/post/${queryKey[1]}`);
  // const data = res.data.content;
  // const pageData = res.data.totalPages;
  // const total = res.data.totalElements;
  // // return {
  //   data,
  //   nextPage: pageParam + 1,
  //   pageData,
  //   total,
  // };
};

const MainPostList = ({ state }) => {
  const postListQuery = useQuery(["postList", state], getPostList, {
    onSuccess: (data) => {
      console.log(data);
    },
    //fresh 타임 늘리는 옵션
    // staleTime: 10000
  });
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

  if (postListQuery.isLoading) {
    return null;
  }

  return (
    <StPostLisWrapp>
      <StitemList>
        {postListQuery.data.data.data.content.map((post) => (
          <MainPostCard key={post.id} post={post} />
        ))}
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
