import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { authInstance } from "../../shared/api";
import HeartButton from "../../elements/HeartButton";
import Modal from "../../global/globalModal/Modal";
import Potal from "../../global/globalModal/Potal";
import { useMutation, useQueryClient } from "react-query";

const PostDetailLike = ({ postDetail }) => {
  const { id } = useParams();
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
      await authInstance.post(`/api/postheart/${id}`);
    } else {
      await authInstance.delete(`/api/postheart/${id}`);
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
      setModalIcon("info");
      setAlertMsg("로그인 후 좋아요 버튼을 누를 수 있습니다.");
      setModalOn(true);
    },
  });

  return (
    <StlikeWrapper>
      <StHeartCountBox>{postDetail.heartCount}</StHeartCountBox>
      <HeartButton
        like={postDetail.isHeartMine}
        onClick={mutate}
        className="iconHeart"
      />

      <Potal>
        {modalOn && (
          <Modal
            onCloseModal={onCloseModal}
            modalIcon={modalIcon}
            alertMsg={alertMsg}
            onClickYes={onClickYes}
          />
        )}
      </Potal>
    </StlikeWrapper>
  );
};

export default PostDetailLike;

const StlikeWrapper = styled.div`
  display: flex;
  float: right;
`;
const StHeartCountBox = styled.div`
  margin-right: 10px;
  font-size: 1.3rem;
`;
