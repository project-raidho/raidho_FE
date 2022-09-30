import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Comment from "./Comment";

import styled from "styled-components";
import { useQuery } from "react-query";
import { authInstance } from "../../../shared/api";
import Button from "../../../elements/Button";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const getCommentList = ({ queryKey }) => {
  return authInstance.get(`/api/comment/${queryKey[1]}`);
};

function CommentsList() {
  const { id } = useParams();
  const [isAll, setIsAll] = useState(false);

  const commentgAllListQuery = useQuery(["commentList", id], getCommentList);

  // console.log(commentgAllListQuery);
  if (commentgAllListQuery.isLoading) {
    return null;
  }

  return (
    <StCommentListWrap>
      {commentgAllListQuery.data.data.data.totalElements < 3 ? null : (
        <p className="buttonCommentToggle" onClick={() => setIsAll(!isAll)}>
          {isAll ? (
            <Button
              size="small"
              variant="lineGray"
              className="buttonCommentSummary"
            >
              요약해서 보기
              <IoIosArrowUp />
            </Button>
          ) : (
            <Button
              size="small"
              variant="linePrimary"
              className="buttonCommentAll"
            >
              댓글{commentgAllListQuery.data.data.data.totalElements}개 모두보기
              <IoIosArrowDown />
            </Button>
          )}
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
  p.buttonCommentToggle {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 1rem;
    text-align: right;
    color: var(--gray-color);
    padding: 8px 10px;
    cursor: pointer;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        width: 18px;
        height: 18px;
        path {
          color: var(--gray-color);
        }
      }
      &:hover {
        svg {
          path {
            color: var(--bg-color);
          }
        }
      }
      &.buttonCommentAll {
        svg {
          path {
            color: var(--main-color);
          }
        }
        &:hover {
          svg {
            path {
              color: var(--bg-color);
            }
          }
        }
      }
    }
  }
  @media ${(props) => props.theme.mobile} {
    p.buttonCommentToggle {
      padding: 5px 10px;
      font-size: 0.9rem;
      button {
        width: auto;
        padding: 0 15px;
      }
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
