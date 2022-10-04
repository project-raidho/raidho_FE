import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import AlertModal from "./globalModal/AlertModal";
import Potal from "./globalModal/Potal";

interface LayoutProps {
  children: React.ReactNode;
}

const GlobalLayout = ({ children }: LayoutProps) => {
  const location = useLocation();

  //모달 상태관리
  const [modalOn, setModalOn] = useState(false);
  const [modalIcon, setModalIcon] = useState<
    "" | "success" | "warning" | "info"
  >("");
  const [alertMsg, setAlertMsg] = useState("");

  const onCloseModal = () => {
    setModalOn(!modalOn);
  };

  useEffect(() => {
    // 가로모드 감지, 경고창
    window.addEventListener(
      "orientationchange",
      function () {
        if (window.orientation === -90 || window.orientation === 90) {
          if (window.innerWidth > 639) {
            return;
          }
          setModalIcon("info");
          setAlertMsg(
            "이 웹사이트는 세로모드를 권장합니다. 세로모드로 전환해주세요."
          );
          setModalOn(true);
        }
      },
      false
    );
  }, []);

  // ::: 페이지 변경될 때마다 스크롤 제일 위로 올리기
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [location.pathname]);
  return (
    <StGlobalLayout>
      {children}
      <Potal>
        {modalOn && (
          <AlertModal
            onCloseModal={onCloseModal}
            modalIcon={modalIcon}
            alertMsg={alertMsg}
            onClickYes={onCloseModal}
          />
        )}
      </Potal>
    </StGlobalLayout>
  );
};

export default GlobalLayout;

const StGlobalLayout = styled.div`
  width: 100%;
  max-width: 1305px;
  margin: 0 auto;
  padding: 80px 0 0 0;

  @media (max-width: 1023px) {
    max-width: 1023px;
    padding: 80px 0 0 0;
  }
  @media (max-width: 767px) {
    max-width: 767px;
  }
  @media (max-width: 639px) {
    max-width: 639px;
    padding: 55px 0 10px;
  }
`;
