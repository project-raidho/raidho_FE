import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import Button from "../../elements/Button";
import Success from "../../elements/Success";
import Warning from "../../elements/Warning";
import Info from "../../elements/Info";

interface ModalProps {
  onCloseModal: React.MouseEventHandler<SVGElement> | undefined;
  modalIcon: "success" | "warning" | "info" | "";
  alertMsg: String;
  onClickYes: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onClickNo?: Function;
}

const AlertModal = ({
  onCloseModal,
  modalIcon,
  alertMsg,
  onClickYes,
  onClickNo,
}: ModalProps) => {
  const [Icon, setIcon] = useState<React.ReactNode | String>();
  useEffect(() => {
    if (modalIcon === "success") {
      setIcon(<Success />);
    } else if (modalIcon === "warning") {
      setIcon(<Warning />);
    } else if (modalIcon === "info") {
      setIcon(<Info />);
    } else {
      setIcon("");
    }
  }, [modalIcon]);

  return (
    <>
      <Background />
      <ModalContentBox>
        <MdClose className="closeButton" onClick={onCloseModal} />
        <div className="contents">
          <StModalContent>
            <h4>{Icon}</h4>
            <p>{alertMsg}</p>

            <StButtonWrap>
              <Button size="square" variant="lineSquare" onClick={onClickYes}>
                확인
              </Button>
            </StButtonWrap>
          </StModalContent>
        </div>
      </ModalContentBox>
    </>
  );
};

export default AlertModal;

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
  z-index: 11;
`;

const ModalContentBox = styled.div`
  position: fixed;
  height: 300px;
  width: 600px;
  top: 50%;
  left: 50%;
  margin-top: -150px;
  margin-left: -300px;
  background-color: var(--bg-color);
  border-radius: 15px;
  box-shadow: var(--box-shadow);
  z-index: 12;
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
    height: 30vh;
    top: 10vh;
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

const StModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding-top: 30px;

  h4 {
    display: block;
    width: 80px;
    height: 80px;
    margin-top: 20px;
    overflow: hidden;
  }

  p {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 1rem;
  }
  @media (max-width: 639px) {
    h4 {
      width: 40px;
      height: 40px;
      margin-top: 10px;
    }
    p {
      font-size: 1rem;
    }
  }
`;

const StButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin-top: 10px;

  button {
    margin-left: 1rem;
  }

  @media (max-width: 639px) {
    padding-right: 1rem;
    padding-bottom: 1rem;
    button {
      width: 60px;
      height: 30px;
    }
  }
`;
