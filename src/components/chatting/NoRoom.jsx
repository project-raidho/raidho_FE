import React from "react";
import styled from "styled-components";
import Info from "../../elements/Info";

const NoRoom = (props) => {
  return (
    <Container>
      <h4>
        <Info />
      </h4>
      <p>{"선택한 채팅방이 없습니다"}</p>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-image: url("miniproject-7.png");
  background-size: cover;
  background-position: center center;

  h4 {
    display: block;
    width: 100px;
    height: 100px;
    background-color: var(--text-color);
    border-radius: 50%;
    border: 1px solid var(--title-color);
    margin-top: 30px;
    overflow: hidden;
  }
  p {
    margin-left: 10px;
    margin-top: 60px;
    font-size: 1.5rem;
  }
`;

export default NoRoom;
