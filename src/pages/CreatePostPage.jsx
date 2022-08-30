import React from "react";
import Input from "../elements/Input";
import styled from "styled-components";

const CreatePostPage = () => {

  return(
    <StCreatePostPageWrap>
      CreatePostPage
      <Input size="medium" variant="default" />
    </StCreatePostPageWrap>
  );
};

export default CreatePostPage;

const StCreatePostPageWrap = styled.div`
  background-color: green;
`;