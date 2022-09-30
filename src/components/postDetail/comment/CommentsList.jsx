import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Comment from "./Comment";

import styled from "styled-components";
import { useQuery } from "react-query";
import { authInstance } from "../../../shared/api";

const getCommentList = ({ queryKey }) => {
  return authInstance.get(`/api/comment/${queryKey[1]}`);
};

function CommentsList() {
  const { id } = useParams();
  const [isAll, setIsAll] = useState(false);

  const commentgAllListQuery = useQuery(["commentList", id], getCommentList, {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  // console.log(commentgAllListQuery);
  if (commentgAllListQuery.isLoading) {
    return null;
  }

  return (
    <StCommentListWrap>
      {commentgAllListQuery.data.data.data.totalElements < 3 ? null : (
        <p className="buttonCommentsAll" onClick={() => setIsAll(!isAll)}>
          {isAll
            ? "요약해서 보기"
            : `댓글${commentgAllListQuery.data.data.data.totalElements}개 모두보기`}
        </p>
      )}
      <StCommentsList className="StCommentsList" isAll={isAll}>
        {commentgAllListQuery.data.data.data.content.map((comment, i) => (
          <Comment key={i} comment={comment} />
        ))}
      </StCommentsList>
    </StCommentListWrap>
  );
}

export default CommentsList;

const StCommentListWrap = styled.div`
  p.buttonCommentsAll {
    font-size: 1rem;
    text-align: right;
    color: var(--gray-color);
    padding: 8px 0px;
    cursor: pointer;
  }
  @media ${(props) => props.theme.mobile} {
    p.buttonCommentsAll {
      padding: 5px 10px;
      font-size: 0.9rem;
    }
  }
`;

const StCommentsList = styled.div`
  height: ${(props) => (props.isAll ? "auto" : "130px")};
  transition: 0.7s;
  overflow: hidden;

  @media ${(props) => props.theme.mobile} {
    margin: 0 10px;
  }
`;
