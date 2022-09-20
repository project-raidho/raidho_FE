import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
import MainMenu from "../components/main/MainMenu";

const MainPage = () => {
  const { stateName } = useParams();
  console.log("=====>paramssss", stateName);
  const [state, setState] = useState(
    stateName === undefined ? "latest" : stateName
  );
  console.log("=====>state", state);

  useEffect(() => {
    const changeState = stateName === undefined ? "latest" : stateName;
    setState(changeState);
  }, [stateName, state]);
  return (
    <StMainPageWrap>
      <div>
        <NavLink to={`/latest`}>
          <button
            // size="medium"
            // //variant={state === "latest" ? "primary" : "gray"}
            onClick={() => setState("latest")}
          >
            실시간
          </button>
        </NavLink>
        <NavLink to={`/likelist`}>
          <button
            // size="medium"
            // //variant={state === "likelist" ? "primary" : "gray"}
            onClick={() => setState("likelist")}
          >
            추천순
          </button>
        </NavLink>
      </div>
      <MainMenu state={state} />
    </StMainPageWrap>
  );
};

export default MainPage;

const StMainPageWrap = styled.div``;
