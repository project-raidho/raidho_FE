import React from "react";
import Button from "../../elements/Button";
import styled from "styled-components";

const UpdateMyProfile = () => {

  return(
    <StUpdateMyProfileWrap>
      <StMyProfileBox>
        <p>
          <img src="https://avatars.githubusercontent.com/u/99028253?s=400&u=678da99d93c1eab91489f73b080993fb689c56b4&v=4" alt="유저 프로필 이미지" />
        </p>
        <dl>
          <dt>닉네임</dt>
          <dd>한 줄 소개</dd>
        </dl>
      </StMyProfileBox>
      <Button size="square" variant="lineSquare">프로필 편집</Button>
    </StUpdateMyProfileWrap>
  );
};

export default UpdateMyProfile;

const StUpdateMyProfileWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 120px;
  background-color: var(--bg-color);
`;

const StMyProfileBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;

  p {
    width: 120px;
    height: 120px;
    border: 1px solid var(--gray-color);
    border-radius: 50%;
    margin-right: 35px;
    overflow: hidden;
    object-fit: contain;

    img {
      width: 100%;
      height: 100%;
    }
  }

  dl {
    dt {
      display: flex;
      align-items: center;
      height: 54px;
      font-size: 2.25rem;
    }
    dd {
      display: flex;
      align-items: flex-start;
      height: 66px;
      font-size: 1.5rem;
    }
  }
`;