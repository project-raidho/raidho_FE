import React from "react";
import { authInstance } from "../../shared/api";
import { useQuery } from "react-query";
import MainPostCard from "../main/MainPostCard";
import styled from "styled-components";
import Loading from "../../elements/Loading";
import Error from "../../elements/Error";
import SearchAlert from "./SearchAlert";
import { MainContentProps } from "../../elements/Type";

const getSearchTagPostList = async ({ queryKey }: { queryKey: string[] }) => {
  const res = await authInstance.get(`/api/search/${queryKey[1]}?page=0`);
  return res.data.data;
};

const SearchTagPost = ({ tagName }: { tagName: string }) => {
  const { data, status, error } = useQuery(
    ["tagPostList", tagName],
    getSearchTagPostList
  );

  if (status === "loading") return <Loading />;
  if (status === "error") return <Error message={(error as Error).message} />;

  return (
    <>
      {data.content.length === 0 && <SearchAlert tagName={tagName} />}
      <StPostCardBox>
        {data.content.map((post: MainContentProps) => (
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
