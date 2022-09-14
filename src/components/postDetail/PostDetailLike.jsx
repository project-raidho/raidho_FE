import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { authInstance } from "../../shared/api";
import HeartButton from "../main/HeartButton";

const PostDetailLike = ({ isHeartMine, heartCount }) => {
  const { id } = useParams();
  const [count, setCount] = useState(0);
  const [like, setLike] = useState(isHeartMine);
  console.log(like);

  const toggleLike = async () => {
    if (!like) {
      setCount(count + 1);
      await authInstance.post(`/api/postheart/${id}`);
    } else {
      setCount(count - 1);
      await authInstance.delete(`/api/postheart/${id}`);
    }
    return setLike(!like);
  };
  return (
    <StlikeWrapper>
      <StHeartCountBox>{heartCount + count}</StHeartCountBox>
      <HeartButton like={like} onClick={toggleLike} />
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
