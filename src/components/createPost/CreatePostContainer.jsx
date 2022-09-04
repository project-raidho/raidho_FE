import React from "react";
import CreatePostImage from "./CreatePostImage";
import CreatePostContent from "./CreatePostContent";
import CreatePostTags from "./CreatePostTags";
import Button from "../../elements/Button";
import styled from "styled-components";

const CreatePostContainer = () => {

  const selectedTags = (tags) => {
		console.log(tags);
	};
  const locationTags = (tags) => {
		console.log("location", tags);
	};
  const typedPostContent = (text) => {
    console.log("typedPostContent", text);
  }

  return(
    <StCreatePostContainerWrap>
      <StCreatePostColumn>
        <CreatePostImage />
      </StCreatePostColumn>
      <StCreatePostColumn>
        <CreatePostContent 
          typedPostContent={typedPostContent}
        />
        <CreatePostTags 
          selectedTags={locationTags}  
          tags={['서울']}  
          tagMassage={'위치를 입력해주세요!'} 
        />
        <CreatePostTags 
          selectedTags={selectedTags} 
          tags={['자전거여행']}
          tagMassage={'태그를 입력해주세요!'} 
        />
        <StButtonWrap>
          <Button 
            size="small" 
            variant="gray"
          >
            취소
          </Button>
          <Button
            size="small"
          >
            등록
          </Button>
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