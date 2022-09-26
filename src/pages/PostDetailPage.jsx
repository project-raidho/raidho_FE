import React from "react";

import styled from "styled-components";
import PostDetailContainer from "../components/postDetail/PostDetailContainer";

const PostDetailPage = () => {
  return (
    <StPostDetailPageeWrap>
      <PostDetailContainer />
    </StPostDetailPageeWrap>
  );
};

export default PostDetailPage;

const StPostDetailPageeWrap = styled.div`
  padding: 10px;
`;
