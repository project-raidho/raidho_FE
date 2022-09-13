import React from "react";
import GlobalHeader from "../global/GlobalHeader";
import GlobalLayout from "../global/GlobalLayout";
import UpdatePostContainer from "../components/updatePost/UpdatePostContainer";
import styled from "styled-components";

const UpdatePostPage = () => {
  return (
    <StUpdatePostPageWrap>
      <GlobalHeader />
      <GlobalLayout>
        <UpdatePostContainer />
      </GlobalLayout>
    </StUpdatePostPageWrap>
  );
};

export default UpdatePostPage;

const StUpdatePostPageWrap = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: var(--bg-color);
`;
