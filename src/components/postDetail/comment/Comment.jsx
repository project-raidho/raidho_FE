import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { authInstance } from "../../../shared/api";
import Button from "../../../elements/Button";

//댓글 조회
const getComment = ({ queryKey }) => {
  return authInstance.get(`/api/comment/${queryKey[1]}`);
};

const deleteCommentList = ({ queryKey }) => {
  return authInstance.get(`/api/comment/${queryKey[1]}`);
};

const updateCommentList = ({ queryKey }) => {
  return authInstance.get(`/api/comment/${queryKey[1]}`);
};

const Comment = ({ comment }) => {
  const userInfo = localStorage.getItem("memberName");
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [updatedComment, setUpdatedComment] = useState(comment.content);
  // const { content } = useSelector((state) => state.comment.data);

  const onDeleteComment = async (commentId) => {
    const result = window.confirm("삭제하시겠습니까?");
    if (result) {
      return await authInstance.delete(`/api/comment/${commentId}`);
    } else {
      return;
    }
  };

  const onUpadteComment = async (commentId) => {
    await authInstance.put(`/api/comment/${commentId}`, {
      postId: id,
      content: updatedComment,
    });
    setIsEdit(false);
  };

  const onChangeEdit = () => {
    setIsEdit(true);
  };

  const onCancle = () => {
    setIsEdit(false);
    // dispatch(clearComment());
  };

  const queryClient = useQueryClient();
  const deleteMutate = useMutation(onDeleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("commentList");
    },
  });
  const updateMutate = useMutation(onUpadteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("commentList");
    },
  });
  return (
    <div>
      {isEdit ? (
        <StComment>
          <div className="textbox">
            <div className="profileBox">
              <img
                className="profileImg"
                src={comment.memberImage}
                alt="프로필이미지"
              />
            </div>
            <div>
              <div className="nameAndContent">
                <p>{comment.memberName}</p>
                <input
                  value={updatedComment}
                  onChange={(e) => {
                    setUpdatedComment(e.target.value);
                  }}
                />
              </div>
              <p>{comment.modifiedAt}</p>
            </div>
          </div>
          <Button onClick={onCancle}>
            <p>취소</p>
          </Button>

          <div className="buttonbox">
            <Button onClick={() => updateMutate.mutate(comment.id)}>
              <p>저장</p>
            </Button>
          </div>
        </StComment>
      ) : (
        <>
          <StComment>
            <div className="textbox">
              <div className="profileBox">
                <img
                  className="profileImg"
                  src={comment.memberImage}
                  alt="프로필이미지"
                />
              </div>
              <StmiddleBox>
                <div className="nameAndContent">
                  <p className="name">{comment.memberName}</p>
                  <Stcontent>{comment.content}</Stcontent>
                </div>

                <p>{comment.modifiedAt}</p>
              </StmiddleBox>
            </div>
            {userInfo === comment.memberName ? (
              <>
                <div className="buttonbox">
                  <Button
                    size="small"
                    variant="linePrimary"
                    onClick={onChangeEdit}
                  >
                    수정
                  </Button>
                  <Button
                    size="small"
                    variant="linePrimary"
                    onClick={() => {
                      deleteMutate.mutate(comment.id);
                    }}
                  >
                    삭제
                  </Button>
                </div>
              </>
            ) : null}
          </StComment>
        </>
      )}
    </div>
  );
};

export default Comment;

const StComment = styled.div`
  padding: 5px 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  .textbox {
    height: 100%;
    display: flex;
    p {
      margin: 0;
      color: #094067;
      font-size: 16px;
    }
  }

  .profileBox {
    width: 40px;
    height: 40px;
    border-radius: 70%;
    overflow: hidden;
  }
  .profileImg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .nameAndContent {
    display: flex;
  }
  .buttonbox {
    button {
      margin: 0 3px;
      padding: 2px 0;
      width: 50px;

      /* :hover {
        background-color: #3da9fc;
      } */
    }
  }
`;

const StmiddleBox = styled.div`
  margin-left: 10px;
  .name {
    font-weight: 900;
  }
`;
const Stcontent = styled.div`
  margin-left: 10px;
`;
