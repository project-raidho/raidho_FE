import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";

import { authInstance } from "../../../shared/api";
import Button from "../../../elements/Button";
import Potal from "../../../global/globalModal/Potal";
import CofirmModal from "../../../global/globalModal/CofirmModal";

interface CommentProps {
  comment: {
    content: string;
    id: number;
    modifiedAt: string;
    memberName: string;
    memberImage: string;
  };
}
const Comment = ({ comment }: CommentProps) => {
  const userInfo = localStorage.getItem("memberName");

  const [isEdit, setIsEdit] = useState(false);
  const [updatedComment, setUpdatedComment] = useState("");
  const [commentLength, setCommentLength] = useState(comment.content.length);
  // const { content } = useSelector((state) => state.comment.data);
  // 댓글 삭제 axios
  const onDeleteComment = async (commentId: number) => {
    await authInstance.delete(`/api/comment/${commentId}`);
  };
  //모달 상태관리
  const [modalOn, setModalOn] = useState(false);
  const [modalIcon, setModalIcon] = useState<
    "" | "success" | "warning" | "info"
  >("");
  const [alertMsg, setAlertMsg] = useState("");

  const onCloseModal = () => {
    setModalOn(false);
  };
  const onClickYes = async () => {
    deleteMutate.mutate(comment.id);
    setModalOn(false);
  };

  const onDeleteHandler = () => {
    setModalIcon("warning");
    setAlertMsg("댓글을 정말 삭제하시겠습니까?");
    setModalOn(true);
  };

  // 댓글 수정 axios(저장 버튼 클릭시)
  const onUpadteComment = async (commentId: number) => {
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
      queryClient.invalidateQueries("postDetail");
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
  const dateCalculation = (day1: string, day2: string) => {
    const dateStart = new Date(day1.replace(/-/g, "/"));
    const dateEnd = new Date(day2.replace(/-/g, "/"));

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
                <>
                  <input
                    value={updatedComment}
                    onChange={(e) => {
                      setUpdatedComment(e.target.value);
                      setCommentLength(e.target.value.length);
                    }}
                    maxLength={100}
                  />
                  <span>{commentLength}/100자</span>
                </>
              ) : (
                <Stcontent>{comment.content}</Stcontent>
              )}
            </div>

            <StBottomRow>
              <p className="dday">
                {Number(dday) === 0 ? "오늘" : `${Number(dday)}일전`}
              </p>
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
                        onClick={() => onDeleteHandler()}
                      >
                        삭제
                      </Button>
                    </div>
                  )}
                </>
              )}
            </StBottomRow>
          </StmiddleBox>
        </div>
      </StComment>
      <Potal>
        {modalOn && (
          <CofirmModal
            onCloseModal={onCloseModal}
            modalIcon={modalIcon}
            alertMsg={alertMsg}
            onClickYes={() => {
              onClickYes();
            }}
            onClickNo={onCloseModal}
          />
        )}
      </Potal>
    </>
  );
};

export default Comment;

const StComment = styled.div`
  padding: 5px 10px;
  box-sizing: border-box;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  .textbox {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;

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
    width: 100%;
    min-height: 30px;
    margin-bottom: 5px;

    span {
      width: 65px;
      text-align: right;
      font-size: 0.9rem;
      color: var(--title-color);
      margin-left: 5px;

      @media (max-width: 639px) {
        width: 65px;
        font-size: 0.8rem;
      }
    }
  }
  .buttonbox {
    padding-top: 0.2rem;
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
    display: block;
    margin-left: 10px;
    width: calc(100% - 175px);
    min-height: 30px;
    padding: 0 10px;
    font-size: 1rem;
    border: 1px solid var(--gray-color);
    border-radius: 15px;
    background-color: var(--bg-color);
    outline: none;
    &:focus {
      border: 1px solid var(--main-color);
    }
    @media (max-width: 639px) {
      display: block;
      width: calc(100% - 100px);
      font-size: 0.9rem;
    }
  }
`;

const StmiddleBox = styled.div`
  width: calc(100% - 50px);
  margin-left: 10px;
  .name {
    width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 900;
  }
  p.dday {
    font-size: 0.9rem;
    color: var(--gray-color);
  }
  @media (max-width: 639px) {
    .name {
      width: 45px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 0.8rem;
    }
  }
`;
const Stcontent = styled.div`
  padding-left: 10px;
  width: calc(100% - 100px);

  @media (max-width: 639px) {
    width: calc(100% - 45px);
    /* max-width: 130px; */
  }
`;

const StBottomRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  width: 100%;
  .buttonbox {
    button {
      height: 24px;
      font-size: 0.85rem;
      margin-right: 0;
      margin-left: 0.5rem;
    }
  }
`;
