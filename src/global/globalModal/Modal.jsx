import React from "react";
import styled from "styled-components";

const Modal = ({ onClose, children }) => {

  return(
    <>
    <Background onClick={onClose} />
      <ModalContentBox>
        <div className="contents">
          {children}
        </div>
      </ModalContentBox>
    </>
  );
}

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
  background: rgba(0, 0, 0, 0.5);
  z-index: 5;
`;

const ModalContentBox = styled.div`
  position: absolute;
  height: 500px;
  width: 480px;
  top: 50%;
  left: 50%;
  margin-top: -250px;
  margin-left: -240px;
  background-color: var(--bg-color);
  border: 1px solid var(--title-color);
  z-index: 6;
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
`;