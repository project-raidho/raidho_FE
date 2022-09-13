import React from "react";
import styled from "styled-components";

const UpdatePostContent = ({ typedPostContent }) => {
  const onChangeContent = (event) => {
    typedPostContent(event.target.value);
  };

  return (
    <StUpdatePostContentWrap>
      <textarea onChange={onChangeContent} placeholder="경험을 소개해주세요!" />
    </StUpdatePostContentWrap>
  );
};

export default UpdatePostContent;

const StUpdatePostContentWrap = styled.div`
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
