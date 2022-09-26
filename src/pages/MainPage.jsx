import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import MainBanner from "../components/main/MainBanner";
import MainContainer from "../components/main/MainContainer";
import styled from "styled-components";

const MainPage = () => {
  const { stateName } = useParams();
  const [state, setState] = useState(
    stateName === undefined ? "latest" : stateName
  );

  useEffect(() => {
    const changeState = stateName === undefined ? "latest" : stateName;
    setState(changeState);
  }, [stateName, state]);
  return (
    <StMainPageWrap>
      <MainBanner />
      <StLayout>
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
      </StLayout>
    </StMainPageWrap>
  );
};

export default MainPage;

const StMainPageWrap = styled.div`
  padding-top: 170px;
`;
const StMainNav = styled.div`
  /* position: fixed;
  left: 0;
  top: 70px; */
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 0.8rem 0;
  margin-bottom: 1rem;
  /* box-shadow: var(--box-shadow); */
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
  @media (max-width: 639px) {
    top: 57px;
    p {
      width: 100px;
      height: 30px;
      a {
        font-size: 1rem;
      }
    }
  }
`;

const StLayout = styled.div`
  padding-top: 190px;
  max-width: 1305px;
  margin: 0 auto;
`;
