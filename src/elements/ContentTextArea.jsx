import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ContentTextArea = ({
  initialContent,
  typedPostContent,
  placeholderText,
}) => {
  const [checkTextLength, setCheckTextLength] = useState(initialContent.length);
  const [changeContent, setChangeContent] = useState(initialContent);

  const onChangeContent = (event) => {
    typedPostContent(event.target.value);
    setCheckTextLength(event.target.value.length);
    setChangeContent(event.target.value);
  };

  useEffect(() => {
    setChangeContent(initialContent);
    setCheckTextLength(initialContent.length);
    // eslint-disable-next-line
  }, [initialContent]);
  return (
    <StContentTextAreaWrap>
      <textarea
        onChange={onChangeContent}
        value={changeContent}
        placeholder={placeholderText}
        maxLength="250"
        minLength="10"
      />
      <StValidationMsg>{checkTextLength} / 250자</StValidationMsg>
    </StContentTextAreaWrap>
  );
};

export default ContentTextArea;

const StContentTextAreaWrap = styled.div`
  width: 100%;

  textarea {
    width: 100%;
    height: 200px;
    font-size: 1rem;
    border: 1px solid var(--gray-color);
    padding: 1.3rem;
    margin-bottom: 1rem;
    background-color: var(--subBg-color);
    outline: none;

    &:focus-visible {
      border: 1px solid var(--main-color);
    }
  }

  @media (max-width: 639px) {
    textarea {
      font-size: 1rem;
      padding: 0.6rem;
    }
  }
`;

const StValidationMsg = styled.p`
  font-size: 1rem;
  font-weight: 300;
  text-align: right;
  font-style: italic;
  color: var(--title-color);
  margin-bottom: 1rem;
`;
