import React, { useState } from "react";
import { authInstance } from "../../shared/api";
// import imageCompression from "browser-image-compression";
import Button from "../../elements/Button";
import Input from "../../elements/Input";
import Potal from "../../global/globalModal/Potal";
import Modal from "../../global/globalModal/Modal";
import styled from "styled-components";
import DefaultMemberImage from "../../assets/defaultProfileImage.svg";

const UpdateMyProfile = (props) => {
  // ::: 유저 정보 가져오기
  const memberInfo = {
    memberId: localStorage.getItem("memberId"),
    memberName: localStorage.getItem("memberName"),
    memberImage:
      localStorage.getItem("memberImage") === "null"
        ? `${DefaultMemberImage}`
        : localStorage.getItem("memberImage"),
    memberIntro: localStorage.getItem("memberIntro"),
  };

  const [compressedImageFile, setCompressedImageFile] = useState(null);
  const [previewUpdateImage, setPreviewUpdateImage] = useState(null);
  const [updateNickname, setUpdateNickname] = useState(memberInfo.memberName);
  const [updateComment, setUpdateComment] = useState(memberInfo.memberIntro);

  // ::: 유효성 검사 메시지 상태관리하기
  const [validationAlert, setValidationAlert] = useState("");

  // ::: 프로필 편집 모달(createPotal) 컨트롤 하기
  const [modalOn, setModalOn] = useState(false);
  const handleModal = () => {
    setModalOn(!modalOn);

    // ::: 유저가 입력한 값 초기화 시키기

    setCompressedImageFile(null);
    setUpdateNickname(memberInfo.memberName);
    setUpdateComment(memberInfo.memberIntro);
    setValidationAlert(null);
  };

  // ::: 이미지 미리보기(Image Preview)
  const onChangePostImageFile = (event) => {
    let reader = new FileReader();
    const postImageFile = event.target.files[0];
    setCompressedImageFile(postImageFile);
    if (postImageFile) {
      reader.readAsDataURL(postImageFile);
    }
    reader.onloadend = () => {
      const resultImage = reader.result;
      setPreviewUpdateImage(resultImage);
    };
  };

  console.log(previewUpdateImage);

  const onChangeUpdateMemberName = (event) => {
    setUpdateNickname(event.target.value);
  };

  const onChangeUpdateMemberComment = (event) => {
    setUpdateComment(event.target.value);
  };

  console.log("compressedImageFile", compressedImageFile);
  console.log("updateNickname", updateNickname);
  console.log("updateComment", updateComment);

  // ::: 수정 정보 서버에 전달하기
  const onCompleteUpdateProfile = async () => {
    if (
      memberInfo.memberImage === compressedImageFile &&
      memberInfo.memberName === updateNickname &&
      memberInfo.memberIntro === updateComment
    ) {
      return setValidationAlert("변경된 내용이 없습니다.");
    }
    // :: image file formData 형식 변환
    const formData = new FormData();

    if (compressedImageFile !== null) {
      const fileName =
        "raidho_member_image_" + new Date().getMilliseconds() + ".jpeg";
      formData.append("memberImage", compressedImageFile, fileName);
      formData.append("memberName", updateNickname);
      formData.append("memberIntro", updateComment);
    } else {
      formData.append("memberName", updateNickname);
      formData.append("memberIntro", updateComment);
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

      console.log("프로필수정 response ::: ", response);
      localStorage.setItem("memberImage", response.data);
      localStorage.setItem("memberName", updateNickname);
      localStorage.setItem("memberIntro", updateComment);

      setModalOn(false);
    } catch (error) {
      alert(`프로필 수정에 오류가 났습니다. ${error}`);
      console.log(error);
    }
  };
  return (
    <StUpdateMyProfileWrap>
      <StMyProfileBox>
        <p>
          <img src={memberInfo.memberImage} alt={memberInfo.memberName} />
        </p>
        <dl>
          <dt>@{memberInfo.memberName}</dt>
          <dd>{memberInfo.memberIntro}</dd>
        </dl>
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
                    {previewUpdateImage !== null ? (
                      <img
                        src={previewUpdateImage}
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
                    <Input
                      size="large"
                      variant="default"
                      value={updateNickname}
                      placeholder={memberInfo.memberName}
                      onChange={(event) => onChangeUpdateMemberName(event)}
                    />
                  </StMemberNicknameBox>
                </StUpdateProfileRow>

                <StUpdateUserProfileTitle>한 줄 소개</StUpdateUserProfileTitle>
                <Input
                  size="large"
                  variant="default"
                  placeholder={memberInfo.memberIntro}
                  onChange={(event) => onChangeUpdateMemberComment(event)}
                  value={updateComment}
                />
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
                  수정
                </Button>
              </StButtonWrap>
            </StUpdateUserProfileModal>
          </Modal>
        )}
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

  @media (max-width: 639px) {
    height: 150px;
    align-items: flex-start;
    flex-direction: column;

    button {
      font-size: 1rem;
      margin-top: 1rem;
      margin-left: 1rem;
      padding: 0.5rem 1rem;
    }
  }
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

  @media (max-width: 639px) {
    p {
      width: 80px;
      height: 80px;
      margin-left: 1rem;
      margin-right: 1rem;
    }
    dl {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: end;
      height: 80px;

      dt {
        height: 40px;
        font-size: 1.2rem;
      }
      dd {
        height: 20px;
        font-size: 1rem;
      }
    }
  }
`;

const StUpdateProfileTop = styled.div``;
const StButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin-top: 30px;

  button {
    margin-left: 1rem;
  }
`;

const StUpdateUserProfileTitle = styled.h2`
  font-size: 1.5rem;
  text-align: left;
  margin: 1rem 0;
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
`;

const StMemberImageBox = styled.label`
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

  .changeImageMessage {
    font-size: 1.2rem;
    letter-spacing: 1px;
  }
  @media (max-width: 639px) {
    width: 100px;
    height: 100px;
  }
`;

const StMemberNicknameBox = styled.div`
  width: 200px;

  p {
    width: 100%;
    font-size: 1.7rem;
    text-align: left;
  }
  @media (max-width: 639px) {
    width: 180px;
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
