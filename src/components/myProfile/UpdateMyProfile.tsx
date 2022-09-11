import React, { useState } from 'react';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import styled from 'styled-components';
import Button from '../../elements/Button';
import Input from '../../elements/Input';
import Potal from '../../global/globalModal/Potal';
import Modal from '../../global/globalModal/Modal';

function UpdateMyProfile() {
  // ::: 유저 정보 샘플
  const userInfo = {
    userName: 'yoojin',
    userProfileImage:
      'https://avatars.githubusercontent.com/u/99028253?s=400&u=678da99d93c1eab91489f73b080993fb689c56b4&v=4',
    userComment: '나는 개발을 사랑한다.',
  };

  const [selectedPostImage, setSelectedPostImage] = useState(null);
  const [compressedImageFile, setCompressedImageFile] = useState(null);
  const [updateNickname, setUpdateNickname] = useState(userInfo.userName);
  const [updateComment, setUpdateComment] = useState(userInfo.userComment);

  // ::: 프로필 편집 모달(createPotal) 컨트롤 하기
  const [modalOn, setModalOn] = useState(false);
  const handleModal = () => {
    setModalOn(!modalOn);

    // ::: 유저가 입력한 값 초기화 시키기
    setSelectedPostImage(null);
    setCompressedImageFile(null);
    setUpdateNickname(userInfo.userName);
    setUpdateNickname(userInfo.userComment);
  };

  // ::: 이미지 리사이징(Resizing)
  const compressImageAndGetImageFile = async (postImageFile) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    const compressedFile = await imageCompression(postImageFile, options);
    return compressedFile;
  };

  // ::: 이미지 미리보기(Image Preview)
  const onChangePostImageFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const postImageFile = event.target.files[0];
    try {
      const compressedFile = await compressImageAndGetImageFile(postImageFile);
      setCompressedImageFile(compressedFile);
      const finalCompressedImage = await imageCompression.getDataUrlFromFile(compressedFile);
      setSelectedPostImage(finalCompressedImage);
    } catch (error) {
      console.log('__PostImage_uploadImageError ::', error);
      alert('이미지를 업로드 하는데 문제가 생겼습니다. 다시 시도해주세요!');
    }
  };

  const onChangeUpdateUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateNickname(event.target.value);
  };
  const onChangeUpdateUserComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateComment(event.target.value);
  };

  console.log('compressedImageFile', compressedImageFile);
  console.log('updateNickname', updateNickname);
  console.log('updateComment', updateComment);

  // ::: 수정 정보 서버에 전달하기
  const onCompleteUpdateProfile = async () => {
    // :: 서버 주소
    const URI = process.env.REACT_APP_BASE_URI;
    const USER = {
      AUTHORIZATION: localStorage.getItem('Authorization'),
    };
    // :: image file formData 형식 변환
    const form = new FormData();
    form.append('file', compressedImageFile);

    try {
      const profileResponse = await axios.put(
        `${URI}/member/update`,
        {
          memberImage: form,
          memberName: updateNickname,
          memberComment: updateComment,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: USER.AUTHORIZATION,
          },
        },
      );

      console.log(profileResponse);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <StUpdateMyProfileWrap>
      <StMyProfileBox>
        <p>
          <img src={userInfo.userProfileImage} alt={userInfo.userName} />
        </p>
        <dl>
          <dt>{userInfo.userName}</dt>
          <dd>{userInfo.userComment}</dd>
        </dl>
      </StMyProfileBox>
      <Button onClick={handleModal} size="square" variant="lineSquare">
        프로필 편집
      </Button>

      <Potal>
        {modalOn && (
          <Modal onClose={handleModal}>
            <StUpdateUserProfileModal>
              <StUpdateUserProfileTitle>프로필 이미지</StUpdateUserProfileTitle>
              <StUserProfileImageBox userImageProfile={`url(${userInfo.userProfileImage})`}>
                <span className="changeImageMessage">사진변경</span>
                <input
                  type="file"
                  style={{ display: 'none' }}
                  onChange={onChangePostImageFile}
                  accept="image/jpg, image/jpeg, image/png"
                />
                {selectedPostImage && (
                  <img
                    src={selectedPostImage}
                    alt="preview"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                )}
              </StUserProfileImageBox>
              <StUpdateUserProfileTitle>닉네임</StUpdateUserProfileTitle>
              <Input
                size="large"
                variant="default"
                placeholder={userInfo.userName}
                onChange={(event) => onChangeUpdateUserName(event)}
              />
              <StUpdateUserProfileTitle>한 줄 소개</StUpdateUserProfileTitle>
              <Input
                size="large"
                variant="default"
                placeholder={userInfo.userComment}
                onChange={(event) => onChangeUpdateUserComment(event)}
              />
              <StButtonWrap>
                <Button size="small" onClick={handleModal}>
                  취소
                </Button>
                <Button size="small" onClick={onCompleteUpdateProfile}>
                  수정
                </Button>
              </StButtonWrap>
            </StUpdateUserProfileModal>
          </Modal>
        )}
      </Potal>
    </StUpdateMyProfileWrap>
  );
}

export default UpdateMyProfile;

const StUpdateMyProfileWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 120px;
  background-color: var(--bg-color);
`;

const StMyProfileBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;

  p {
    width: 120px;
    height: 120px;
    border: 1px solid var(--gray-color);
    border-radius: 50%;
    margin-right: 35px;
    overflow: hidden;
    object-fit: contain;

    img {
      width: 100%;
      height: 100%;
    }
  }

  dl {
    dt {
      display: flex;
      align-items: center;
      height: 54px;
      font-size: 2.25rem;
    }
    dd {
      display: flex;
      align-items: flex-start;
      height: 66px;
      font-size: 1.5rem;
    }
  }
`;

const StButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
`;

const StUpdateUserProfileTitle = styled.h2`
  font-size: 1.5rem;
  text-align: left;
  margin: 1rem 0;
`;

const StUpdateUserProfileModal = styled.div`
  width: 100%;
`;

const StUserProfileImageBox = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 170px;
  height: 170px;
  background-image: linear-gradient(0deg, rgba(71, 71, 71, 0.57), rgba(71, 71, 71, 0.57)),
    ${(props) => props.userImageProfile && props.userImageProfile};
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  overflow: hidden;

  .changeImageMessage {
    position: absolute;
    z-index: -1;
  }
`;
