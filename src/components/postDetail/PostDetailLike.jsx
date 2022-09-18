import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { authInstance } from "../../shared/api";
import HeartButton from "../../elements/HeartButton";
import Modal from "../../global/globalModal/Modal";
import Potal from "../../global/globalModal/Potal";
import Button from "../../elements/Button";
import { useMutation, useQueryClient } from "react-query";

const PostDetailLike = ({ postDetail }) => {
  const { id } = useParams();
  const [modalOn, setModalOn] = useState(false);
  const handleModal = () => {
    setModalOn(!modalOn);
  };
  const toggleLike = async () => {
    if (!postDetail.isHeartMine) {
      try {
        await authInstance.post(`/api/postheart/${id}`);
      } catch (e) {
        setModalOn(!modalOn);
      }
    } else {
      try {
        await authInstance.delete(`/api/postheart/${id}`);
      } catch (e) {
        setModalOn(!modalOn);
      }
    }
  };

  const queryClient = useQueryClient();
  //useMutation 첫번째 파라미터: 함수, 두번째 파라미터: 옵션
  const { mutate } = useMutation(toggleLike, {
    onSuccess: () => {
      queryClient.invalidateQueries("postDetail");
      queryClient.invalidateQueries("postList");
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
