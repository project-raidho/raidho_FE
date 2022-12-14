import React from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";

import kakao from "../../assets/kakao.svg";
import RaidhoLogo from "../../assets/logo/logoDesktop.png";
import { KAKAO_AUTH_URL } from "../../shared/SocialOAuth";

const LoginModal = ({
  onClose,
  message,
}: {
  onClose: React.MouseEventHandler<SVGSVGElement> | undefined;
  message?: string;
}) => {
  return (
    <>
      <Background />
      <ModalContentBox>
        <MdClose className="closeButton" onClick={onClose} />
        <img className="logoImg" src={RaidhoLogo} alt="RaidhoLogo" />

        <div className="contents">
          <SocialLoginbutton href={KAKAO_AUTH_URL}>
            <img src={kakao} alt="kakao" />
          </SocialLoginbutton>
          <p className="infoMessage">{message}</p>
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
  background: rgba(0, 0, 0, 0);
  z-index: 20;
`;

const ModalContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  height: 440px;
  width: 600px;
  top: 50%;
  left: 50%;
  margin-top: -220px;
  margin-left: -300px;
  background-color: var(--bg-color);
  border-radius: 15px;
  box-shadow: var(--box-shadow);
  z-index: 21;
  text-align: center;

  .contents {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    height: 100px;
    padding: 20px;
    .infoMessage {
      width: 100%;
      text-align: center;
      font-size: 0.9rem;
    }
  }
  svg.closeButton {
    position: absolute;
    right: 1rem;
    top: 1rem;
    width: 30px;
    height: 30px;
    cursor: pointer;
    path {
      color: var(--title-color);
    }
  }
  .logoImg {
    margin-bottom: 30px;
    width: 280px;
  }
  .faceBookLogin {
    margin: auto;
  }
  .prepareBox {
    display: flex;
  }
  @media (max-width: 1023px) {
  }
  @media (max-width: 767px) {
  }
  @media ${(props) => props.theme.mobile} {
    width: 90vw;
    height: 40vh;
    top: 10vh;
    left: 5vw;
    margin-top: 0;
    margin-left: 0;
    .contents {
      padding: 1vh;
      .infoMessage {
        width: 70%;
        margin: 0 auto;
      }
    }

    svg.closeButton {
      width: 25px;
      height: 25px;
    }

    .logoImg {
      margin-top: 50px;
      width: 250px;
    }
  }
`;

const SocialLoginbutton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  img {
    object-fit: contain;
    width: 340px;
    height: 100%;
  }

  @media ${(props) => props.theme.mobile} {
    img {
      width: 300px;
    }
  }
`;
