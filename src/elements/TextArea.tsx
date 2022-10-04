import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface TextAreaProps {
  initialContent: string;
  typedPostContent: (x: string) => void;
  placeholderText: string;
  ValRedMsg: string;
  maxLength?: number;
}
const TextArea = ({
  initialContent,
  typedPostContent,
  placeholderText,
  ValRedMsg,
  maxLength = 200,
}: TextAreaProps) => {
  const [checkTextLength, setCheckTextLength] = useState(
    initialContent?.length
  );
  const [changeContent, setChangeContent] = useState(initialContent);

  const onChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    typedPostContent(event.target.value);
    setCheckTextLength(event.target.value.length);
    setChangeContent(event.target.value);
  };

  useEffect(() => {
    setChangeContent(initialContent);
    setCheckTextLength(initialContent?.length);
    // eslint-disable-next-line
  }, [initialContent]);
  return (
    <StContentTextAreaWrap>
      <textarea
        onChange={onChangeContent}
        value={changeContent}
        placeholder={placeholderText}
        maxLength={maxLength}
      />
      <StValMsgSet>
        <StValRedMsg>{ValRedMsg}</StValRedMsg>
        <StValidationMsg>
          {checkTextLength} / {maxLength}자
        </StValidationMsg>
      </StValMsgSet>
    </StContentTextAreaWrap>
  );
};

export default TextArea;

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

const StValMsgSet = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StValRedMsg = styled.div`
  color: var(--red-color);
`;
const StValidationMsg = styled.p`
  font-size: 1rem;
  font-weight: 300;
  text-align: right;
  font-style: italic;
  color: var(--title-color);
  margin-bottom: 1rem;
`;
