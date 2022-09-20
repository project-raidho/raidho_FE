import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";

import MainPostList from "./MainPostList";
import Button from "../../elements/Button";
import { useEffect } from "react";

const MainMenu = ({ state }) => {
  return (
    <>
      {state === "latest" && <MainPostList state={state} />}
      {state === "likelist" && <MainPostList state={state} />}
    </>
  );
};

export default MainMenu;
const StMenuset = styled.div`
  display: flex;
  button {
    margin-right: 1.5rem;
  }
`;
