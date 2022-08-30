import React from "react";
import GlobalLayout from "./GlobalLayout";
import Input from "../elements/Input";
import Potal from "../global/globalModal/Potal";
import LoginModal from "../components/login/LoginContainer";
import styled from "styled-components";

const GlobalHeader = () => {
  const [ modalOn, setModalOn ] = useState(false);
  const handleModal = () => {
    setModalOn(!modalOn);
  }

  return(
    <StGlobalHeaderWrap>
      <GlobalLayout>
        <Input size="medium" variant="default" />
        <button onClick={handleModal}>로그인</button>
        <Potal>
          {modalOn && <LoginModal onClose={handleModal} /> }
        </Potal>
      </GlobalLayout>
    </StGlobalHeaderWrap>
  );
};

export default GlobalHeader;

const StGlobalHeaderWrap = styled.div`
  width: 100%;
  height: 135px;
  padding-top: 80px;
  margin-bottom: 58px;
  background-color: var(--bg-color);
`;
