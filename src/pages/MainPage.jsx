import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import MainContainer from "../components/main/MainContainer";
import styled from "styled-components";

const MainPage = () => {
  const { stateName } = useParams();
  console.log("=====> mainPage :: paramssss", stateName);

  const [state, setState] = useState(
    stateName === undefined ? "latest" : stateName
  );
  console.log("=====> mainPage :: state", state);

  useEffect(() => {
    const changeState = stateName === undefined ? "latest" : stateName;
    setState(changeState);
  }, [stateName, state]);
  return (
    <StMainPageWrap>
      <StMainNav>
        <p onClick={() => setState("latest")}>
          <NavLink
            to={`/latest`}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            실시간
          </NavLink>
        </p>
        <p onClick={() => setState("likelist")}>
          <NavLink
            to={`/likelist`}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            추천순
          </NavLink>
        </p>
      </StMainNav>
      <MainContainer state={state} />
    </StMainPageWrap>
  );
};

export default MainPage;

const StMainPageWrap = styled.div``;
const StMainNav = styled.div`
  position: fixed;
  left: 0;
  top: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.8rem 0;
  box-shadow: var(--box-shadow);
  background-color: var(--bg-color);
  z-index: 4;

  p {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 40px;
    border: 1px solid var(--title-color);
    border-radius: 10px;
    background-color: var(--bg-color);
    margin-right: 1rem;
    overflow: hidden;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    width: 100%;
    height: 100%;
    &.active {
      background-color: var(--main-color);
    }
  }
`;
