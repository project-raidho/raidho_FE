import React from "react";
import styled from "styled-components";
import HeartImg from "../assets/heart.png";
import EmptyHeartImg from "../assets/emptyheart.png";

const HeartButton = ({ like, onClick }) => {
  return <Heart src={like ? HeartImg : EmptyHeartImg} onClick={onClick} />;
};

export default HeartButton;

const Heart = styled.img`
  width: 17px;
  height: 17px;
  cursor: pointer;
`;
