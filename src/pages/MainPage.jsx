import React, { useState } from "react";
import Potal from "../global/globalModal/Potal";
import Modal from "../global/globalModal/Modal";
import Button from "../elements/Button";
import styled from "styled-components";
import GlobalHeader from "../global/GlobalHeader";

const MainPage = ({ props }) => {
  const [modalOn, setModalOn] = useState(false);
  const handleModal = () => {
    setModalOn(!modalOn);
  }

  return (
    <>
      <GlobalHeader />
      <StMainPageWrap>
        MainPage

        <Button
          size="large"
          variant="primary"
        >소셜로그인!</Button>
        <Button
          onClick={handleModal}
          size="small"
          variant="primary"
        >모달 오픈!</Button>
        <Potal>
          {modalOn && <Modal onClose={handleModal} />}
        </Potal>
      </StMainPageWrap>
    </>

  );
};

export default MainPage;

const StMainPageWrap = styled.div`
  background-color: yellow;
`;