import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";

interface TagInputProps {
  tags: string[];
  selectedTags(arg0: string[]): void;
  tagMassage: string;
  tagValMsg: string;
  tagStatus: boolean;
}

interface Style {
  checkAlert: boolean;
}

const TagInput = ({
  tags,
  selectedTags,
  tagMassage,
  tagValMsg,
  tagStatus,
}: TagInputProps) => {
  const [postTags, setPostTags] = useState<string[]>(tags);
  const [tagValidationMsg, setTagValidationMsg] = useState<string>("");
  const [checkAlert, setCheckAlert] = useState<boolean>(tagStatus);
  const [tagLength, setTagLength] = useState<number>(0);

  // ::: 태그 삭제하기
  const removeTags = (indexToRemove: number) => {
    setTagValidationMsg(`${postTags[indexToRemove]} 태그가 삭제되었습니다.`);
    setCheckAlert(true);
    selectedTags([...postTags.filter((_, index) => index !== indexToRemove)]);
    setPostTags([...postTags.filter((_, index) => index !== indexToRemove)]);
  };

  // ::: 태그 추가하기
  const addTags = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ((event.target as HTMLInputElement).value !== "") {
      if (postTags.length > 4) {
        setCheckAlert(true);
        setTagValidationMsg("입력할 수 있는 개수를 초과했습니다.");
        return false;
      }
      const checkDuplicateTag = postTags.filter(
        (tag) => tag !== `#${(event.target as HTMLInputElement).value}`
      );
      setPostTags([
        ...checkDuplicateTag,
        `#${(event.target as HTMLInputElement).value}`,
      ]);
      selectedTags([
        ...checkDuplicateTag,
        `#${(event.target as HTMLInputElement).value}`,
      ]);
      (event.target as HTMLInputElement).value = "";
      setTagLength(0);

      if (checkDuplicateTag.length === postTags.length) {
        setTagValidationMsg(
          `태그가 성공적으로 입력되었습니다. 최대 5개까지 입력 가능합니다. (현재 개수 ${
            postTags.length + 1
          }개)`
        );
        setCheckAlert(false);
      } else {
        setTagValidationMsg("중복된 값이 입력되었습니다.");
        setCheckAlert(true);
      }
    }
  };

  // ::: 특수문자 입력 막기
  const characterCheck = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // eslint-disable-next-line
    const regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;

    if (regExp.test(event.currentTarget.value)) {
      event.currentTarget.value = event.currentTarget.value.substring(
        0,
        event.currentTarget.value.length - 1
      );
      setTagValidationMsg("공백 및 특수문자를 입력할 수 없습니다.");
      setCheckAlert(true);
    }
  };

  useEffect(() => {
    setTagValidationMsg(tagValMsg);
  }, [tagValMsg]);

  useEffect(() => {
    if (tags.length !== 0) {
      setPostTags(tags);
    } else {
      return;
    }
  }, [tags]);

  return (
    <>
      <StCreatePostTagsWrap className="tagBox">
        <ul id="tags">
          {postTags.map((tag, index) => (
            <li key={index} className="tag">
              <span className="tagTitle">{tag}</span>
              <span className="tagCloseIcon" onClick={() => removeTags(index)}>
                <MdClose />
              </span>
            </li>
          ))}
        </ul>
        <input
          type="text"
          onKeyUp={(event) =>
            event.key === "Enter" ? addTags(event) : characterCheck(event)
          }
          onChange={(event: { target: { value: string | any[] } }) =>
            setTagLength(event.target.value.length)
          }
          placeholder={tagMassage}
          maxLength={20}
          disabled={undefined}
        />
      </StCreatePostTagsWrap>
      <StValidationMsg checkAlert={checkAlert}>
        <span>{tagValidationMsg}</span>
        <strong>{tagLength} / 20자</strong>
      </StValidationMsg>
    </>
  );
};

export default TagInput;

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
    font-size: 1rem;
    padding: 2px 0 0 1.3rem;
    background-color: var(--bg-color);
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
      width: 18px;
      height: 18px;
      line-height: 18px;
      text-align: center;
      margin-left: 8px;
      border-radius: 50%;
      background: var(--bg-color);
      cursor: pointer;

      svg {
        width: 100%;
        height: 100%;
        path {
          color: var(--main-color);
        }
      }
    }
  }

  @media (max-width: 639px) {
    input {
      height: 46px;
      font-size: 1rem;
      padding: 2px 0 0 0.6rem;
    }
    .tag {
      font-size: 1rem;
    }
  }
`;

const StValidationMsg = styled.p`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;

  span {
    font-size: 1rem;
    font-weight: 300;
    font-style: ${(props: Style) => (props.checkAlert ? "nomal" : "italic")};
    color: ${(props) =>
      props.checkAlert ? "var(--red-color)" : "var(--main-color)"};
    margin-bottom: 1rem;
  }
  strong {
    font-size: 1rem;
    font-weight: 300;
    font-style: italic;
  }
  @media (max-width: 639px) {
    span {
      width: calc(100% - 70px);
      font-size: 0.9rem;
    }
    strong {
      font-size: 0.9rem;
    }
  }
`;
