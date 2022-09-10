import React from "react";
import styled from "styled-components";

const CreatePostContent = ({ typedPostContent }) => {
  const onChangeContent = (event) => {
    typedPostContent(event.target.value);
  };

  return (
    <StCreatePostContentWrap>
      <textarea onChange={onChangeContent} placeholder="경험을 소개해주세요!" />
    </StCreatePostContentWrap>
  );
};

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
