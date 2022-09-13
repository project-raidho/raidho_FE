import React, { useState } from "react";
import styled from "styled-components";

const CreatePostContent = ({ typedPostContent }) => {
  const [checkTextLength, setCheckTextLength] = useState(0);
  const onChangeContent = (event) => {
    typedPostContent(event.target.value);
    setCheckTextLength(event.target.value.length);
  };

  return (
    <StCreatePostContentWrap>
      <textarea
        onChange={onChangeContent}
        placeholder="경험을 소개해주세요!"
        maxlength="250"
      />
      <StValidationMsg>{checkTextLength} / 250자</StValidationMsg>
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
const StValidationMsg = styled.p`
  font-size: 1.1rem;
  font-weight: 300;
  text-align: right;
  font-style: italic;
  color: var(--title-color);
  margin-bottom: 1rem;
`;
