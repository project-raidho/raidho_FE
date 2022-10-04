import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

import CreatePostImage from "./CreatePostImage";

import { authInstance } from "../../shared/api";
import Button from "../../elements/Button";
import TagInput from "../../elements/TagInput";
import TextArea from "../../elements/TextArea";
import Potal from "../../global/globalModal/Potal";
import AlertModal from "../../global/globalModal/AlertModal";
const CreatePostContainer = () => {
  const navigate = useNavigate();
  const contentRef = useRef<HTMLHeadingElement>(null);

  // ::: 에러메세지(createPotal) 컨트롤 하기
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [modalIcon, setModalIcon] = useState<
    "success" | "warning" | "info" | ""
  >("");
  const [alertMsg, setAlertMsg] = useState<string>("");
  const onCloseModal = () => {
    setModalOn(false);
  };
  const onClickYes = () => {
    setModalOn(!modalOn);
  };

  // ::: 입력된 데이터 취합하기
  const [postImages, setPostImages] = useState<Blob[]>([]);
  const [postContent, setpostContent] = useState<string>("");
  const [postTags, setPostTags] = useState<string[]>([]);

  // ::: 유효성 검사 메시지 상태관리하기
  const [validationImages, setValidationImages] = useState<string>("");
  const [validationContent, setValidationContent] = useState<string>("");
  const [validationTags, setValidationTags] = useState<string>("");

  const selectedPostImages = (images: Blob[]) => {
    setPostImages(images);
  };

  const typedPostContent = (text: string) => {
    setpostContent(text);
  };

  const selectedTags = (tags: string[]) => {
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

    if (
      postImages.length === 0 ||
      postContent === "" ||
      postContent.length < 10 ||
      postTags.length === 0
    ) {
      setModalIcon("info");
      setAlertMsg("내용을 모두 입력해주세요.");
      setModalOn(true);
      return;
    }

    // ::: 입력이 다 되었다면, 서버 전송
    if (postImages.length > 0 && postContent !== "" && postTags.length > 0) {
      const formData = new FormData();
      const fileName = "raidho_image_" + new Date().getMilliseconds() + ".jpeg";

      for (const image of postImages) {
        formData.append("imgUrl", image, fileName);
      }
      for (const tag of postTags) {
        formData.append("tags", tag);
      }
      formData.append("content", postContent);

      try {
        const response = await authInstance.post(`/api/post`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        navigate(`/postdetail/${response.data.data.data}`);
        return response;
      } catch (error) {
        setModalIcon("warning");
        setAlertMsg(
          `게시글을 등록하는 데 오류가 났습니다. 오류 메시지 : ${error}`
        );
        setModalOn(true);
      }
    }
  };

  // eslint-disable-next-line
  const [scrollY, setScrollY] = useState<number>(0); // 스크롤값을 저장하기 위한 상태
  const handleFollow = () => {
    setScrollY(window.pageYOffset);
  };

  const handleTop = (status: boolean) => {
    const contentTop = contentRef.current?.offsetTop;
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: status ? 0 : contentTop,
      behavior: "smooth",
    });
    setScrollY(0);
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", handleFollow);
    };
    watch();
    return () => {
      window.removeEventListener("scroll", handleFollow);
    };
  });

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
    onSuccess: () => {
      queryClient.invalidateQueries(["postLists"]);
    },
  });

  return (
    <StCreatePostContainer>
      <StStepTitle>
        이미지 업로드 <span>*</span>
      </StStepTitle>
      <CreatePostImage
        selectedPostImages={selectedPostImages}
        handleTop={(status: boolean) => handleTop(status)}
      />
      <StValidationMessage>{validationImages}</StValidationMessage>
      <StStepTitle ref={contentRef}>
        내용 <span>*</span>
      </StStepTitle>
      <TextArea
        typedPostContent={typedPostContent}
        placeholderText={"여행에서 경험한 내용을 작성해주세요."}
        initialContent=""
        ValRedMsg={validationContent}
      />

      <StStepTitle>
        태그 <span>*</span>
      </StStepTitle>
      <TagInput
        selectedTags={selectedTags}
        tags={[]}
        tagMassage={"엔터키를 치시면 태그가 입력됩니다."}
        tagValMsg={validationTags}
        tagStatus={true}
      />
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
        <Button size="medium" variant="linePrimary" onClick={() => mutate()}>
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
    </StCreatePostContainer>
  );
};

export default CreatePostContainer;

const StCreatePostContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 1rem;

  @media (max-width: 1023px) {
    padding: 0 1rem;
  }
`;

const StStepTitle = styled.h2`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 1.2rem;
  margin-bottom: 0.8rem;
  span {
    font-size: 0.9rem;
    color: var(--main-color);
    margin-top: 10px;
    margin-left: 3px;
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

const StValidationMessage = styled.p`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  font-size: 1rem;
  color: var(--red-color);
  margin-bottom: 1rem;

  @media ${(props) => props.theme.mobile} {
    font-size: 0.9rem;
  }
`;
