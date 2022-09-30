import React, { useEffect } from "react";
import styled from "styled-components";

import PostDetailImage from "./PostDetailImg";
import PostDetailLike from "./PostDetailLike";
import PostDetailUser from "./PostDetailUser";
import RelatedList from "./RelatedList";
import { useNavigate, useParams } from "react-router-dom";

import { RiDeleteBin6Fill } from "react-icons/ri";
import { RiEdit2Fill } from "react-icons/ri";
import { IoArrowBackSharp } from "react-icons/io5";
import { authInstance } from "../../shared/api";
import { useQuery, useMutation, useQueryClient } from "react-query";
import PostDetailTagList from "./PostDetailTagList";
import PostDetailDate from "./PostDetailDate";
import AddCommentForm from "./comment/AddCommentForm";
import CommentsList from "./comment/CommentsList";

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

  //스크롤 맨위로 올리는 함수
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const postDetailQuery = useQuery(["postDetail", id], getPostDetail);

  const queryClient = useQueryClient();
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
  const targetTag = postDetail.tags[0].split("#")[1];
  // console.log(targetTag);
  return (
    <>
      <StDetailContainer>
        <IoArrowBackSharp
          className="backButton"
          size="24"
          onClick={() => {
            navigate(-1);
          }}
        />
        {postDetail.isMine && (
          <>
            <RiDeleteBin6Fill
              className="deleteButton"
              size="24"
              onClick={() => mutate(id)}
            />

            <RiEdit2Fill
              className="editButton"
              size="24"
              onClick={() => {
                navigate(`/updatePost/${id}`);
              }}
            />
          </>
        )}
        <PostDetailUser postDetail={postDetail} />
        <PostDetailImage images={postDetail.multipartFiles} />
        <PostDetailLike postDetail={postDetail} />
        <StContentBox>{postDetail.content}</StContentBox>
        <PostDetailDate postDetail={postDetail} />
        <PostDetailTagList tagList={postDetail.tags} />
        <AddCommentForm />
        <CommentsList />
      </StDetailContainer>
      <RelatedList targetTag={targetTag} />

      <div></div>
    </>
  );
};

export default PostDetailContainer;

const StDetailContainer = styled.div`
  width: 100%;
  max-width: 738px;
  padding: 20px 0px;
  margin: 0 auto 50px;

  .backButton {
    background-color: transparent;
    border: none;
    margin-top: 10px;
    margin-right: 10px;
    cursor: pointer;
    @media ${(props) => props.theme.mobile} {
      margin-left: 10px;
    }
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
    margin-right: 20px;
    cursor: pointer;
  }
`;

const StContentBox = styled.div`
  margin-top: 25px;
  width: 100%;
  height: auto;
  line-height: 1.5;
  max-width: 738px;
  padding: 20px 0px;
  margin: 0 auto;

  @media ${(props) => props.theme.mobile} {
    padding-left: 10px;
    padding-right: 10px;
  }
`;
