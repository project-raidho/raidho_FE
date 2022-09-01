import KakaoOauth from "../../shared/KaKaoOauth";
import FaceBookLogin from "./FacebookLogin";
import React from "react";
import styled from "styled-components";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const LoginModal = ({ onClose }) => {
  const navigate=useNavigate();
  const oAuthLoginHandler =(id, email)=> {
    let request = {
        oAuhId: id,
        email,
    }
  const URI = process.env.REACT_APP_BASE_URI;
  const res= axios.post(`${URI}/ouath/facebook`, request)
  
  localStorage.setItem("Authorization", res.headers.authorization);
  navigate("/");
}

  return(
    <>
    <Background onClick={onClose} />
      <ModalContentBox>
        <div className="contents">
         <KakaoOauth/>
         <FaceBookLogin oAuthLoginHandler={oAuthLoginHandler}/>
         <button>네이버로 로그인</button>
        
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
  z-index: 5;
`;

const ModalContentBox = styled.div`
  position: absolute;
  height: 720px;
  width: 480px;
  top: 50%;
  left: 50%;
  margin-top: -360px;
  margin-left: -240px;
  background-color: var(--bg-color);
  border: 1px solid var(--title-color);
  z-index: 6;
  
  .contents {
    width: 100%;
    height: 100%;
    padding: 20px;
    z-index: 3;

  }
`;