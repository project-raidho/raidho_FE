import React from "react";

import MyProfileContainer from "../components/myProfile/MyProfileContainer";
import styled from "styled-components";

const MyProfilePage = () => {
  return (
    <StMyProfilePageWrap>
      <MyProfileContainer />
    </StMyProfilePageWrap>
  );
};

export default MyProfilePage;

const StMyProfilePageWrap = styled.div``;
