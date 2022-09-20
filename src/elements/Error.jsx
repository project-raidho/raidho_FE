import React from "react";
import styled from "styled-components";
import { MdOutlineError } from "react-icons/md";

const Error = ({ message }) => {
  return (
    <StErrorWrap>
      <MdOutlineError />
      <p>{message}</p>
    </StErrorWrap>
  );
};

export default Error;

const StErrorWrap = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 40px;
  margin: 10px auto;

  svg {
    width: 40px;
    height: 40px;

    path {
      color: var(--red-color);
    }
  }
`;
