import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { authInstance } from "../../shared/api";
import HeartButton from "../../elements/HeartButton";
import AlertModal from "../../global/globalModal/AlertModal.jsx";
import Potal from "../../global/globalModal/Potal";
import { useMutation, useQueryClient } from "react-query";
import { BsChat } from "react-icons/bs";
const PostDetailLike = ({ postDetail }) => {
  const { postId } = useParams();
  const [modalOn, setModalOn] = useState(false);

  const [modalIcon, setModalIcon] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  const onCloseModal = () => {
    setModalOn(!modalOn);
  };
  const onClickYes = () => {
    setModalOn(!modalOn);
  };

  const toggleLike = async () => {
    if (!postDetail.isHeartMine) {
      await authInstance.post(`/api/postheart/${postId}`);
    } else {
      await authInstance.delete(`/api/postheart/${postId}`);
    }
  };

  const queryClient = useQueryClient();
  //useMutation 첫번째 파라미터: 함수, 두번째 파라미터: 옵션
  const { mutate } = useMutation(toggleLike, {
    onSuccess: () => {
      queryClient.invalidateQueries("postDetail");
      queryClient.invalidateQueries("postLists");
    },
    onError: () => {
      setModalIcon("warning");
      setAlertMsg("로그인 후 좋아요 버튼을 누를 수 있습니다.");
      setModalOn(true);
    },
  });

  return (
    <StLikeWrapper>
      <HeartButton
        like={postDetail.isHeartMine}
        onClick={mutate}
        className="iconHeart"
      />
      <span className="likeNum">{postDetail.heartCount}</span>
      <BsChat className="commentIcon" />
      <span className="commentNum">{postDetail.commentCount}</span>

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
    </StLikeWrapper>
  );
};

export default PostDetailLike;

const StLikeWrapper = styled.div`
  display: flex;
  float: right;
  @media ${(props) => props.theme.mobile} {
    margin-right: 10px;
  }

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
`;
