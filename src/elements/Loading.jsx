import React from "react";
import styled from "styled-components";
import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <StLoadingWrap>
      <FaSpinner />
    </StLoadingWrap>
  );
};

export default Loading;

const StLoadingWrap = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 40px;
  margin: 10px auto;

  svg {
    width: 40px;
    height: 40px;
    animation: spin 2s linear infinite;

    path {
      color: var(--title-color);
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
