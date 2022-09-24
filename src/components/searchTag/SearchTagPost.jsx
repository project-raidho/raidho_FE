import React, { useEffect, Fragment } from "react";
import { authInstance } from "../../shared/api";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import MainPostCard from "../main/MainPostCard";
import styled from "styled-components";
import Loading from "../../elements/Loading";
import Error from "../../elements/Error";
import SearchAlert from "./SearchAlert";

const getSearchTagPostList = async (tagName, pageParam) => {
  console.log("====>tag", tagName);
  try {
    const response = await authInstance.get(
      `/api/search/${tagName}?page=${pageParam}`
    );

    const { content, last, number } = response.data.data;
    return { content, nextPage: number + 1, last };
  } catch (error) {
    console.log(error);
  }
};

const SearchTagPost = ({ tagName }) => {
  const { ref, inView } = useInView();
  const { data, status, fetchNextPage, isFetchingNextPage, error } =
    useInfiniteQuery(
      ["tagPostList"],
      ({ pageParam = 0 }) => getSearchTagPostList(tagName, pageParam),
      {
        cacheTime: 3000,
        getNextPageParam: (lastPage) => {
          return !lastPage.last
            ? lastPage.nextPage
            : console.log("====> 마지막페이지 입니다");
        },
      }
    );

  useEffect(() => {
    if (inView) fetchNextPage();
    // eslint-disable-next-line
  }, [inView]);

  if (status === "loading") return <Loading />;
  if (status === "error") return <Error message={error.message} />;

  console.log("tagPostListQuery :::", data);

  return (
    <>
      {data.pages[0].content.length === 0 && <SearchAlert tagName={tagName} />}
      <StPostCardBox>
        {data?.pages.map((page, index) => (
          <Fragment key={index}>
            {page.content.map((post) => (
              <MainPostCard key={post.id} post={post} />
            ))}
          </Fragment>
        ))}
        {isFetchingNextPage ? <Loading /> : <div ref={ref}></div>}
      </StPostCardBox>
    </>
  );
};

export default SearchTagPost;

const StPostCardBox = styled.div`
  margin-top: 20px;
  column-width: 310px;
  column-gap: 15px;
`;
