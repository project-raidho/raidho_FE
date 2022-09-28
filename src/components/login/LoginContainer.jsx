// import KakaoOauth from "../../shared/KaKaoOauth";
// import FaceBookLogin from "./FacebookLogin";
import React from "react";
import styled from "styled-components";
// import axios from "axios";

// import NaverLogin from "./NaverLogin";
import RaidhoLogo from "../../assets/raidhoLogo.svg";
import {
  KAKAO_AUTH_URL,
  // GOOGLE_AUTH_URL,
  // NAVER_AUTH_URL,
} from "../../shared/SocialOAuth";

import kakao from "../../assets/kakao.svg";
// import naver from "../../assets/naver.svg";
// import facebook from "../../assets/facebook.svg";
// import notPrepare from "../../assets/notPrepare.svg";

const LoginModal = ({ onClose }) => {
  // const navigate = useNavigate();
  // const oAuthLoginHandler = (id, email) => {
  //   let request = {
  //     oAuhId: id,
  //     email,
  //   };
  //   const URI = process.env.REACT_APP_BASE_URI;
  //   const res = axios.post(`${URI}/ouath/facebook`, request);

  //   localStorage.setItem("Authorization", res.headers.authorization);
  //   navigate("/");
  // };

  return (
    <>
      <Background onClick={onClose} />
      <ModalContentBox>
        <button className="closeButton" onClick={onClose}>
          x
        </button>
        <img className="logoImg" src={RaidhoLogo} alt="RaidhoLogo" />

        <div className="contents">
          <SocialLoginbutton className="kaako" href={KAKAO_AUTH_URL}>
            <img src={kakao} alt="kakao" />
          </SocialLoginbutton>
          {/* 
          <SocialLoginbutton href={NAVER_AUTH_URL}>
            <img src={naver} alt="네이버로그인" />
          <NaverLogin />
          </SocialLoginbutton> */}

          {/* <div className="prepareBox">
           
              <SocialLoginbutton href={GOOGLE_AUTH_URL} >
              <img src={facebook} alt="페이스북로그인" />
            </SocialLoginbutton>
            <img src={notPrepare} alt="준비중" />
          </div> */}
          {/* <FaceBookLogin
            className="faceBookLogin"
            oAuthLoginHandler={oAuthLoginHandler}
          /> */}
        </div>
      </ModalContentBox>
    </>
  );
};

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
  z-index: 11;
`;

const ModalContentBox = styled.div`
  position: fixed;
  height: 400px;
  width: 600px;
  top: 50%;
  left: 50%;
  margin-top: -200px;
  margin-left: -300px;
  background-color: var(--bg-color);
  border: 1px solid var(--title-color);
  z-index: 12;
  text-align: center;
  .closeButton {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: none;
    margin-top: 20px;
    margin-right: 20px;
    font-size: 18px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .logoImg {
    margin-top: 120px;
    margin-bottom: 30px;
    width: 250px;
  }
  .contents {
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 20px;
    z-index: 3;
  }
  .faceBookLogin {
    margin: auto;
  }
  .prepareBox {
    display: flex;
  }
`;

const SocialLoginbutton = styled.a`
  font-size: 18px;
  font-weight: 400;
  letter-spacing: -0.04em;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 340px; */
  height: 80px;
  color: #1c1c1c;
  border: none;
  img {
    object-fit: cover;
    width: 340px;
    height: 100%;
    margin-bottom: 5px;
  }
`;
