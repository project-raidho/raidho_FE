import React from "react";
import styled from "styled-components";

interface postDetail {
  postDetail: {
    createdAt: string;
  };
}

const PostDetailDate = ({ postDetail }: postDetail) => {
  return (
    <StPostDetailDate>
      <div className="date">
        {postDetail.createdAt.slice(0, 4)}. {postDetail.createdAt.slice(5, 7)}.{" "}
        {postDetail.createdAt.slice(8, 10)}
      </div>
    </StPostDetailDate>
  );
};

export default PostDetailDate;

const StPostDetailDate = styled.div`
  display: block;
  margin: 10px 0;

  overflow: hidden;
  .date {
    float: right;
  }
  @media ${(props) => props.theme.mobile} {
    margin-right: 10px;
  }
`;
