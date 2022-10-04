import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

import { authInstance } from "../../../shared/api";
import Button from "../../../elements/Button";
import Potal from "../../../global/globalModal/Potal";
import LoginModal from "../../login/LoginContainer";

import DefaultProfileImage from "../../../assets/defaultProfileImage.svg";

const AddCommentForm = () => {
  let memberImage = localStorage.getItem("memberImage");

  if (memberImage === null) {
    memberImage = `${DefaultProfileImage}`;
  }
  const memberName = localStorage.getItem("memberName");
  const { postId } = useParams();

  const [content, setContent] = useState("");
  const [commentLength, setCommentLength] = useState(0);

  const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
    setCommentLength(e.target.value.length);
  };

  const onAddComment = async () => {
    await authInstance.post(`/api/comment/${postId}`, { content: content });
    setContent("");
  };
  const queryClient = useQueryClient();
  const { mutate } = useMutation(onAddComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("commentList");
      queryClient.invalidateQueries("postDetail");
    },
    onError: () => {
      setModalOn(!modalOn);
    },
  });

  // ::: 모달 여부 확인하기
  const [modalOn, setModalOn] = useState(false);
  const handleModal = () => {
    setModalOn(!modalOn);
  };

  return (
    <>
      <CommentForm onSubmit={() => mutate()}>
        <div className="profileBox">
          <img className="profileImg" src={memberImage} alt="프로필이미지" />
        </div>
        <input
          required
          placeholder={
            memberName === null
              ? "로그인 후 이용 가능합니다."
              : `${memberName}(으)로 댓글 달기...`
          }
          value={content}
          name="content"
          type="text"
          maxLength={100}
          onChange={onChangeContent}
        />
        <div className="addButton">
          <StButton
            size="small"
            variant={content === "" ? "lineGray" : "lineLightBlue"}
            onClick={() => mutate()}
            type="submit"
            disabled={content === ""}
          >
            게시
          </StButton>
        </div>

        <Potal>
          {modalOn && (
            <LoginModal
              onClose={handleModal}
              message={"로그인 후 이용이 가능합니다."}
            />
          )}
        </Potal>
      </CommentForm>
      <StValidation commentLength={commentLength}>
        <strong>댓글은 최대 100자까지 입력이 가능합니다. </strong>
        <span>{commentLength}/100자</span>
      </StValidation>
    </>
  );
};

export default AddCommentForm;

const CommentForm = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 10px 10px;
  margin-top: 20px;
  margin-bottom: 15px;
  border: 1px solid var(--gray-color);

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
  input {
    width: 75%;
    height: 40px;
    border: none;
    outline: none;
    background-color: var(--bg-color);
    @media (max-width: 639px) {
      max-width: 150px;
    }
  }

  @media ${(props) => props.theme.mobile} {
    margin: 15px 10px;

    .addButton {
      width: 70px;
      font-size: 0.9rem;
    }
  }
`;

const StButton = styled(Button)`
  ${(props) =>
    props.variant === "lineGray" &&
    css`
      cursor: default;

      &:hover {
        background-color: var(--bg-color);
        color: var(--gray-color);
      }
    `};
`;

const StValidation = styled.p<{
  commentLength: number;
}>`
  display: flex;
  justify-content: space-between;
  padding: 0px 10px 10px;
  span,
  strong {
    font-size: 0.9rem;
    color: var(--gray-color);
  }
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    padding: 0px 10px 10px;
    span,
    strong {
      font-size: 0.9rem;
    }
    span {
      color: ${({ commentLength }) =>
        commentLength > 0 && "var(--title-color)"};
    }
  }
`;
