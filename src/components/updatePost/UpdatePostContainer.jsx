import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContentTextArea from "../../elements/ContentTextArea";
import UpdatePostTags from "./UpdatePostTags";
import Modal from "../../global/globalModal/Modal";
import Potal from "../../global/globalModal/Potal";
import Button from "../../elements/Button";

import PostDetailImg from "../postDetail/PostDetailImg";
import styled from "styled-components";
import { authInstance } from "../../shared/api";

const UpdatePostContainer = () => {
  const [postDetail, setPostDetail] = useState({
    id: "",
    content: "",
    multipartFiles: [],
    tags: [],
    locationTags: [],
    heartCount: 0,
    isHeartMine: false,
    isMine: true,
    memberId: 1,
    memberImage: "",
    memberName: "",
  });
  // ::: 입력된 데이터 취합하기
  const [postContent, setPostContent] = useState(postDetail.content);
  const [postTags, setPostTags] = useState(postDetail.tags);

  const navigate = useNavigate();

  // // ::: 게시글 아이디
  const postId = useParams().postId;

  // ::: 에러메세지(createPotal) 컨트롤 하기
  const [modalOn, setModalOn] = useState(false);
  const handleModal = () => {
    setModalOn(!modalOn);
  };

  const typedPostContent = (text) => {
    setPostContent(text);
  };

  const selectedTags = (tags) => {
    setPostTags(tags);
  };

  console.log(postContent, postTags, "<======");
  // ::: 서버전송세팅
  const onUpdatePost = async () => {
    const formData = new FormData();
    formData.append("content", postContent);
    formData.append("tags", postTags);

    try {
      const postUpdateResponse = await authInstance.put(
        `/api/post/${postId}`,
        formData
      );
      console.log("postResponse", postUpdateResponse.data);
      navigate(-1);
    } catch (error) {
      console.log("게시글 수정 데이터 전송 오류가 났습니다!", error);
      setModalOn(!modalOn);
    }
  };

  const getPostDetail = async (postId) => {
    try {
      const responsePostDetail = await authInstance.get(`/api/post/${postId}`);
      console.log(responsePostDetail.data);
      setPostDetail(responsePostDetail.data.data[0]);
    } catch (error) {
      console.log(
        "게시글 수정 페이지 - 상세 게시글 조회 에러 안내 ::: ",
        error
      );
    }
  };
  // ::: 게시글 상세 내용 불러오기
  useEffect(() => {
    getPostDetail(postId);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setPostContent(postDetail.content);
    setPostTags(postDetail.tags);
  }, [postDetail]);
  return (
    <StCreatePostContainerWrap>
      <StCreatePostColumn>
        <StStepTitle>
          <strong>STEP 1</strong> 이미지 확인
        </StStepTitle>
        <PostDetailImg images={postDetail.multipartFiles} />
      </StCreatePostColumn>
      <StCreatePostColumn>
        <StStepTitle>
          <strong>STEP 2</strong> 여행에서 경험한 내용
        </StStepTitle>
        <ContentTextArea
          typedPostContent={typedPostContent}
          initialContent={postDetail.content}
          placeholderText={"경험을 소개해주세요."}
        />

        <StStepTitle>
          <strong>STEP 3</strong> 태그
        </StStepTitle>
        <UpdatePostTags
          selectedTags={selectedTags}
          tags={postDetail.tags}
          tagMassage={"엔터키를 치시면 입력됩니다."}
        />
        <StButtonWrap>
          <Button
            size="small"
            variant="gray"
            onClick={() => {
              navigate(-1);
            }}
          >
            취소
          </Button>
          <Button size="small" onClick={onUpdatePost}>
            등록
          </Button>
        </StButtonWrap>
      </StCreatePostColumn>
      <Potal>
        {modalOn && (
          <Modal onClose={handleModal}>
            <StErrorMessage>
              죄송합니다. <br />
              게시글을 수정하는 데 오류가 났습니다. <br />
              다시 한 번 시도해주세요.
            </StErrorMessage>
            <StButtonWrap>
              <Button size="medium" onClick={handleModal}>
                다시 수정하기
              </Button>
            </StButtonWrap>
          </Modal>
        )}
      </Potal>
    </StCreatePostContainerWrap>
  );
};

export default UpdatePostContainer;

const StCreatePostContainerWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (max-width: 1023px) {
    flex-direction: column;
  }
  @media (max-width: 767px) {
  }
  @media (max-width: 639px) {
  }
`;
const StCreatePostColumn = styled.div`
  width: 100%;
  padding: 1rem;
`;

const StStepTitle = styled.h2`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.7rem;
  padding-top: 1.2rem;
  margin-bottom: 1.5rem;

  strong {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    line-height: 1;
    color: #000;
    background-color: var(--gray-color);
    border-radius: 5px;
    border: 1px solid #000;
    margin-right: 0.7rem;
    padding: 0.5rem 0.7rem;
  }
`;

const StButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  width: 100%;

  button {
    margin-left: 10px;
  }
`;

const StErrorMessage = styled.div`
  width: 100%;
  height: 150px;
  font-size: 1.2rem;
  line-height: 1.5;
`;
