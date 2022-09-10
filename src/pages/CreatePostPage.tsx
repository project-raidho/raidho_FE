import React from 'react';
import styled from 'styled-components';
import GlobalHeader from '../global/GlobalHeader';
import GlobalLayout from '../global/GlobalLayout';
import CreatePostContainer from '../components/createPost/CreatePostContainer';

function CreatePostPage() {
  return (
    <StCreatePostPageWrap>
      <GlobalHeader />
      <GlobalLayout>
        <CreatePostContainer />
      </GlobalLayout>
    </StCreatePostPageWrap>
  );
}

export default CreatePostPage;

const StCreatePostPageWrap = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: var(--bg-color);
`;
