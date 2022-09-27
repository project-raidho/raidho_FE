import React from "react";
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

  const commentgAllListQuery = useQuery(["commentList", id], getCommentList, {
    onSuccess: (data) => {
      console.log(data);
    },
  });
  console.log(commentgAllListQuery);
  if (commentgAllListQuery.isLoading) {
    return null;
  }

  return (
    <StCommentsList className="StCommentsList">
      {commentgAllListQuery.data.data.data.content.map((comment, i) => (
        <Comment key={i} comment={comment} />
      ))}
    </StCommentsList>
  );
}

export default CommentsList;

const StCommentsList = styled.div``;
