import React, { useState } from "react";
import styled from "styled-components";


import MainPostList from "./MainPostList";
import Button from "../../elements/Button";

const MainMenu = () => {
    const [best, setBest] = useState(true);
    const besthandler = () => {
        setBest(true)
    }
    const latesthandler = () => {
        setBest(false)
    }
    return (
        <>
            <StMenuset>
                <Button
                    size="medium"
                    variant={best ? "primary" : "gray"}
                    onClick={besthandler}
                >BEST</Button>
                <Button
                    size="medium"
                    variant={best ? "gray" : "primary"}
                    onClick={latesthandler}
                >실시간</Button>
            </StMenuset>
            <MainPostList best={best}/>
        </>
    )
}

export default MainMenu;
const StMenuset = styled.div`
  display: flex;
  button {
    margin-right: 1.5rem;
  }
`;