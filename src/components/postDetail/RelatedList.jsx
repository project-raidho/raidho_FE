import React from "react";
import { Link } from "react-router-dom";
import { authInstance } from "../../shared/api";
import { useQuery } from "react-query";
import styled from "styled-components";
import fileIcon from "../../assets/fileIcon.svg";

// ::: 연관 게시글 조회
const getRelatedPosts = async ({ queryKey }) => {
  return await authInstance.get(`/api/search/${queryKey}`);
};

const RelatedList = ({ targetTag }) => {
  console.log(targetTag, "targetTag");

  const relatedPostListQuery = useQuery(
    ["tagPostList", targetTag],
    getRelatedPosts,
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  if (relatedPostListQuery.isLoading) {
    return null;
  }

  const relatedPostList = relatedPostListQuery.data.data.data.content;
  console.log(
    "relatedPostListQuery",
    relatedPostListQuery.data.data.data.content
  );
  return (
    <StRelatedListWrap>
      {relatedPostList.length !== 0 &&
        relatedPostList.map((post) => (
          <StPostCard key={post.id}>
            <Link to={`/postDetail/${post.id}`}>
              {post.isImages && <div className="imagesIcon" />}
              <img src={post.multipartFiles[0]} alt={post.id} loading="lazy" />
            </Link>
          </StPostCard>
        ))}
    </StRelatedListWrap>
  );
};

export default RelatedList;

const StRelatedListWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  height: ${(props) => (props.isMore === true ? "auto" : "400px")};
  background-color: var(--bg-color);
  overflow: hidden;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 767px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    height: ${(props) => (props.isMore === true ? "auto" : "200px")};
  }
  @media (max-width: 639px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
`;

const StPostCard = styled.div`
  position: relative;
  width: 100%;
  height: 400px;

  .imagesIcon {
    height: 22px;
    width: 22px;
    position: absolute;
    top: 13px;
    right: 10px;
    background-image: url(${fileIcon});
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 767px) {
    height: 200px;
  }
  @media (max-width: 639px) {
    height: 200px;
  }
`;
