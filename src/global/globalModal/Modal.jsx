import React from "react";
import styled from "styled-components";

const Modal = ({ onClose }) => {

  return(
    <>
    <Background onClick={onClose} />
      <ModalContentBox>
        <div className="contents">
       내용
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
`;

const ModalContentBox = styled.div`
  position: absolute;
  height: 500px;
  width: 50%;
  top: 50%;
  left: 25%;
  margin-top: -250px;
  background-color: white;
  overflow: scroll;

  .contents {
    width: 100%;
    height: 100%;
    background-color: tomato;
    padding: 20px;
    z-index: 3;

  }
`;