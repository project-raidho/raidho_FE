import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface TagList {
  tagList: string[];
}

const PostDetailTagList = ({ tagList }: TagList) => {
  // console.log(tagList);
  const navigate = useNavigate();

  const onClickTagHandler = (tag: string) => {
    const sliceTag = tag.slice(1);
    navigate(`/post/best?tag=${sliceTag}`, {
      state: {
        tagKeyword: sliceTag,
      },
    });
  };
  return (
    <StTagWrapper>
      <div className="tagList">
        {tagList.map((tag, i) => (
          <div key={i} className="tag" onClick={() => onClickTagHandler(tag)}>
            {tag}
          </div>
        ))}
      </div>
    </StTagWrapper>
  );
};

export default PostDetailTagList;

const StTagWrapper = styled.div`
  display: flex;
  width: 100%;
  .tagList {
    display: block;
    width: 100%;
    line-height: 1.2;
    text-align: left;
  }
  .tag {
    display: inline-block;
    width: auto;
    margin-right: 1rem;
    color: var(--main-color);
    cursor: pointer;
  }
  @media ${(props) => props.theme.mobile} {
    margin-left: 10px;

    .tag {
      font-size: 0.9rem;
      line-height: 1;
    }
  }
`;
