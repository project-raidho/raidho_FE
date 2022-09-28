import React, { useState, useEffect } from "react";
import styled from "styled-components";

const MeetingTitle = ({
  onChangeMeetingTitle,
  placeholderText,
  initialContent,
}) => {
  const [checkTextLength, setCheckTextLength] = useState(0);
  const [changeContent, setChangeContent] = useState(initialContent);
  const onChangeContent = (event) => {
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
        maxLength="30"
        minLength="1"
      />
      <StValidationMsg>{checkTextLength} / 30자</StValidationMsg>
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
