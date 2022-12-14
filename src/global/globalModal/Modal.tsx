import React from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";

interface ModalProps {
  onClose: React.MouseEventHandler<SVGElement> | undefined;
  children: React.ReactNode;
}

const Modal = ({ onClose, children }: ModalProps) => {
  return (
    <>
      <Background />
      <ModalContentBox>
        <MdClose className="closeButton" onClick={onClose} />
        <div className="contents">{children}</div>
      </ModalContentBox>
    </>
  );
};
export default Modal;
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
    height: 100%;
    padding: 20px;
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
  @media (max-width: 1023px) {
  }
  @media (max-width: 767px) {
  }
  @media (max-width: 639px) {
    width: 90vw;
    height: 40vh;
    top: 5vh;
    left: 5vw;
    margin-top: 0;
    margin-left: 0;
    .contents {
      padding: 1vh;
    }

    svg.closeButton {
      width: 25px;
      height: 25px;
    }
  }
`;
