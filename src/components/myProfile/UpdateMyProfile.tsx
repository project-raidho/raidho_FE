import React, { useState } from "react";
import styled from "styled-components";

import { authInstance } from "../../shared/api";
import Button from "../../elements/Button";
import Input from "../../elements/Input";
import Potal from "../../global/globalModal/Potal";
import Modal from "../../global/globalModal/Modal";

import DefaultMemberImage from "../../assets/defaultProfileImage.svg";

const UpdateMyProfile = () => {
  // ::: 유저 정보 가져오기
  const memberInfo = {
    memberId: localStorage.getItem("memberId"),
    memberName: localStorage.getItem("memberName"),
    memberImage: localStorage.getItem("memberImage"),
    memberIntro: localStorage.getItem("memberIntro"),
  };
  if (memberInfo.memberImage === null) {
    memberInfo.memberImage = `${DefaultMemberImage}`;
  }
  if (memberInfo.memberIntro === null) {
    memberInfo.memberIntro = "";
  }
  if (memberInfo.memberName === null) {
    memberInfo.memberName = "";
  }

  const [compressedImageFile, setCompressedImageFile] = useState<File>();
  const [previewUpdateImage, setPreviewUpdateImage] = useState<
    string | ArrayBuffer
  >();
  const [updateNickname, setUpdateNickname] = useState("");
  const [updateComment, setUpdateComment] = useState("");

  // ::: 프로필 수정 글자수 제한
  const [nickNameLength, setNickNameLength] = useState(0);
  const [introLength, setIntroLength] = useState(0);

  // ::: 유효성 검사 메시지 상태관리하기
  const [validationAlert, setValidationAlert] = useState<string>();

  // ::: 프로필 편집 모달(createPotal) 컨트롤 하기
  const [modalOn, setModalOn] = useState(false);
  const handleModal = () => {
    setModalOn(!modalOn);

    // ::: 유저가 입력한 값 초기화 시키기

    setCompressedImageFile(undefined);
    setUpdateNickname("");
    setUpdateComment("");
    setValidationAlert("");
  };

  // ::: 이미지 미리보기(Image Preview)
  const onChangePostImageFile = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let reader = new FileReader();
    if (event.target.files === null) {
      return;
    }
    const postImageFile = event.target.files[0];
    setCompressedImageFile(postImageFile);
    if (postImageFile) {
      reader.readAsDataURL(postImageFile);
    }
    reader.onloadend = () => {
      const resultImage = reader.result;
      if (resultImage === null) {
        return;
      }

      setPreviewUpdateImage(resultImage);
    };
  };

  const onChangeUpdateMemberName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUpdateNickname(event.target.value);
    setNickNameLength(event.target.value.length);
  };

  const onChangeUpdateMemberComment = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUpdateComment(event.target.value);
    setIntroLength(event.target.value.length);
  };

  // ::: 수정 정보 서버에 전달하기
  const onCompleteUpdateProfile = async () => {
    if (
      compressedImageFile === null &&
      updateNickname === null &&
      updateComment === null
    ) {
      return setValidationAlert("변경된 내용이 없습니다.");
    }

    const finalNickname =
      updateNickname !== "" && updateNickname !== null
        ? updateNickname
        : memberInfo.memberName;
    const finalIntro =
      updateComment !== "" && updateComment !== null
        ? updateComment
        : memberInfo.memberIntro;

    // :: image file formData 형식 변환
    const formData = new FormData();

    if (compressedImageFile !== undefined) {
      const fileName =
        "raidho_member_image_" + new Date().getMilliseconds() + ".jpeg";
      formData.append("memberImage", compressedImageFile, fileName);
      if (finalNickname === null) {
        return;
      }
      if (finalIntro === null) {
        return;
      }
      formData.append("memberName", finalNickname);
      formData.append("memberIntro", finalIntro);
    } else {
      if (finalNickname === null) {
        return;
      }
      if (finalIntro === null) {
        return;
      }
      formData.append("memberName", finalNickname);
      formData.append("memberIntro", finalIntro);
    }

    try {
      const response = await authInstance.put(
        `/api/mypage/${memberInfo.memberId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      localStorage.setItem("memberImage", response.data);
      localStorage.setItem("memberName", finalNickname);
      localStorage.setItem("memberIntro", finalIntro);

      setModalOn(false);
    } catch (error) {
      alert(`프로필 수정에 오류가 났습니다. ${error}`);
      console.log(error);
    }
  };
  return (
    <StUpdateMyProfile>
      <StMyProfileBox>
        <p>
          <img src={memberInfo.memberImage} alt={"멤버이미지"} />
        </p>
        <ul>
          <li className="memberName">@{memberInfo.memberName}</li>
          <li className="memberIntro">{memberInfo.memberIntro}</li>
        </ul>
      </StMyProfileBox>
      <Button onClick={handleModal} size="square" variant="lineSquare">
        프로필 편집
      </Button>

      <Potal>
        {modalOn && (
          <Modal onClose={handleModal}>
            <StUpdateUserProfileModal>
              <StUpdateProfileTop>
                <StUpdateProfileRow>
                  <StMemberImageBox
                    userImageProfile={`url(${memberInfo.memberImage})`}
                  >
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={onChangePostImageFile}
                      accept="image/jpg, image/jpeg, image/png"
                    />
                    {previewUpdateImage !== undefined ? (
                      <img
                        src={previewUpdateImage as string}
                        alt="preview"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <span className="changeImageMessage">사진 변경</span>
                    )}
                  </StMemberImageBox>

                  <StMemberNicknameBox>
                    <StUpdateUserProfileTitle>닉네임</StUpdateUserProfileTitle>
                    <div className="inputProfileRow">
                      <Input
                        size="large"
                        variant="default"
                        value={updateNickname}
                        placeholder={memberInfo.memberName}
                        onChange={(event) => onChangeUpdateMemberName(event)}
                        maxLength={10}
                      />
                      <StValidationLength>
                        {nickNameLength}/10자
                      </StValidationLength>
                    </div>
                  </StMemberNicknameBox>
                </StUpdateProfileRow>

                <StUpdateUserProfileTitle>한 줄 소개</StUpdateUserProfileTitle>
                <div className="inputProfileRow">
                  <Input
                    size="large"
                    variant="default"
                    placeholder={memberInfo.memberIntro}
                    onChange={(event) => onChangeUpdateMemberComment(event)}
                    value={updateComment}
                    maxLength={50}
                  />
                  <StValidationLength>{introLength}/50자</StValidationLength>
                </div>
                <StValidationMessage>{validationAlert}</StValidationMessage>
              </StUpdateProfileTop>
              <StButtonWrap>
                <Button
                  size="square"
                  variant="lineSquare"
                  onClick={handleModal}
                >
                  취소
                </Button>
                <Button
                  size="square"
                  variant="lineSquare"
                  onClick={onCompleteUpdateProfile}
                >
                  저장
                </Button>
              </StButtonWrap>
            </StUpdateUserProfileModal>
          </Modal>
        )}
      </Potal>
    </StUpdateMyProfile>
  );
};

export default UpdateMyProfile;

const StUpdateMyProfile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-height: 120px;
  background-color: var(--bg-color);
  margin-top: 20px;

  button {
    width: 150px;
    font-size: 1.3rem;
  }

  @media (max-width: 639px) {
    height: 150px;
    align-items: flex-start;
    flex-direction: column;

    button {
      width: 130px;
      height: 38px;
      font-size: 1rem;
      margin: 0 auto;
      padding: 0.5rem 1rem;
    }
  }
`;

const StMyProfileBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  width: calc(100% - 120px);

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
      object-fit: cover;
    }
  }

  ul {
    width: calc(100% - 180px);
    li.memberName {
      display: flex;
      align-items: center;
      height: 54px;
      font-size: 2rem;
    }
    li.memberIntro {
      display: flex;
      align-items: flex-start;
      height: 66px;
      font-size: 1.2rem;
    }
  }

  @media (max-width: 639px) {
    width: 100%;
    p {
      width: 80px;
      height: 80px;
      margin-left: 1rem;
      margin-right: 1rem;
    }
    ul {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: end;
      width: calc(100% - 130px);
      height: 80px;

      li.memberName {
        height: 30px;
        font-size: 1.2rem;
      }
      li.memberIntro {
        width: 100%;
        height: auto;
        min-height: 20px;
        font-size: 0.9rem;
      }
    }
  }
`;

const StUpdateProfileTop = styled.div`
  width: 100%;
  height: 100%;
  .inputProfileRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;

    input {
      display: flex;
      width: calc(100% - 80px);
      font-size: 1rem;
    }
  }
  @media (max-width: 639px) {
    padding-top: 10px;
    .inputProfileRow {
      input {
        width: calc(100% - 60px);
        height: 36px;
        font-size: 0.9rem;
        border-radius: 30px;
      }
    }
  }
`;
const StButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin-top: 30px;

  button {
    margin-left: 1rem;
    font-size: 1.3rem;
  }

  @media (max-width: 639px) {
    margin-top: 0px;
    padding-right: 1rem;
    button {
      width: 70px;
      height: 30px;
      margin-left: 0.5rem;
    }
  }
`;

const StUpdateUserProfileTitle = styled.h2`
  font-size: 1.3rem;
  text-align: left;
  margin: 1rem 0;
  @media (max-width: 639px) {
    font-size: 1.1rem;
    margin: 0.5rem 0;
  }
`;

const StUpdateUserProfileModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 90%;
  padding: 1rem 3rem 1rem 1rem;

  @media (max-width: 639px) {
    padding: 0;
  }
`;

const StUpdateProfileRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 2rem;

  @media (max-width: 639px) {
    margin-bottom: 1rem;
  }
`;

const StMemberImageBox = styled.label<{ userImageProfile: string }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  background-image: linear-gradient(
      0deg,
      rgba(71, 71, 71, 0.8),
      rgba(71, 71, 71, 0.8)
    ),
    ${(props) => props.userImageProfile && props.userImageProfile};
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  margin-right: 20px;
  overflow: hidden;
  cursor: pointer;

  .changeImageMessage {
    font-size: 1.2rem;
    letter-spacing: 1px;
    color: #fff;
  }
  @media (max-width: 639px) {
    width: 80px;
    height: 80px;

    .changeImageMessage {
      font-size: 1rem;
    }
  }
`;

const StMemberNicknameBox = styled.div`
  width: calc(100% - 170px);

  p {
    width: 100%;
    font-size: 1.5rem;
    text-align: left;
  }
  input {
    font-size: 1.2rem;
  }
  @media (max-width: 639px) {
    width: calc(100% - 100px);

    input {
      font-size: 1rem;
      border-radius: 30px;
    }
  }
`;

const StValidationMessage = styled.p`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  font-size: 1.1rem;
  color: var(--red-color);
  margin-top: 1rem;

  @media (max-width: 639px) {
    font-size: 1rem;
  }
`;

const StValidationLength = styled.span`
  width: 80px;
  font-size: 1rem;
  text-align: right;
  color: var(--gray-color);

  @media (max-width: 639px) {
    width: 60px;
    font-size: 0.9rem;
  }
`;
