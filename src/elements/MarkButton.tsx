import React from "react";
import styled from "styled-components";
import { RiBookmarkLine } from "react-icons/ri";
import { RiBookmarkFill } from "react-icons/ri";

const MarkButton = ({
  star,
  onClick,
}: {
  star: boolean;
  onClick: React.MouseEventHandler<HTMLSpanElement>;
}) => {
  return (
    <StMarkButton onClick={onClick}>
      {star ? (
        <RiBookmarkFill className="mark" />
      ) : (
        <RiBookmarkLine className="emptyMark" />
      )}
    </StMarkButton>
  );
};

export default MarkButton;

const StMarkButton = styled.span`
  cursor: pointer;
  svg {
    width: 95%;
    height: 95%;
    object-fit: contain;
  }
  svg.mark {
    path {
      color: var(--lightBlue-color);
    }
  }
  svg.emptyMark {
    path {
      color: var(--gray-color);
    }
  }
`;
