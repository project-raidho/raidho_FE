import React, { useState } from "react";
import Button from "../../elements/Button";
import Input from "../../elements/Input";
import Potal from "../../global/globalModal/Potal";
import Modal from "../../global/globalModal/Modal";
import styled from "styled-components";

const UpdateMyProfile = (props) => {

  // ::: 프로필 편집 모달(createPotal) 컨트롤 하기
  const [modalOn, setModalOn] = useState(false);
  const handleModal = () => {
    setModalOn(!modalOn);
  };

  // ::: 유저 정보 샘플
  const userInfo = {
    userName: "yoojin",
    userProfileImage: "https://avatars.githubusercontent.com/u/99028253?s=400&u=678da99d93c1eab91489f73b080993fb689c56b4&v=4",
    userComment: "나는 개발을 사랑한다.",
  }

  


  return(
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
      <Button
        onClick={handleModal}
        size="square" 
        variant="lineSquare"
      >
        프로필 편집
      </Button>

      <Potal>
        {modalOn && 
          <Modal onClose={handleModal}>
            <div>프로필 수정하기 폼이 들어가야 합니다~~!</div>
            <label>프로필 이미지</label>
            <p>
              <img src={userInfo.userProfileImage} alt={userInfo.userName} />
            </p>
            <label>닉네임</label>
            <Input 
              size="large"
              variant="default"
              placeholder={userInfo.userName}
            />
            <label>한 줄 소개</label>
            <Input 
              size="large"
              variant="default"
              placeholder={userInfo.userComment}
            />
          </Modal>
        }
      </Potal>
    </StUpdateMyProfileWrap>
  );
};

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