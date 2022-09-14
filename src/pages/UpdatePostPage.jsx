import React from "react";

import UpdatePostContainer from "../components/updatePost/UpdatePostContainer";
import styled from "styled-components";

const UpdatePostPage = () => {
  return (
    <StUpdatePostPageWrap>
      <UpdatePostContainer />
    </StUpdatePostPageWrap>
  );
};

export default UpdatePostPage;

const StUpdatePostPageWrap = styled.div`
  width: 100%;
`;
