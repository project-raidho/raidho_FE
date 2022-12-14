import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

import PostDetailImg from "../postDetail/PostDetailImg";

import { authInstance } from "../../shared/api";
import Button from "../../elements/Button";
import TextArea from "../../elements/TextArea";
import TagInput from "../../elements/TagInput";
import Potal from "../../global/globalModal/Potal";
import AlertModal from "../../global/globalModal/AlertModal";

interface PostDetailProps {
  id: string;
  content: string;
  multipartFiles: string[];
  tags: string[];
  locationTags: string[];
  heartCount: number;
  isHeartMine: boolean;
  isMine: boolean;
  memberId: number;
  memberImage: string;
  memberName: string;
}

const UpdatePostContainer = () => {
  const navigate = useNavigate();

  const [postDetail, setPostDetail] = useState<PostDetailProps>({
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
  const [postContent, setPostContent] = useState<string>(postDetail.content);
  const [postTags, setPostTags] = useState<string[]>(postDetail.tags);

  // ::: 유효성 검사 메시지 상태관리하기
  const [validationContent, setValidationContent] = useState<string>("");
  const [validationTags, setValidationTags] = useState<string>("");

  // // ::: 게시글 아이디
  const postId = useParams().postId;

  // ::: 에러메세지(createPotal) 컨트롤 하기
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [modalIcon, setModalIcon] = useState<
    "success" | "warning" | "info" | ""
  >("");
  const [alertMsg, setAlertMsg] = useState<string>("");

  const onCloseModal = () => {
    setModalOn(!modalOn);
  };
  const typedPostContent = (text: string) => {
    setPostContent(text);
  };

  const selectedTags = (tags: string[]) => {
    setPostTags(tags);
  };

  // ::: 서버전송세팅
  const onUpdatePost = async () => {
    // ::: 유효성 검사
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
    if (postContent !== "" && postTags.length > 0) {
      // ::: 변경내용이 없으면 반려하기
      if (postContent === postDetail.content && postTags === postDetail.tags) {
        setAlertMsg("변경한 내용이 없습니다.");
        setModalIcon("info");
        setModalOn(true);
        return;
      }

      const formData = new FormData();
      formData.append("content", postContent);
      for (const tag of postTags) {
        formData.append("tags", tag);
      }

      await authInstance.put(`/api/post/${postId}`, formData);

      navigate(`/postdetail/${postId}`);
    }
  };

  const getPostDetail = async (postId: string | undefined) => {
    try {
      const responsePostDetail = await authInstance.get(`/api/post/${postId}`);

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

  // ::: 입력여부에 따른 유효성검사
  useEffect(() => {
    if (postContent !== "") {
      if (postContent.length < 10) {
        setValidationContent("내용을 최소 10자 이상 작성해주세요.");
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
  }, [postContent, postTags]);

  const queryClient = useQueryClient();
  const { mutate } = useMutation(onUpdatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("postDetail");
    },
    onError: () => {
      setModalIcon("warning");
      setAlertMsg("게시글 수정 데이터 전송 오류가 났습니다!");
      setModalOn(true);
    },
  });

  return (
    <StUpdatePostContainer>
      <StCreatePostColumn>
        <StStepTitle>이미지 확인</StStepTitle>
        <PostDetailImg images={postDetail.multipartFiles} />
      </StCreatePostColumn>
      <StCreatePostColumn>
        <StStepTitle>내용</StStepTitle>
        <TextArea
          typedPostContent={typedPostContent}
          initialContent={postDetail.content}
          placeholderText={"여행에서 경험한 내용을 입력해주세요."}
          ValRedMsg={""}
        />
        <StValidationMessage>{validationContent}</StValidationMessage>

        <StStepTitle>태그</StStepTitle>
        <TagInput
          selectedTags={selectedTags}
          tags={postDetail.tags}
          tagMassage={"엔터키를 치시면 입력됩니다."}
          tagStatus={true}
          tagValMsg={validationTags}
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
      </StCreatePostColumn>
      <Potal>
        {modalOn && (
          <AlertModal
            onCloseModal={onCloseModal}
            modalIcon={modalIcon}
            alertMsg={alertMsg}
            onClickYes={onCloseModal}
          />
        )}
      </Potal>
    </StUpdatePostContainer>
  );
};

export default UpdatePostContainer;

const StUpdatePostContainer = styled.div`
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
  font-size: 1.1rem;
  color: var(--red-color);
  margin-bottom: 1rem;

  @media (max-width: 639px) {
    font-size: 1rem;
  }
`;
