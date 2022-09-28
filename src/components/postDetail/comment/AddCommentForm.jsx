import React, { useState } from "react";

import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";
import { authInstance } from "../../../shared/api";
import Button from "../../../elements/Button";
const AddCommentForm = () => {
  const memberImage = localStorage.getItem("memberImage");
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm();

  const [content, setContent] = useState("");

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onAddComment = async () => {
    await authInstance.post(`/api/comment/${id}`, { content: content });
    setContent("");
  };
  const queryClient = useQueryClient();
  const { mutate } = useMutation(onAddComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("commentList");
    },
  });
  return (
    <CommentForm onSubmit={handleSubmit(mutate)}>
      <div className="profileBox">
        <img className="profileImg" src={memberImage} alt="프로필이미지" />
      </div>
      <input
        required
        placeholder="댓글달기..."
        aria-invalid={!isDirty ? undefined : errors.content ? "true" : "false"}
        {...register("content", {
          required: "내용은 필수 입력사항입니다.",
          maxLength: {
            value: 100,
            message: "100자 이내로  작성해주세요.",
          },
        })}
        value={content}
        name="content"
        type="text"
        onChange={onChangeContent}
      />
      {errors.content && <small role="alert">{errors.content.message}</small>}

      <Button
        size="small"
        variant={content === "" ? "lineGray" : "lineLightBlue"}
        onClick={mutate}
        className="addButton"
        type="submit"
      >
        게시
      </Button>
    </CommentForm>
  );
};

export default AddCommentForm;

const CommentForm = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 5px 10px;
  margin-top: 20px;
  margin-bottom: 15px;
  border: 1px solid;
  border-radius: 12px;

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
    @media (max-width: 639px) {
      max-width: 150px;
    }
  }
  .addButton {
    font-size: 20px;
  }
`;
