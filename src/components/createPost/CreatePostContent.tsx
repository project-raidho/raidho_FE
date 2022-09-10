import React from 'react';
import styled from 'styled-components';

interface Props {
  typedPostContent: any;
}

function CreatePostContent({ typedPostContent }: Props) {
  const onChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    typedPostContent(value);
  };

  return (
    <StCreatePostContentWrap>
      <textarea onChange={(event) => onChangeContent(event)} placeholder="경험을 소개해주세요!" />
    </StCreatePostContentWrap>
  );
}

export default CreatePostContent;

const StCreatePostContentWrap = styled.div`
  width: 100%;

  textarea {
    width: 100%;
    height: 200px;
    font-size: 1.2rem;
    border: 1px solid var(--gray-color);
    padding: 1rem;
    margin-bottom: 1rem;
    background-color: var(--subBg-color);
  }
`;
