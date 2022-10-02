import React from "react";
import { Link } from "react-router-dom";
import { authInstance } from "../../shared/api";
import { useQuery } from "react-query";
import styled from "styled-components";
import fileIcon from "../../assets/fileIcon.svg";

interface RelatedProps {
  targetTag: string;
  postId: Number;
}

const RelatedList = ({ targetTag, postId }: RelatedProps) => {
  // ::: 관련 여행후기 게시글 조회
  const getRelatedPosts = async () => {
    const response = await authInstance.get(
      `/api/search/review/${targetTag}/${postId}`
    );
    return response;
  };

  const relatedPostListQuery = useQuery(
    ["relatedPostList", targetTag, postId],
    getRelatedPosts
  );

  if (relatedPostListQuery.isLoading) {
    return null;
  }

  const relatedPostList = relatedPostListQuery.data?.data.data.content;
  return (
    <>
      <StRelatedTitleRow>
        <h3>관련 여행후기</h3>
        <span className="bgMiddleLine" />
      </StRelatedTitleRow>
      <StRelatedListWrap>
        {relatedPostList.length !== 0 &&
          relatedPostList.map(
            (post: {
              id: number;
              isImages: boolean;
              multipartFiles: string[];
            }) => (
              <StPostCard key={post.id}>
                <Link to={`/postDetail/${post.id}`}>
                  {post.isImages && <div className="imagesIcon" />}
                  <img
                    src={post.multipartFiles[0]}
                    alt={"이미지"}
                    loading="lazy"
                  />
                </Link>
              </StPostCard>
            )
          )}
      </StRelatedListWrap>
    </>
  );
};

export default RelatedList;

const StRelatedTitleRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 45px;
  margin: 25px 0;

  h3 {
    font-size: 2rem;
    font-weight: 400;
    color: var(--title-color);
    padding-right: 25px;
    background-color: var(--bg-color);
    z-index: 2;
    @media ${(props) => props.theme.mobile} {
      font-size: 1.2rem;
      padding-left: 10px;
    }
  }

  .bgMiddleLine {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: var(--line-color);
    z-index: 1;
  }
`;

const StRelatedListWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  height: auto;
  background-color: var(--bg-color);
  overflow: hidden;
  margin-bottom: 80px;
  @media (max-width: 1023px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 767px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    height: auto;
  }
  @media (max-width: 639px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin: 0 10px;
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
