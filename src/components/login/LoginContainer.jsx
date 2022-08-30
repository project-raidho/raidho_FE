import KakaoOauth from "../../shared/KaKaoOauth";
import React from "react";
import styled from "styled-components";

const LoginModal = ({ onClose }) => {

  return(
    <>
    <Background onClick={onClose} />
      <ModalContentBox>
        <div className="contents">
         <KakaoOauth/>
         <button>네이버로 로그인</button>
         <button>페이스북으로 로그인</button>
        </div>
      </ModalContentBox>
    </>
  );
}

export default LoginModal;

const Background = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalContentBox = styled.div`
  position: absolute;
  height: 500px;
  width: 50%;
  top: 50%;
  left: 25%;
  margin-top: -250px;
  background-color: white;
  

  .contents {
    width: 100%;
    height: 100%;
    background-color: tomato;
    padding: 20px;
    z-index: 3;

  }
`;