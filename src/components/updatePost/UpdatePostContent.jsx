import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

const UpdatePostContent = ({ content, typedPostContent }) => {
  console.log(content, "<=========");
  const [postContent, setPostContent] = useState(content);
  const onChangeContent = (event) => {
    typedPostContent(event.target.value);
    setPostContent(event.target.value);
  };

  useEffect(() => {
    setPostContent(content);
    // eslint-disable-next-line
  }, []);
  return (
    <StUpdatePostContentWrap>
      <textarea onChange={onChangeContent} value={postContent} />
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
