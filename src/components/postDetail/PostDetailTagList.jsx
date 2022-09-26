import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PostDetailTagList = ({ tagList }) => {
  console.log(tagList);
  const navigate = useNavigate();

  const onClickTagHandler = (tag) => {
    const sliceTag = tag.substr(1);
    console.log(sliceTag);
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
  .tagList {
    display: flex;
    gap: 10px;
  }
  .tag {
    color: var(--main-color);
    cursor: pointer;
  }
`;
