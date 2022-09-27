import styled from "styled-components";

const PostDetailDate = ({ postDetail }) => {
  return (
    <StDateWrapper>
      <div className="date">
        {postDetail.createdAt.substr(0, 4)}. {postDetail.createdAt.substr(5, 2)}
        . {postDetail.createdAt.substr(8, 2)}
      </div>
    </StDateWrapper>
  );
};

export default PostDetailDate;

const StDateWrapper = styled.div`
  display: block;
  margin: 10px 0;

  overflow: hidden;
  .date {
    float: right;
  }
`;
