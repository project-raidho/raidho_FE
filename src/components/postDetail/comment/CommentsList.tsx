import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Comment from "./Comment";

import styled from "styled-components";
import { useQuery } from "react-query";
import { authInstance } from "../../../shared/api";
import Button from "../../../elements/Button";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const getCommentList = ({ queryKey }: { queryKey: (string | undefined)[] }) => {
  return authInstance.get(`/api/comment/${Number(queryKey[1])}`);
};

function CommentsList() {
  const { postId } = useParams();
  const [isAll, setIsAll] = useState(false);

  const commentgAllListQuery = useQuery(
    ["commentList", postId],
    getCommentList
  );

  if (commentgAllListQuery.isLoading) {
    return null;
  }
  const commentsList = commentgAllListQuery.data?.data.data;
  return (
    <StCommentListWrap>
      {commentsList.totalElements < 2 ? null : (
        <p className="buttonCommentToggle" onClick={() => setIsAll(!isAll)}>
          {isAll ? (
            <Button size="small" variant="lineGray">
              요약해서 보기
              <IoIosArrowUp />
            </Button>
          ) : (
            <span className="buttonCommentAll">
              <Button size="small" variant="linePrimary">
                댓글{commentsList.totalElements}개 모두보기
                <IoIosArrowDown />
              </Button>
            </span>
          )}
        </p>
      )}
      <StCommentsList className="StCommentsList" isAll={isAll}>
        {commentsList.content.length > 1 && isAll
          ? commentsList.content.map(
              (
                comment: {
                  content: string;
                  id: number;
                  modifiedAt: string;
                  memberName: string;
                  memberImage: string;
                },
                i: number
              ) => <Comment key={i} comment={comment} />
            )
          : commentsList.content.length !== 0 && (
              <Comment comment={commentsList.content[0]} />
            )}
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
  height: ${(props) => (props.isAll ? "auto" : "95px")};
  transition: 0.7s;
  overflow: hidden;

  @media ${(props) => props.theme.mobile} {
    height: ${(props) => (props.isAll ? "auto" : "160px")};
    margin: 0 10px;
  }
`;
