import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface MeetingTitleProps {
  onChangeMeetingTitle: (arg: string) => void;
  placeholderText: string;
  initialContent?: string;
}

const MeetingTitle = ({
  onChangeMeetingTitle,
  placeholderText,
  initialContent,
}: MeetingTitleProps) => {
  const [checkTextLength, setCheckTextLength] = useState(0);
  const [changeContent, setChangeContent] = useState(initialContent);
  const onChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChangeMeetingTitle(event.target.value);
    setCheckTextLength(event.target.value.length);
    setChangeContent(event.target.value);
  };

  useEffect(() => {
    setChangeContent(initialContent);
    // eslint-disable-next-line
  }, [initialContent]);
  return (
    <StMeetingTitletWrap>
      <textarea
        onChange={onChangeContent}
        value={changeContent}
        placeholder={placeholderText}
        maxLength={20}
        minLength={1}
      />
      <StValidationMsg>{checkTextLength} / 20자</StValidationMsg>
    </StMeetingTitletWrap>
  );
};

export default MeetingTitle;

const StMeetingTitletWrap = styled.div`
  width: 100%;

  textarea {
    width: 100%;
    height: 55px;
    font-size: 1.2rem;
    border: 1px solid var(--gray-color);
    border-radius: 15px;
    padding: 1rem;
    margin-bottom: 1rem;
    background-color: var(--subBg-color);
    overflow: hidden;
    outline: none;
    &:focus-visible {
      border: 1px solid var(--main-color);
    }
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
