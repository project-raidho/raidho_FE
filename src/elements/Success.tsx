import React from "react";
import styled from "styled-components";
import { MdCheck } from "react-icons/md";

const Success = () => {
  return (
    <StSuccess>
      <MdCheck />
    </StSuccess>
  );
};

export default Success;

const StSuccess = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  svg {
    width: 70%;
    height: 70%;

    path {
      color: var(--title-color);
    }
  }
`;
