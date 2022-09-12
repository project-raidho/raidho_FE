import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../../elements/Input';

interface Props {
  tags: string[];
  selectedTags: any;
  tagMassage: string;
}

function CreatePostTags({ tags, selectedTags, tagMassage }: Props) {
  const [postTags, setPostTags] = useState(tags);

  // ::: 태그 삭제하기
  const removeTags = (indexToRemove: number) => {
    setPostTags([...postTags.filter((_, index) => index !== indexToRemove)]);
  };

  // ::: 태그 추가하기
  const addTags = (event: React.KeyboardEvent<HTMLElement>) => {
    if ((event.target as HTMLInputElement).value !== '') {
      setPostTags([...postTags, (event.target as HTMLInputElement).value]);
      selectedTags([...postTags, (event.target as HTMLInputElement).value]);
      (event.target as HTMLInputElement).value = '';
    }
  };

  return (
    <StCreatePostTagsWrap>
      <ul id="tags">
        {postTags.map((tag: string, index: number) => (
          <li key={tag} className="tag">
            <span className="tagTitle">{tag}</span>
            <span className="tagCloseIcon" onClick={() => removeTags(index)}>
              x
            </span>
          </li>
        ))}
      </ul>
      <Input
        onKeyUp={(event: React.KeyboardEvent<HTMLElement>) => (event.key === 'Enter' ? addTags(event) : null)}
        placeholder={tagMassage}
      />
    </StCreatePostTagsWrap>
  );
}

export default CreatePostTags;

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
