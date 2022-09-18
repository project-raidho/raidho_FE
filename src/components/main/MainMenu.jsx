import React, { useState } from "react";
import styled from "styled-components";

import MainPostList from "./MainPostList";
import Button from "../../elements/Button";

const MainMenu = () => {
  const [state, setState] = useState("latest");
  console.log(state);
  const besthandler = () => {
    setState("likelist");
  };
  const latesthandler = () => {
    setState("latest");
  };
  return (
    <>
      <StMenuset>
        <Button
          size="medium"
          variant={state === "latest" ? "primary" : "gray"}
          onClick={latesthandler}
        >
          실시간
        </Button>
        <Button
          size="medium"
          variant={state === "likelist" ? "primary" : "gray"}
          onClick={besthandler}
        >
          추천순
        </Button>
      </StMenuset>
      <MainPostList state={state} />
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
