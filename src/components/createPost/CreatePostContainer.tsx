import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CreatePostImage from './CreatePostImage';
import CreatePostContent from './CreatePostContent';
import CreatePostTags from './CreatePostTags';
import Modal from '../../global/globalModal/Modal';
import Potal from '../../global/globalModal/Potal';
import Button from '../../elements/Button';

function CreatePostContainer() {
  const navigate = useNavigate();

  const locationTagMessage = '위치를 입력해주세요!';
  const postTagMessage = '태그를 입력해주세요!';

  // ::: 에러메세지(createPotal) 컨트롤 하기
  const [modalOn, setModalOn] = useState(false);
  const handleModal = () => {
    setModalOn(!modalOn);
  };

  // ::: 입력된 데이터 취합하기
  const [postImages, setPostImages] = useState<Blob[]>([]);
  const [postContent, setpostContent] = useState<string>('');
  const [postTags, setPostTags] = useState<string[]>([]);
  const [postLocationTags, setPostLocationTags] = useState<string[]>([]);

  const selectedPostImages = (images: Blob[]) => {
    setPostImages(images);
  };
  const typedPostContent = (text: string) => {
    setpostContent(text);
  };

  const selectedTags = (tags: string[]) => {
    setPostTags(tags);
  };

  const locationTags = (tags: string[]) => {
    setPostLocationTags(tags);
  };

  const URI = process.env.REACT_APP_BASE_URI;
  // ::: 서버전송세팅
  const onCreatePost = async () => {
    try {
      const postResponse = await axios.post(
        `${URI}/api/post`,
        {
          file: postImages,
          content: postContent,
          tags: postTags,
          locationTags: postLocationTags,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: localStorage.getItem('Authorization'),
          },
        },
      );
      console.log('postResponse', postResponse.data);
    } catch (error) {
      console.log('게시글 등록 데이터 전송 오류가 났습니다!', error);
      setModalOn(!modalOn);
    }
  };

  return (
    <StCreatePostContainerWrap>
      <StCreatePostColumn>
        <StStepTitle>이미지 업로드 하기</StStepTitle>
        <CreatePostImage selectedPostImages={selectedPostImages} />
      </StCreatePostColumn>
      <StCreatePostColumn>
        <StStepTitle>여행에서 경험한 내용 입력하기</StStepTitle>
        <CreatePostContent typedPostContent={typedPostContent} />

        <StStepTitle>다녀온 곳 입력하기</StStepTitle>
        <CreatePostTags selectedTags={locationTags} tags={['서울']} tagMassage={locationTagMessage} />

        <StStepTitle>태그 입력하기</StStepTitle>
        <CreatePostTags selectedTags={selectedTags} tags={['자전거여행']} tagMassage={postTagMessage} />
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
      </StCreatePostColumn>
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
}

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
