import React from "react";
import BgToggleBox from "../../../assets/header/togglebox.svg";
import styled from "styled-components";

const ToggleBox = ({ children, isToggle, onCloseToggle }) => {
  return (
    <>
      <StToggleBox isToggle={isToggle}>{children}</StToggleBox>
      <StToggleBackground isToggle={isToggle} onClick={onCloseToggle} />
    </>
  );
};

export default ToggleBox;

const StToggleBox = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 110px;
  height: ${(props) => (props.isToggle ? "130px" : "0px")};
  background-image: url(${BgToggleBox});
  background-size: 100% 100%;
  top: 35px;
  left: 50%;
  padding: 0 8px;
  margin-left: -85px;
  z-index: 3;
  overflow: hidden;
  transition: 0.3s;
`;

const StToggleBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: ${(props) =>
    props.isToggle || props.isAddPostToggle ? "block" : "none"};
  width: 100vw;
  height: 100vh;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0);
`;
