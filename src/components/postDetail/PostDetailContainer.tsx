import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { RiEdit2Fill } from "react-icons/ri";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";

import PostDetailImage from "./PostDetailImg";
import PostDetailLike from "./PostDetailLike";
import PostDetailUser from "./PostDetailUser";
import RelatedList from "./RelatedList";
import PostDetailTagList from "./PostDetailTagList";
import PostDetailDate from "./PostDetailDate";

//댓글 컴포넌트
import AddCommentForm from "./comment/AddCommentForm";
import CommentsList from "./comment/CommentsList";

import { authInstance } from "../../shared/api";
import AlertModal from "../../global/globalModal/AlertModal";
import CofirmModal from "../../global/globalModal/CofirmModal";
import Potal from "../../global/globalModal/Potal";

// ::: 상세페이지 조회 axios
const getPostDetail = async ({
  queryKey,
}: {
  queryKey: (string | undefined)[];
}) => {
  return await authInstance.get(`/api/post/${Number(queryKey[1])}`);
};

// ::: 상세페이지 삭제 axios
const deletePostDetail = async (postId: string | undefined) => {
  return await authInstance.delete(`/api/post/${Number(postId)}`);
};

const PostDetailContainer = () => {
  const { postId } = useParams<string>();
  const navigate = useNavigate();

  // 게시글 삭제시 뜨는 모달
  const [confirmModalOn, setConfirmModalOn] = useState(false);
  const [alertModalOn, setAlertModalOn] = useState(false);
  const [modalIcon, setModalIcon] = useState<
    "" | "success" | "warning" | "info"
  >("");
  const [alertMsg, setAlertMsg] = useState("");

  const onCloseModal = () => {
    setConfirmModalOn(false);
    setAlertModalOn(false);
  };

  const onClickYesConfirm = () => {
    mutate(postId);
    setConfirmModalOn(false);
  };
  const onClickYesAlert = () => {
    setConfirmModalOn(false);
    navigate(-1);
  };

  const onDeleteHandler = () => {
    setModalIcon("warning");
    setAlertMsg("정말 이 게시글을 삭제하시겠습니까?");
    setConfirmModalOn(true);
  };

  //스크롤 맨위로 올리는 함수
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const postDetailQuery = useQuery(["postDetail", postId], getPostDetail);

  const queryClient = useQueryClient();
  const { mutate } = useMutation(deletePostDetail, {
    onSuccess: () => {
      queryClient.invalidateQueries("postLists");
      setModalIcon("success");
      setAlertMsg("게시글 삭제가 완료되었습니다.");
      setAlertModalOn(true);
    },
  });

  if (postDetailQuery.isLoading) {
    return null;
  }

  const postDetail = postDetailQuery.data?.data.data[0];
  const targetTag = postDetail.tags[0].split("#")[1];

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
              onClick={() => onDeleteHandler()}
            />

            <RiEdit2Fill
              className="editButton"
              size="24"
              onClick={() => {
                navigate(`/updatePost/${postId}`);
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
      <RelatedList targetTag={targetTag} postId={postDetail.id} />

      <Potal>
        {confirmModalOn && (
          <CofirmModal
            onCloseModal={onCloseModal}
            modalIcon={modalIcon}
            alertMsg={alertMsg}
            onClickYes={onClickYesConfirm}
            onClickNo={onCloseModal}
          />
        )}
      </Potal>
      <Potal>
        {alertModalOn && (
          <AlertModal
            onCloseModal={onClickYesAlert}
            modalIcon={modalIcon}
            alertMsg={alertMsg}
            onClickYes={onClickYesAlert}
          />
        )}
      </Potal>
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
  white-space: pre-wrap;

  @media ${(props) => props.theme.mobile} {
    padding-left: 10px;
    padding-right: 10px;
  }
`;
