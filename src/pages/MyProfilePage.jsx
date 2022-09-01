import React from "react";
import GlobalLayout from "../global/GlobalLayout";
import GlobalHeader from "../global/GlobalHeader";
import MyProfileContainer from "../components/myProfile/MyProfileContainer";
import styled from "styled-components";

const MyProfilePage = () => {

  return(
    <StMyProfilePageWrap>
      <GlobalHeader />
      <GlobalLayout>
        <MyProfileContainer />
      </GlobalLayout>
    </StMyProfilePageWrap>
  );
};

export default MyProfilePage;

const StMyProfilePageWrap = styled.div`
  min-height: 100vh;
  background-color: var(--bg-color);
`;