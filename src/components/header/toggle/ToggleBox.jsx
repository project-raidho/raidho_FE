import React, { useState } from "react";
import BgToggleBox from "../../../assets/header/togglebox.svg";
import styled from "styled-components";

const ToggleBox = ({ children }) => {
  // ::: 토글 메뉴 확인하기
  const [isToggle, setIsToggle] = useState(false);

  // ::: 메뉴 토글 닫기
  const onCloseToggle = () => {
    setIsToggle(false);
  };

  return (
    <>
      <StToggleBox>{children}</StToggleBox>
    </>
  );
};

export default ToggleBox;

const StToggleBox = styled.ul`
  position: absolute;
  width: 110px;
  height: 120px;
  background-image: url(${BgToggleBox});
  top: 40px;
  left: 50%;
  margin-left: -80px;
  z-index: 3;
`;
