import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { authInstance } from "../../shared/api";
import HeartButton from "../main/HeartButton";

const PostDetailLike = ({ postDetail }) => {
  const { id } = useParams();
  const [count, setCount] = useState(0);
  console.log(postDetail.isHeartMine);
  const [like, setLike] = useState(postDetail.isHeartMine);
  console.log(like);
  useEffect(() => {
    setLike(postDetail.isHeartMine);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postDetail]);
  const toggleLike = async () => {
    if (!like) {
      setCount(count + 1);
      await authInstance.post(`/api/postheart/${id}`);
    } else {
      setCount(count - 1);
      await authInstance.delete(`/api/postheart/${id}`);
    }
    setLike(!like);
  };
  return (
    <StlikeWrapper>
      <StHeartCountBox>{postDetail.heartCount + count}</StHeartCountBox>
      <HeartButton like={like} onClick={() => toggleLike()} />
    </StlikeWrapper>
  );
};

export default PostDetailLike;

const StlikeWrapper = styled.div`
  display: flex;
  float: right;
`;
const StHeartCountBox = styled.div`
  margin-right: 10px;
`;
