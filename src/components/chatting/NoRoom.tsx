import React from "react";
import styled from "styled-components";

import Info from "../../elements/Info";

const NoRoom = ({ chatListLength }: { chatListLength: number }) => {
  return (
    <StNoRoom>
      <div className="box">
        <h4>
          <Info />
        </h4>
        <p>
          {chatListLength === 0
            ? "참여중인 채팅방이 없습니다."
            : "채팅방을 선택해주세요."}
        </p>
      </div>
    </StNoRoom>
  );
};

const StNoRoom = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: center;
  .box {
    display: flex;
    justify-content: center;
  }
  h4 {
    display: block;
    width: 60px;
    height: 60px;
    background-color: var(--text-color);
    border-radius: 50%;
    border: 1px solid var(--title-color);
    margin-top: 100px;
    margin-left: 20px;
    overflow: hidden;
  }
  p {
    margin-left: 10px;
    margin-top: 115px;
    font-size: 1.5rem;
    @media ${(props) => props.theme.mobile} {
      font-size: 1.2rem;
    }
  }
`;

export default NoRoom;
