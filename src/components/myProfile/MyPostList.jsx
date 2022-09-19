import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { authInstance } from "../../shared/api";
import styled from "styled-components";
import fileIcon from "../../assets/fileIcon.svg";

const MyPostList = ({ isMore }) => {
  // ::: 전체 게시글 불러오기
  const [postList, setPostList] = useState([
    {
      content: "",
      createdAt: "",
      heartCount: 0,
      id: 0,
      isHeartMine: false,
      isImages: false,
      isMine: true,
      locationTags: null,
      memberImage: null,
      memberName: "",
      modifiedAt: "",
      multipartFiles: [],
      tags: [],
    },
  ]);

  const getPostList = async () => {
    try {
      const responsePostList = await authInstance.get(`/api/post/mypost`);
      console.log(responsePostList);
      return setPostList(responsePostList.data.data);
    } catch (error) {
      console.log("전체 게시글 불러오기 오류 :::", error);
    }
  };
  useEffect(() => {
    getPostList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StMyPostListWrap isMore={isMore}>
      {postList.map((post) => (
        <StPostCard key={post.id}>
          <Link to={`/postDetail/${post.id}`}>
            {post.isImages && <div className="imagesIcon" />}
            <img src={post.multipartFiles[0]} alt={post.id} loading="lazy" />
          </Link>
        </StPostCard>
      ))}
    </StMyPostListWrap>
  );
};

export default MyPostList;

const StMyPostListWrap = styled.div`
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
