import React from "react";
import GlobalHeader from "../global/GlobalHeader";
import GlobalLayout from "../global/GlobalLayout";
import CreatePostContainer from "../components/createPost/CreatePostContainer";
import styled from "styled-components";

const CreatePostPage = () => {

  return(
    <StCreatePostPageWrap>
      <GlobalHeader />
      <GlobalLayout>
        <CreatePostContainer />
      </GlobalLayout>
    </StCreatePostPageWrap>
  );
};

export default CreatePostPage;

const StCreatePostPageWrap = styled.div`
  width: 100%;
  height: 100vh;
`;