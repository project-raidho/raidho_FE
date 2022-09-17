import styled from "styled-components";
import { authInstance } from "../../shared/api";
import HeartButton from "../../elements/HeartButton";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { RiFileCopyLine } from "react-icons/ri";
import fileIcon from "../../assets/fileIcon.svg";
import DefaultMemberImage from "../../assets/defaultProfileImage.svg";
import Modal from "../../global/globalModal/Modal";
import Potal from "../../global/globalModal/Potal";
import Button from "../../elements/Button";
import { useMutation, useQueryClient } from "react-query";

const MainPostCard = ({ post }) => {
  const navigate = useNavigate();
  // ::: 좋아요, 좋아요 취소 axios
  const changeLike = async () => {
    if (!post.isHeartMine) {
      try {
        await authInstance.post(`/api/postheart/${post.id}`);
      } catch (e) {
        setModalOn(!modalOn);
      }
    } else {
      try {
        await authInstance.delete(`/api/postheart/${post.id}`);
      } catch (e) {
        setModalOn(!modalOn);
      }
    }
  };

  const queryClient = useQueryClient();
  //useMutation 첫번째 파라미터: 함수, 두번째 파라미터: 옵션
  // 좋아요 성공시 postList 무효화
  const { mutate } = useMutation(changeLike, {
    onSuccess: () => {
      queryClient.invalidateQueries("postList");
    },
  });

  // ::: 유저 프로필 이미지 적용하기
  const memberImage =
    post.memberImage === null ? `${DefaultMemberImage}` : `${post.memberImage}`;

  const [modalOn, setModalOn] = useState(false);
  const handleModal = () => {
    setModalOn(!modalOn);
  };
  return (
    <StFigure>
      <img
        className="img"
        src={post.multipartFiles[0]}
        alt="img"
        onClick={() => navigate(`/postdetail/${post.id}`)}
      />
      {post.isImages && <div className="imagesicon" />}
      <div className="userBox">
        <div className="profileBox">
          <img className="profileImg" src={memberImage} alt="프로필 이미지" />
        </div>
        <h2>{post.memberName}</h2>
        <div className="likebutton">
          <div className="likeNum">{post.heartCount}</div>
          <HeartButton like={post.isHeartMine} onClick={mutate} />
        </div>
      </div>

      <Potal>
        {modalOn && (
          <Modal onClose={handleModal}>
            <StErrorMessage>
              죄송합니다. <br />
              로그인 후 좋아요 버튼을 누를수 있습니다. <br />
              로그인 후 시도해 주세요.
            </StErrorMessage>
            <StButtonWrap>
              <Button size="medium" onClick={handleModal}>
                닫기
              </Button>
            </StButtonWrap>
          </Modal>
        )}
      </Potal>
    </StFigure>
  );
};

export default MainPostCard;

const StFigure = styled.figure`
  display: inline-block;
  position: relative;

  margin: 0;
  width: 310px;
  margin-bottom: 20px;
  .img {
    width: 100%;
    border: 1px solid var(--gray-color);
    cursor: pointer;
  }
  .imagesicon {
    height: 22px;
    width: 22px;
    position: absolute;
    top: 10px;
    right: 10px;
    background-image: url(${fileIcon});
  }
  .likebutton {
    display: flex;
    position: absolute;
    bottom: 5px;
    right: 10px;

    .likeNum {
      display: none;
      margin-right: 5px;
    }

    &:hover .likeNum {
      display: block;
    }
  }
  .userBox {
    display: flex;
    margin-top: 5px;
  }
  .profileBox {
    width: 30px;
    height: 30px;
    border-radius: 70%;
    overflow: hidden;
  }
  .profileImg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  h2 {
    font-size: 1.2rem;
    margin: auto 10px;
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
