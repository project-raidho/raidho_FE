import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import UpdatePostContent from "./UpdatePostContent";
import UpdatePostTags from "./UpdatePostTags";
import Modal from "../../global/globalModal/Modal";
import Potal from "../../global/globalModal/Potal";
import Button from "../../elements/Button";
import PostDetailImage from "../postDetail/postDetailImage";
import styled from "styled-components";

const CreatePostContainer = () => {
  const postDetail = useSelector((state) => state.postSlice.postList);
  //const [postDetail, setPostDetail] = useState(postDetailList);
  // ::: 입력된 데이터 취합하기
  const [postContent, setpostContent] = useState(postDetail.content);
  const [postTags, setPostTags] = useState(postDetail.tags);
  const [postLocationTags, setPostLocationTags] = useState(
    postDetail.locationTags
  );

  const navigate = useNavigate();
  const URI = process.env.REACT_APP_BASE_URI;
  const UserToken = localStorage.getItem("Authorization");

  // ::: 게시글 아이디
  const postId = useParams().postId;

  // ::: 에러메세지(createPotal) 컨트롤 하기
  const [modalOn, setModalOn] = useState(false);
  const handleModal = () => {
    setModalOn(!modalOn);
  };

  const typedPostContent = (text) => {
    console.log("typedPostContent", text);
    setpostContent(text);
  };

  const selectedTags = (tags) => {
    console.log(tags);
    setPostTags(tags);
  };

  const selectedLocationTags = (tags) => {
    console.log("location", tags);
    setPostLocationTags(tags);
  };

  // ::: 서버전송세팅
  const onUpdatePost = async () => {
    const formData = new FormData();

    // const jsonContent = JSON.stringify(postContent);
    // const jsonTags = JSON.stringify(postTags);
    // const jsonLocationTags = JSON.stringify(postLocationTags);

    // const blobContent = new Blob([jsonContent], { type: "application/json" });
    // const blobTags = new Blob([jsonTags], { type: "application/json" });
    // const blobLocationTags = new Blob([jsonLocationTags], {
    //   type: "application/json",
    // });

    formData.append("content", postContent);
    formData.append("tags", postTags);
    formData.append("locationTags", postLocationTags);

    try {
      const postUpdateResponse = await axios.put(
        `${URI}/api/post/${postId}`,
        {
          formData,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: UserToken,
          },
        }
      );
      console.log("postResponse", postUpdateResponse.data);
    } catch (error) {
      console.log("게시글 수정 데이터 전송 오류가 났습니다!", error);
      setModalOn(!modalOn);
    }
  };

  // ::: 게시글 상세 내용 불러오기
  useEffect(() => {
    // const getPostDetail = async () => {
    //   try {
    //     const responsePostDetail = await axios.get(`${URI}/api/post/${postId}`);
    //     console.log(responsePostDetail.data);
    //     setPostDetail(responsePostDetail.data);
    //   } catch (error) {
    //     console.log(
    //       "게시글 수정 페이지 - 상세 게시글 조회 에러 안내 ::: ",
    //       error
    //     );
    //   }
    // };
  }, []);

  return (
    <StCreatePostContainerWrap>
      <StCreatePostColumn>
        <StStepTitle>수정하실 게시글의 이미지를 확인하기</StStepTitle>
        <PostDetailImage images={postDetail.postImgs} />
      </StCreatePostColumn>
      <StCreatePostColumn>
        <StStepTitle>여행에서 경험한 내용을 수정하기</StStepTitle>
        <UpdatePostContent
          typedPostContent={typedPostContent}
          content={postDetail.content}
        />

        <StStepTitle>다녀온 곳 수정하기</StStepTitle>
        <UpdatePostTags
          selectedTags={selectedLocationTags}
          tags={postDetail.locationTags}
          tagMassage={"위치를 입력해주세요!"}
        />

        <StStepTitle>태그 수정하기</StStepTitle>
        <UpdatePostTags
          selectedTags={selectedTags}
          tags={postDetail.postTags}
          tagMassage={"태그를 입력해주세요!"}
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

export default CreatePostContainer;

const StCreatePostContainerWrap = styled.div`
  display: flex;
  flex-direction: row;
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
  font-size: 1.5rem;
  padding-top: 1.2rem;
  margin-bottom: 1rem;
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
