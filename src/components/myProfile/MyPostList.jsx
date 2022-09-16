import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { authInstance } from "../../shared/api";
import styled from "styled-components";

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
            <img src={post.multipartFiles[0]} alt={post.id} />
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
`;

const StPostCard = styled.div`
  width: 300px;
  height: 400px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
