import React, { useState, useEffect } from "react";
import styled from "styled-components";

const CreatePostContent = ({
  typedPostContent,
  placeholderText,
  initialContent,
  descValMsg,
}) => {
  const [checkTextLength, setCheckTextLength] = useState(0);
  const [changeContent, setChangeContent] = useState(initialContent);
  const onChangeContent = (event) => {
    typedPostContent(event.target.value);
    setCheckTextLength(event.target.value.length);
    setChangeContent(event.target.value);
  };

  useEffect(() => {
    setChangeContent(initialContent);
    // eslint-disable-next-line
  }, [initialContent]);
  return (
    <StCreatePostContentWrap>
      <textarea
        onChange={onChangeContent}
        value={changeContent}
        placeholder={placeholderText}
        maxLength="250"
        minLength="10"
      />
      <div className="valMsg">
        <div className="descValMsg">{descValMsg}</div>
        <StValidationMsg>{checkTextLength} / 250자</StValidationMsg>
      </div>
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
  .valMsg {
    display: flex;
    justify-content: space-between;
  }
  .descValMsg {
    color: var(--red-color);
  }
`;
const StValidationMsg = styled.p`
  font-size: 1.1rem;
  font-weight: 300;
  text-align: right;
  font-style: italic;
  color: var(--title-color);
  margin-bottom: 1rem;

  @media ${(props) => props.theme.mobile} {
    font-size: 1rem;
    color: var(--title-color);
    margin-bottom: 0.5rem;
  }
`;
