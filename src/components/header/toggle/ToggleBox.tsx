import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import BgToggleBoxLight from "../../../assets/header/toggleBoxLight.svg";
import BgToggleBoxDark from "../../../assets/header/toggleBoxDark.svg";
import styled from "styled-components";

interface ToggleProps {
  children: React.ReactNode;
  isToggle: boolean;
  onCloseToggle: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const ToggleBox = ({ children, isToggle, onCloseToggle }: ToggleProps) => {
  // ::: 다크모드 여부 체크 true : dark / false : light
  const checkDarkMode = useSelector(
    (state: RootState) => state.searchSlice.darkMode
  );

  return (
    <>
      <StToggleBox isToggle={isToggle} checkDarkMode={checkDarkMode}>
        {children}
        <span></span>
      </StToggleBox>
      <StToggleBackground isToggle={isToggle} onClick={onCloseToggle} />
    </>
  );
};

export default ToggleBox;

const StToggleBox = styled.ul<{ isToggle: boolean; checkDarkMode: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 150px;
  height: ${(props) => (props.isToggle ? "130px" : "0px")};
  background-image: ${(props) =>
    props.checkDarkMode
      ? `url(${BgToggleBoxDark})`
      : `url(${BgToggleBoxLight})`};
  background-position: center;
  background-size: 130px 130px;
  background-repeat: no-repeat;
  top: 40px;
  left: 50%;
  padding: 0 8px;
  margin-left: -105px;
  z-index: 11;
  overflow: hidden;
  transition: all 0.3s linear;

  span {
    display: none;
  }

  @media ${(props) => props.theme.mobile} {
    position: fixed;
    width: 100vw;
    height: ${(props) => (props.isToggle ? "135px" : "0px")};
    left: 0%;
    top: 100%;
    margin-top: ${(props) => (props.isToggle ? "-183px" : "-50px")};
    margin-left: 0;
    background-color: var(--bg-color);
    background-image: none;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    box-shadow: var(--header-bottom-shadow);
    z-index: 11;

    span {
      position: absolute;
      top: 15px;
      left: 50%;
      display: block;
      width: 40px;
      height: 4px;
      border-radius: 2px;
      margin-left: -20px;
      background-color: var(--lightGray-color);
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    }
  }
`;

const StToggleBackground = styled.div<{ isToggle: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  display: ${(props) => (props.isToggle ? "block" : "none")};
  width: 100vw;
  height: 100vh;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0);
`;
