import React from "react";

import CreatePostContainer from "../components/createPost/CreatePostContainer";
import styled from "styled-components";

const CreatePostPage = () => {
  return (
    <StCreatePostPageWrap>
      <CreatePostContainer />
    </StCreatePostPageWrap>
  );
};

export default CreatePostPage;

const StCreatePostPageWrap = styled.div`
  width: 100%;
`;
