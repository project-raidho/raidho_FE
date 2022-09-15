import React, { useState, useEffect } from "react";
import Input from "../../elements/Input";
import styled from "styled-components";

const UpdatePostTags = ({ tags, selectedTags, tagMassage }) => {
  useEffect(() => {
    setPostTags(tags);
    // eslint-disable-next-line
  }, [tags]);
  const [postTags, setPostTags] = useState(tags);
  const [tagValidationMsg, setTagValidationMsg] = useState("");
  const [checkAlert, setCheckAlert] = useState(false);

  // ::: 태그 삭제하기
  const removeTags = (indexToRemove) => {
    setTagValidationMsg(`${postTags[indexToRemove]} 태그가 삭제되었습니다.`);
    setCheckAlert(true);
    setPostTags([...postTags.filter((_, index) => index !== indexToRemove)]);
  };

  // ::: 태그 추가하기
  const addTags = (event) => {
    if (event.target.value !== "") {
      const checkDuplicateTag = postTags.filter(
        (tag) => tag !== event.target.value
      );
      setPostTags([...checkDuplicateTag, event.target.value]);
      selectedTags([...checkDuplicateTag, event.target.value]);
      event.target.value = "";

      if (checkDuplicateTag.length === postTags.length) {
        setTagValidationMsg("태그가 성공적으로 입력되었습니다.");
        setCheckAlert(false);
      } else {
        setTagValidationMsg("중복된 값이 입력되었습니다.");
        setCheckAlert(true);
      }
    }
  };

  return (
    <>
      <StCreatePostTagsWrap>
        <ul id="tags">
          {postTags.map((tag, index) => (
            <li key={index} className="tag">
              <span className="tagTitle">{tag}</span>
              <span className="tagCloseIcon" onClick={() => removeTags(index)}>
                x
              </span>
            </li>
          ))}
        </ul>
        <Input
          type="text"
          onKeyUp={(event) => (event.key === "Enter" ? addTags(event) : null)}
          placeholder={tagMassage}
        />
      </StCreatePostTagsWrap>
      <StValidationMsg checkAlert={checkAlert}>
        {tagValidationMsg}
      </StValidationMsg>
    </>
  );
};

export default UpdatePostTags;

const StCreatePostTagsWrap = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  min-height: 48px;

  border: 1px solid var(--gray-color);
  border-radius: 0px;
  padding: 0 8px;
  margin-bottom: 1rem;
  &:focus-within {
    border: 1px solid var(--main-color);
  }
  input {
    flex: 1;
    border: none;
    height: 46px;
    font-size: 1.2rem;
    padding: 4px 0 0 0;
    &:focus {
      outline: transparent;
    }
  }

  #tags {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 8px 0 0 0;
  }

  .tag {
    width: auto;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-color);
    padding: 0 8px;
    font-size: 1.5rem;
    list-style: none;
    border-radius: 20px;
    margin: 0 8px 8px 0;
    background: var(--main-color);
    .tagTitle {
      margin-top: 3px;
    }
    .tagCloseIcon {
      display: block;
      width: 16px;
      height: 16px;
      line-height: 16px;
      text-align: center;
      font-size: 14px;
      margin-left: 8px;
      color: var(--main-color);
      border-radius: 50%;
      background: var(--bg-color);
      cursor: pointer;
    }
  }
`;

const StValidationMsg = styled.p`
  font-size: 1.1rem;
  font-weight: 300;
  font-style: italic;
  color: ${(props) =>
    props.checkAlert ? "var(--red-color)" : "var(--main-color)"};
  margin-bottom: 1rem;
`;
