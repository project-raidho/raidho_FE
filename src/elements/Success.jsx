import React from "react";
import styled from "styled-components";
import { MdCheck } from "react-icons/md";

const Success = () => {
  return (
    <StSuccessWrap>
      <MdCheck />
    </StSuccessWrap>
  );
};

export default Success;

const StSuccessWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: var(--green-color);
  svg {
    width: 70%;
    height: 70%;

    path {
      color: var(--bg-color);
    }
  }
`;
