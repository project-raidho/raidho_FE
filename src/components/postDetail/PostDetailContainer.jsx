import React from "react";
import styled from "styled-components";

import PostDetailImage from "./PostDetailImg";
import PostDetailLike from "./PostDetailLike";
import PostDetailUser from "./PostDetailUser";
import { useNavigate, useParams } from "react-router-dom";

import { RiDeleteBin6Fill } from "react-icons/ri";
import { RiEdit2Fill } from "react-icons/ri";
import { IoArrowBackSharp } from "react-icons/io5";
import { authInstance } from "../../shared/api";
import { useQuery, useMutation, useQueryClient } from "react-query";

// ::: 상세페이지 조회 axios
const getPostDetail = async ({ queryKey }) => {
  return await authInstance.get(`/api/post/${queryKey[1]}`);
};

// ::: 상세페이지 삭제 axios
const deletePostDetail = async (id) => {
  return await authInstance.delete(`/api/post/${id}`);
};

const PostDetailContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const postDetailQuery = useQuery(["postDetail", id], getPostDetail, {
    onSuccess: (data) => {
      console.log(data);
    },
    //fresh 타임 늘리는 옵션
    // staleTime: 10000
  });

  const queryClient = useQueryClient();
  //useMutation 첫번째 파라미터: 함수, 두번째 파라미터: 옵션
  const { mutate } = useMutation(deletePostDetail, {
    onSuccess: () => {
      queryClient.invalidateQueries("postLists");
      navigate(-1);
    },
  });

  if (postDetailQuery.isLoading) {
    return null;
  }
  const postDetail = postDetailQuery.data.data.data[0];

  return (
    <StDetailContainer>
      <IoArrowBackSharp
        className="backButton"
        size="24"
        onClick={() => {
          navigate(-1);
        }}
      />
      {postDetail.isMine && (
        <RiDeleteBin6Fill
          className="deleteButton"
          size="24"
          onClick={() => mutate(id)}
        />
      )}
      {postDetail.isMine && (
        <RiEdit2Fill
          className="editButton"
          size="24"
          onClick={() => {
            navigate(`/updatePost/${id}`);
          }}
        />
      )}

      <PostDetailImage images={postDetail.multipartFiles} />
      <PostDetailLike postDetail={postDetail} />
      <PostDetailUser postDetail={postDetail} />
      <StContentBox>{postDetail.content}</StContentBox>
    </StDetailContainer>
  );
};

export default PostDetailContainer;

const StDetailContainer = styled.div`
  margin: 20px auto 0 auto;

  width: 800px;
  border: 1px solid;
  border-radius: 20px;
  padding: 20px 50px;
  /* box-shadow: var(--box-shadow); */

  .backButton {
    background-color: transparent;
    border: none;
    margin-top: 10px;
    margin-right: 10px;

    cursor: pointer;
  }
  .deleteButton {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
    cursor: pointer;
  }
  .editButton {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
    cursor: pointer;
  }
`;

const StContentBox = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 100px;
  line-height: 1.5;
  font-size: 1.5rem;
  padding-bottom: 20px;
`;
