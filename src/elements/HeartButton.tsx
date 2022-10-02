import React from "react";
import styled from "styled-components";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";

const HeartButton = ({
  like,
  onClick,
}: {
  like: boolean;
  onClick: UseMutateFunction<void, unknown, void, unknown>;
}) => {
  return (
    <StHeart onClick={onClick}>
      {like ? (
        <IoIosHeart className="heart" />
      ) : (
        <IoIosHeartEmpty className="emptyHeart" />
      )}
    </StHeart>
  );
};

export default HeartButton;

const StHeart = styled.span`
  width: 20px;
  height: 20px;
  cursor: pointer;
  svg {
    width: 95%;
    height: 95%;
    object-fit: contain;
  }
  .emptyHeart > path {
    color: var(--title-color);
  }
  .heart > path {
    color: var(--red-color);
  }
`;
