import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { authInstance } from "../../shared/api";
import CreatePostImage from "./CreatePostImage";
import CreatePostContent from "./CreatePostContent";
import TagInput from "../../elements/TagInput";
import Modal from "../../global/globalModal/Modal";
import Potal from "../../global/globalModal/Potal";
import Button from "../../elements/Button";
import styled from "styled-components";

const CreatePostContainer = () => {
  const navigate = useNavigate();

  // ::: 에러메세지(createPotal) 컨트롤 하기
  const [modalOn, setModalOn] = useState(false);
  const handleModal = () => {
    setModalOn(!modalOn);
  };

  // ::: 입력된 데이터 취합하기
  const [postImages, setPostImages] = useState();
  const [postContent, setpostContent] = useState("");
  const [postTags, setPostTags] = useState([]);

  const selectedPostImages = (images) => {
    console.log("selectedPostImages", images.target);
    setPostImages(images);
  };

  const typedPostContent = (text) => {
    console.log("typedPostContent", text);
    setpostContent(text);
  };

  const selectedTags = (tags) => {
    console.log(tags);
    setPostTags(tags);
  };

  // ::: 서버전송세팅
  const onCreatePost = async () => {
    const formData = new FormData();
    const fileName = "raidho_image_" + new Date().getMilliseconds() + ".jpeg";

    for (const image of postImages) {
      formData.append("imgUrl", image, fileName);
    }
    formData.append("content", postContent);
    formData.append("tags", postTags);

    try {
      const postResponse = await authInstance.post(`/api/post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("postResponse ====>", postResponse.data);
      navigate(-1);
      return postResponse;
    } catch (error) {
      console.log("게시글 등록 데이터 전송 오류가 났습니다!", error);
      setModalOn(!modalOn);
    }
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation(onCreatePost, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries("postLists");
    },
  });

  // const { mutate } = useMutation(onCreatePost, {
  //   onSuccess: (data) => {
  //     queryClient.setQueryData("postLists", (oldData) => {
  //       if (!oldData) {
  //         return [];
  //       }

  //       return [{ isHeartMine: false, multipartFiles: postImages }, ...oldData];
  //     });
  //   },
  // });

  return (
    <StCreatePostContainerWrap>
      <StStepTitle>
        <strong>STEP 1</strong>이미지 업로드
      </StStepTitle>
      <CreatePostImage selectedPostImages={selectedPostImages} />
      <StStepTitle>
        <strong>STEP 2</strong>여행에서 경험한 내용
      </StStepTitle>
      <CreatePostContent
        typedPostContent={typedPostContent}
        placeholderText={"경험을 소개해주세요."}
      />
      <StStepTitle>
        <strong>STEP 3</strong>태그
      </StStepTitle>
      <TagInput
        selectedTags={selectedTags}
        tags={[]}
        tagMassage={"엔터키를 치시면 태그가 입력됩니다."}
      />
      <StButtonWrap>
        <Button
          size="squareTheme"
          variant="gray"
          onClick={() => {
            navigate(-1);
          }}
        >
          취소
        </Button>
        <Button size="squareTheme" variant="lineBlue" onClick={mutate}>
          등록
        </Button>
      </StButtonWrap>
      <Potal>
        {modalOn && (
          <Modal onClose={handleModal}>
            <StErrorMessage>
              게시글을 등록하는 데 오류가 났습니다. <br />
              다시 한 번 시도해주세요.
            </StErrorMessage>
            <StButtonWrap>
              <Button size="medium" onClick={handleModal}>
                다시 등록하러 가기
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
  flex-direction: column;
  width: 100%;
  padding-bottom: 10rem;
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
