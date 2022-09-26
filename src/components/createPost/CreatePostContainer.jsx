import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { authInstance } from "../../shared/api";
import CreatePostImage from "./CreatePostImage";
import ContentTextArea from "../../elements/ContentTextArea";
import TagInput from "../../elements/TagInput";
import AlertModal from "../../global/globalModal/AlertModal";
import Potal from "../../global/globalModal/Potal";
import Button from "../../elements/Button";
import styled from "styled-components";

const CreatePostContainer = () => {
  const navigate = useNavigate();

  // ::: 에러메세지(createPotal) 컨트롤 하기
  const [modalOn, setModalOn] = useState(false);
  const [modalIcon, setModalIcon] = useState("");
  // const [checkNext, setCheckNext] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const onCloseModal = () => {
    setModalOn(!modalOn);
  };
  const onClickYes = () => {
    setModalOn(!modalOn);
  };

  // ::: 입력된 데이터 취합하기
  const [postImages, setPostImages] = useState([]);
  const [postContent, setpostContent] = useState("");
  const [postTags, setPostTags] = useState([]);

  // ::: 유효성 검사 메시지 상태관리하기
  const [validationImages, setValidationImages] = useState("");
  const [validationContent, setValidationContent] = useState("");
  const [validationTags, setValidationTags] = useState("");

  const selectedPostImages = (images) => {
    setPostImages(images);
  };

  const typedPostContent = (text) => {
    setpostContent(text);
  };

  const selectedTags = (tags) => {
    setPostTags(tags);
  };

  // ::: 서버전송
  const onCreatePost = async () => {
    // ::: 유효성 검사
    if (postImages.length === 0) {
      setValidationImages("이미지를 등록해주세요.");
    }
    if (postContent === "") {
      setValidationContent("내용을 입력해주세요.");
    }
    if (postContent.length < 10) {
      setValidationContent("내용을 최소 10자 이상 입력해주세요.");
    }
    if (postTags.length === 0) {
      setValidationTags("태그를 입력해주세요.");
    }

    // ::: 입력이 다 되었다면, 서버 전송
    if (postImages.length > 0 && postContent !== "" && postTags.length > 0) {
      const formData = new FormData();
      const fileName = "raidho_image_" + new Date().getMilliseconds() + ".jpeg";

      for (const image of postImages) {
        formData.append("imgUrl", image, fileName);
      }
      formData.append("content", postContent);
      formData.append("tags", postTags);

      try {
        const response = await authInstance.post(`/api/post`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("response 게시글 아이디 ====>", response.data.data.data);
        navigate(`/postdetail/${response.data.data.data}`);
        return response;
      } catch (error) {
        console.log("게시글 등록 데이터 전송 오류가 났습니다!", error);
        setModalIcon("warning");
        setAlertMsg("게시글을 등록하는 데 오류가 났습니다.");
        setModalOn(true);
      }
    }
  };

  // ::: 입력여부에 따른 유효성검사
  useEffect(() => {
    if (postImages.length > 0) {
      setValidationImages("");
    }
    if (postContent !== "") {
      if (postImages.length === 0) {
        setValidationImages("이미지를 등록해주세요.");
      }
      if (postContent.length < 10) {
        return setValidationContent("내용을 최소 10자 이상 작성해주세요.");
      }
      setValidationContent("");
    }
    if (postTags.length > 0) {
      if (postContent === "") {
        setValidationContent("내용을 입력해주세요.");
      } else if (postContent.length < 10) {
        setValidationContent("내용을 최소 10자 이상 작성해주세요.");
      }
      setValidationTags("");
    }
    // eslint-disable-next-line
  }, [postImages, postContent, postTags]);

  const queryClient = useQueryClient();
  const { mutate } = useMutation(onCreatePost, {
    onSuccess: (data) => {
      console.log("여행후기 게시글 등록 데이터 :::", data);
      queryClient.invalidateQueries(["postLists"]);
    },
  });

  return (
    <StCreatePostContainerWrap>
      <StStepTitle>이미지 업로드</StStepTitle>
      <CreatePostImage
        selectedPostImages={selectedPostImages}
        setValidationImages={setValidationImages}
      />
      <StValidationMessage>{validationImages}</StValidationMessage>
      <StStepTitle>내용</StStepTitle>
      <ContentTextArea
        typedPostContent={typedPostContent}
        placeholderText={"여행에서 경험한 내용을 작성해주세요."}
        initialContent=""
      />
      <StValidationMessage>{validationContent}</StValidationMessage>
      <StStepTitle>태그</StStepTitle>
      <TagInput
        selectedTags={selectedTags}
        tags={[]}
        tagMassage={"태그를 입력해주세요. 엔터키를 치시면 태그가 입력됩니다."}
      />
      <StValidationMessage>{validationTags}</StValidationMessage>
      <StButtonWrap>
        <Button
          size="medium"
          variant="lineGray"
          onClick={() => {
            navigate(-1);
          }}
        >
          취소
        </Button>
        <Button size="medium" variant="linePrimary" onClick={mutate}>
          등록
        </Button>
      </StButtonWrap>
      <Potal>
        {modalOn && (
          <AlertModal
            onCloseModal={onCloseModal}
            modalIcon={modalIcon}
            alertMsg={alertMsg}
            onClickYes={onClickYes}
          />
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
  padding-top: 1.2rem;
  margin-bottom: 0.8rem;
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

const StValidationMessage = styled.p`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  font-size: 1rem;
  color: var(--red-color);
  margin-bottom: 1rem;

  @media (max-width: 639px) {
    font-size: 1rem;
  }
`;
