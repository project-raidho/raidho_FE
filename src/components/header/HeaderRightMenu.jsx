import React, { useState } from "react";
import Button from "../../elements/Button";
import Potal from "../../global/globalModal/Potal";
import LoginModal from "../login/LoginContainer";
import styled from "styled-components";

const HeaderRightMenu = () => {
  // ::: 모달 여부 확인하기
  const [modalOn, setModalOn] = useState(false);
  const handleModal = () => {
    setModalOn(!modalOn);
  };

  return (
    <StHeaderRightMenuWrap>
      <Button size="small" variant="primary" onClick={handleModal}>
        로그인
      </Button>

      <Potal>{modalOn && <LoginModal onClose={handleModal} />}</Potal>
    </StHeaderRightMenuWrap>
  );
};

export default HeaderRightMenu;

const StHeaderRightMenuWrap = styled.div`
  p.rightMenuBox {
  }
`;
