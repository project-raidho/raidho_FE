import React, { useState } from "react";
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";
import { authInstance } from "../../../shared/api";
import Button from "../../../elements/Button";
import { useEffect } from "react";

const Comment = ({ comment }) => {
  const userInfo = localStorage.getItem("memberName");

  const [isEdit, setIsEdit] = useState(false);
  const [updatedComment, setUpdatedComment] = useState("");
  // const { content } = useSelector((state) => state.comment.data);
  // 댓글 삭제 axios
  const onDeleteComment = async (commentId) => {
    const result = window.confirm("삭제하시겠습니까?");
    if (result) {
      return await authInstance.delete(`/api/comment/${commentId}`);
    } else {
      return;
    }
  };
  // 댓글 수정 axios(저장 버튼 클릭시)
  const onUpadteComment = async (commentId) => {
    await authInstance.put(`/api/comment/${commentId}`, {
      content: updatedComment,
    });
    setIsEdit(false);
  };

  //수정버튼 클릭시
  const onChangeEdit = () => {
    setIsEdit(true);
  };

  //취소버튼 클릭시
  const onCancle = () => {
    setIsEdit(false);
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

  useEffect(() => {
    setUpdatedComment(comment.content);
  }, [comment]);

  // ::: 날짜 차이 계산하기
  const dateCalculation = (day1, day2) => {
    const dateStart = new Date(day1);
    const dateEnd = new Date(day2);

    const diffDate =
      dateStart.getTime() - dateEnd.getTime() + 9 * 60 * 60 * 1000;
    return Math.abs(diffDate / (1000 * 60 * 60 * 24));
  };

  // ::: 오늘 날짜 계산하기
  const todayCalculation = () => {
    const originDate = new Date();
    const year = originDate.getFullYear();
    const month = originDate.getMonth() + 1;
    const date = originDate.getDate();

    return `${year}-${month}-${date}`;
  };
  const today = todayCalculation();
  // ::: 디데이 계산하기
  const dday = Math.floor(dateCalculation(today, comment.modifiedAt));
  return (
    <div>
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
                {isEdit ? (
                  <input
                    value={updatedComment}
                    onChange={(e) => {
                      setUpdatedComment(e.target.value);
                    }}
                  />
                ) : (
                  <Stcontent>{comment.content}</Stcontent>
                )}
              </div>

              <p>{dday === 0 ? "오늘" : `${dday}일전`}</p>
            </StmiddleBox>
          </div>
          {userInfo === comment.memberName && (
            <>
              {isEdit ? (
                <div className="buttonbox">
                  <Button
                    size="small"
                    variant="linePrimary"
                    onClick={() => onCancle()}
                  >
                    취소
                  </Button>

                  <Button
                    size="small"
                    variant="linePrimary"
                    onClick={() => updateMutate.mutate(comment.id)}
                  >
                    저장
                  </Button>
                </div>
              ) : (
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
              )}
            </>
          )}
        </StComment>
      </>
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
  input {
    margin-left: 10px;
    max-width: 500px;
    @media (max-width: 639px) {
      max-width: 100px;
    }
  }
`;

const StmiddleBox = styled.div`
  margin-left: 10px;
  .name {
    width: 42px;
    font-weight: 900;
  }
`;
const Stcontent = styled.div`
  margin-left: 10px;
  max-width: 500px;
  @media (max-width: 639px) {
    max-width: 100px;
  }
`;
