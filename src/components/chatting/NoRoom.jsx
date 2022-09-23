import React from "react";
import styled from "styled-components";

const NoRoom = (props) => {
  return <Container> 선택한 채팅방이 없습니다!!</Container>;
};

const Container = styled.div`
  width: 70%;
  height: 100%;
  background-color: #9bbbd4;
  background-image: url("miniproject-7.png");
  background-size: cover;
  background-position: center center;
`;

export default NoRoom;
