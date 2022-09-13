import React, { useState } from "react";
import styled from "styled-components";
import HeartButton from "../main/HeartButton";
// import axios from "axios";

const PostDetailLike = ({ postDetail }) => {
  const initial = postDetail.heartCount;
  console.log(initial);
  const [count, setCount] = useState(0);

  const [like, setLike] = useState(false);

  console.log(like);
  // const URI = process.env.REACT_APP_BASE_URI;
  // let config = {
  //     headers: {
  //       Authorization: localStorage.getItem("Authorization"),
  //       RefreshToken: localStorage.getItem("RefreshToken"),
  //     },
  //   };

  const toggleLike = async () => {
    if (like === false) {
      setCount(count + 1);
      //  await axios.post(`${URI}/detail/like`, {like:true}, config)
    } else {
      setCount(count - 1);
      // await axios.post(`${URI}/detail/like`, {like:false}, config)
    }
    return setLike(!like);

    // [POST] 사용자가 좋아요를 누름 -> DB 갱신
  };
  return (
    <StlikeWrapper>
      <StHeartCountBox>{postDetail.heartCount + count}</StHeartCountBox>
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
