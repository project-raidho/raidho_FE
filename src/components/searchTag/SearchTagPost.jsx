import React from "react";
import { authInstance } from "../../shared/api";
import { useQuery } from "react-query";
import MainPostCard from "../main/MainPostCard";
import styled from "styled-components";
import Loading from "../../elements/Loading";
import SearchAlert from "./SearchAlert";

const SearchTagPost = ({ tagName }) => {
  // ::: 테그 상세 리스트 리스트 불러오기
  const getSearchTagPostList = async () => {
    console.log("====>tag", tagName);
    try {
      return await authInstance.get(`/api/search/${tagName}`);
    } catch (error) {
      console.log(error);
    }
  };

  const tagPostListQuery = useQuery(
    ["tagPostList", tagName],
    getSearchTagPostList,
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  if (tagPostListQuery.isLoading) {
    return <Loading />;
  }

  console.log("tagPostListQuery :::", tagPostListQuery);

  return (
    <>
      {tagPostListQuery.data.data.data.content.length === 0 ? (
        <SearchAlert tagName={tagName} />
      ) : (
        <StPostCardBox>
          {tagPostListQuery.data.data.data.content.map((post) => (
            <MainPostCard key={post.id} post={post} />
          ))}
        </StPostCardBox>
      )}
    </>
  );
};

export default SearchTagPost;

const StPostCardBox = styled.div`
  margin-top: 20px;
  column-width: 310px;
  column-gap: 15px;
`;
