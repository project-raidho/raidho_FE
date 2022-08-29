import React, { useState } from "react";
import Potal from "../global/globalModal/Potal";
import Modal from "../global/globalModal/Modal";
import styled from "styled-components";

const MainPage = ({ props }) => {
  const [ modalOn, setModalOn ] = useState(false);
  const handleModal = () => {
    setModalOn(!modalOn);
  }

  return(
    <StMainPageWrap>
      MainPage
      <button onClick={handleModal}>모달 오픈!</button>
      <Potal>
        {modalOn && <Modal onClose={handleModal} /> }
      </Potal>
    </StMainPageWrap>
  );
};

export default MainPage;

const StMainPageWrap = styled.div`
  background-color: yellow;
`;