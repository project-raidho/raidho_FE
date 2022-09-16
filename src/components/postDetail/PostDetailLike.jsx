import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { authInstance } from "../../shared/api";
import HeartButton from "../main/HeartButton";
import Modal from "../../global/globalModal/Modal";
import Potal from "../../global/globalModal/Potal";
import Button from "../../elements/Button";

const PostDetailLike = ({ postDetail }) => {
  const { id } = useParams();
  const [count, setCount] = useState(0);
  console.log(postDetail.isHeartMine);
  const [like, setLike] = useState(postDetail.isHeartMine);
  console.log(like);

  const [modalOn, setModalOn] = useState(false);
  const handleModal = () => {
    setModalOn(!modalOn);
  };

  useEffect(() => {
    setLike(postDetail.isHeartMine);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postDetail]);
  const toggleLike = async () => {
    if (!like) {
      try {
        await authInstance.post(`/api/postheart/${id}`);
        setLike(!like);
        setCount(count + 1);
      } catch (e) {
        setModalOn(!modalOn);
      }
    } else {
      try {
        await authInstance.delete(`/api/postheart/${id}`);
        setLike(!like);
        setCount(count - 1);
      } catch (e) {
        setModalOn(!modalOn);
      }
    }
  };
  return (
    <StlikeWrapper>
      <StHeartCountBox>{postDetail.heartCount + count}</StHeartCountBox>
      <HeartButton like={like} onClick={() => toggleLike()} />

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
