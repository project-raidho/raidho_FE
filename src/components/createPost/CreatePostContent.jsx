import React from "react";
import styled from "styled-components";

const CreatePostContent = () => {

  const checkKeyPressHash = (event) => {
    console.log(event.code);
    if(event.code === "Digit3" && event.key === "#") {
      console.log("해시를 입력했습니다!");
    }

  }

  return(
    <StCreatePostContentWrap>
      <textarea
        onKeyPress={checkKeyPressHash}
      ></textarea>
      
    </StCreatePostContentWrap>
  );
};

export default CreatePostContent;

const StCreatePostContentWrap = styled.div`
  width: 100%;
 
  textarea {
    width: 100%;
    height: 300px;
    font-size: 2rem;
    background-color: var(--subBg-color);
  }
`;

