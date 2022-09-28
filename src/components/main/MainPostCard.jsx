import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { authInstance } from "../../shared/api";
import HeartButton from "../../elements/HeartButton";
import AlertModal from "../../global/globalModal/AlertModal";
import Potal from "../../global/globalModal/Potal";
import styled from "styled-components";
import fileIcon from "../../assets/fileIcon.svg";
import DefaultMemberImage from "../../assets/defaultProfileImage.svg";
import { BsChat } from "react-icons/bs";

const MainPostCard = ({ post }) => {
  const navigate = useNavigate();
  // ::: 좋아요, 좋아요 취소 axios
  const changeLike = async () => {
    if (!post.isHeartMine) {
      await authInstance.post(`/api/postheart/${post.id}`);
    } else {
      await authInstance.delete(`/api/postheart/${post.id}`);
    }
  };

  const queryClient = useQueryClient();
  //useMutation 첫번째 파라미터: 함수, 두번째 파라미터: 옵션
  // 좋아요 성공시 postList 무효화
  const { mutate } = useMutation(changeLike, {
    onSuccess: () => {
      queryClient.invalidateQueries("postLists");
    },
    onError: () => {
      setModalIcon("warning");
      setAlertMsg("로그인 후 좋아요 버튼을 누를수 있습니다.");
      setModalOn(true);
    },
  });

  // ::: 유저 프로필 이미지 적용하기
  const memberImage =
    post.memberImage === null ? `${DefaultMemberImage}` : `${post.memberImage}`;

  const [modalOn, setModalOn] = useState(false);
  const [modalIcon, setModalIcon] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const onCloseModal = () => {
    setModalOn(!modalOn);
  };
  const onClickYes = () => {
    setModalOn(!modalOn);
  };
  return (
    <StFigure>
      <img
        className="img"
        src={post.multipartFiles[0]}
        alt="img"
        onClick={() => navigate(`/postdetail/${post.id}`)}
        loading="lazy"
      />
      {post.isImages && <div className="imagesicon" />}
      <div className="userBox">
        <div className="profileBox">
          <img className="profileImg" src={memberImage} alt="프로필 이미지" />
        </div>
        <h2>{post.memberName}</h2>
        <div className="cardButtonBox">
          <HeartButton like={post.isHeartMine} onClick={mutate} />
          <span className="likeNum">{post.heartCount}</span>
          <BsChat className="commentIcon" />
          <span className="commentNum">{post.commentCount}</span>
        </div>
      </div>

      <Potal>
        {modalOn && (
          <AlertModal
            onCloseModal={onCloseModal}
            modalIcon={modalIcon}
            alertMsg={alertMsg}
            onClickYes={onClickYes}
          />
        )}
        {/* {ConfirmModalon &&(
          <ConfirmModal
          onCloseModal={onCloseModal}
          modalIcon={modalIcon}
          alertMsg={alertMsg}
          onClickYes={onClickYes}
          onClickNo={onClickNo}
          />
        )} */}
      </Potal>
    </StFigure>
  );
};

export default MainPostCard;

const StFigure = styled.figure`
  display: inline-block;
  position: relative;
  margin: 0;
  width: 100%;
  margin-bottom: 20px;
  .img {
    width: 100%;
    cursor: pointer;
  }
  .imagesicon {
    height: 22px;
    width: 22px;
    position: absolute;
    top: 13px;
    right: 10px;
    background-image: url(${fileIcon});
  }
  .cardButtonBox {
    display: flex;
    position: absolute;
    bottom: 5px;
    right: 10px;

    .likeNum {
      /* display: none; */
      margin-right: 0.5rem;
      margin-left: 0.2rem;
    }

    &:hover .likeNum {
      /* display: block; */
    }
    .commentIcon {
      path {
        color: var(--title-color);
      }
    }
    .commentNum {
      margin-left: 0.2rem;
    }
  }
  .userBox {
    display: flex;
    margin-top: 5px;
    margin-left: 10px;
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
