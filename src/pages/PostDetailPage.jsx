import React from "react";
import GlobalLayout from "../global/GlobalLayout";
import GlobalHeader from "../global/GlobalHeader";
import styled from "styled-components";
import PostDetailContainer from "../components/postDetail/PostDetailContainer";

const PostDetailPage = () => {
  return (
    <StPostDetailPageeWrap>
      <GlobalHeader />
      <GlobalLayout>
        <PostDetailContainer />
      </GlobalLayout>
    </StPostDetailPageeWrap>
  );
};

export default PostDetailPage;

const StPostDetailPageeWrap = styled.div`
  background-color: var(--bg-color);
  min-height: 100vh;
`;
