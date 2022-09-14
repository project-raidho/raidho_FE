import React, { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import CreatePostImage from "./CreatePostImage";
import CreatePostContent from "./CreatePostContent";
import CreatePostTags from "./CreatePostTags";
import Modal from "../../global/globalModal/Modal";
import Potal from "../../global/globalModal/Potal";
import Button from "../../elements/Button";
import styled from "styled-components";
import { formDataInstance } from "../../shared/api";

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
  const [postLocationTags, setPostLocationTags] = useState([]);

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

  const locationTags = (tags) => {
    console.log("location", tags);
    setPostLocationTags(tags);
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
    formData.append("locationTags", postLocationTags);

    console.log(":: here postImages::");
    console.log(postImages);

    try {
      const postResponse = await formDataInstance.post(`/api/post`, formData);
      console.log("postResponse ====>", postResponse.data);
    } catch (error) {
      console.log("게시글 등록 데이터 전송 오류가 났습니다!", error);
      setModalOn(!modalOn);
    }
  };

  // try {
  //   const postResponse = await formDataInstance.post(`/api/post`, formData);
  //   console.log("postResponse ====>", postResponse.data);
  // }

  // try {
  //   const token = localStorage.getItem("Authorization");
  //   const postResponse = await axios.post(
  //     `https://wjsxogns.shop/api/post`,
  //     formData,
  //     {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: token,
  //       },
  //     }
  //   );
  //   console.log("postResponse ====>", postResponse.data);
  // }

  return (
    <StCreatePostContainerWrap>
      <StStepTitle>
        <strong>STEP 1</strong>이미지 업로드 하기
      </StStepTitle>
      <CreatePostImage selectedPostImages={selectedPostImages} />
      <StStepTitle>
        <strong>STEP 2</strong>여행에서 경험한 내용 입력하기
      </StStepTitle>
      <CreatePostContent typedPostContent={typedPostContent} />

      <StStepTitle>
        <strong>STEP 3</strong>위치 입력하기
      </StStepTitle>
      <CreatePostTags
        selectedTags={locationTags}
        tags={[]}
        tagMassage={"위치를 입력해주세요!"}
      />

      <StStepTitle>
        <strong>STEP 4</strong>태그 입력하기
      </StStepTitle>
      <CreatePostTags
        selectedTags={selectedTags}
        tags={[]}
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
        <Button size="small" onClick={onCreatePost}>
          등록
        </Button>
      </StButtonWrap>
      <Potal>
        {modalOn && (
          <Modal onClose={handleModal}>
            <StErrorMessage>
              죄송합니다. <br />
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

  @media (max-width: 1023px) {
  }
  @media (max-width: 767px) {
  }
  @media (max-width: 639px) {
  }
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
    font-size: 1.7rem;
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
