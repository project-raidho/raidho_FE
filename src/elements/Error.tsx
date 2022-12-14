import React from "react";
import styled from "styled-components";
import { MdOutlineError } from "react-icons/md";

const Error = ({ message }: { message: string }) => {
  return (
    <StError>
      <MdOutlineError />
      <p>{message}</p>
    </StError>
  );
};

export default Error;

const StError = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 80px;
  margin: 10px auto;

  svg {
    width: 40px;
    height: 40px;
    path {
      color: var(--red-color);
    }
  }

  p {
    margin-top: 0.5rem;
  }

  @media (max-width: 639px) {
    svg {
      width: 30px;
      height: 30px;
    }
  }
`;
