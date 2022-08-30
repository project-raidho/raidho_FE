import React from "react";
import CreatePostImage from "./CreatePostImage";
import CreatePostContent from "./CreatePostContent";
import Button from "../../elements/Button";
import styled from "styled-components";

const CreatePostContainer = () => {

  return(
    <StCreatePostContainerWrap>
      <StCreatePostColumn>
        <CreatePostImage />
      </StCreatePostColumn>
      <StCreatePostColumn>
        <CreatePostContent />
        <StButtonWrap>
          <Button variant="gray">취소</Button>
          <Button>등록</Button>
        </StButtonWrap>
      </StCreatePostColumn>
    </StCreatePostContainerWrap>
  );
};

export default CreatePostContainer;

const StCreatePostContainerWrap = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
const StCreatePostColumn = styled.div`
  width: 100%;
  padding: 1rem;
  border: 1px solid red;
`;

const StButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  width: 100%;

  button {
    margin-left: 10px;
  }
`;