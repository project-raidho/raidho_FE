import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CreatePostImage from "./CreatePostImage";
import CreatePostContent from "./CreatePostContent";
import CreatePostTags from "./CreatePostTags";
import Button from "../../elements/Button";
import styled from "styled-components";

const CreatePostContainer = () => {
  const navigate = useNavigate();

  // ::: 입력된 데이터 취합하기
  const [postImages, setPostImages] = useState([]);
  const [postContent, setpostContent] = useState("");
  const [postTags, setPostTags] = useState([]);
  const [postLocationTags, setPostLocationTags] = useState([]);

  const selectedPostImages = (images) => {
    console.log("selectedPostImages", images);
    setPostImages(images);
  };
  const typedPostContent = (text) => {
    console.log("typedPostContent", text);
    setpostContent(text);
  };

  const selectedTags = (tags) => {
    console.log(tags);
    setPostTags(tags);
  };

  const locationTags = (tags) => {
    console.log("location", tags);
    setPostLocationTags(tags);
  };

  const URI = process.env.REACT_APP_BASE_URI;
  // ::: 서버전송세팅
  const onCreatePost = async () => {
    try {
      const postResponse = await axios.post(
        `${URI}/api/post`,
        {
          file: postImages,
          content: postContent,
          tags: postTags,
          locationTags: postLocationTags,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("Authorization"),
          },
        }
      );

      console.log("postResponse", postResponse.data);
    } catch (error) {
      console.log("게시글 등록 데이터 전송 오류가 났습니다!", error);
    }
  };

  return (
    <StCreatePostContainerWrap>
      <StCreatePostColumn>
        <CreatePostImage selectedPostImages={selectedPostImages} />
      </StCreatePostColumn>
      <StCreatePostColumn>
        <CreatePostContent typedPostContent={typedPostContent} />
        <CreatePostTags
          selectedTags={locationTags}
          tags={["서울"]}
          tagMassage={"위치를 입력해주세요!"}
        />
        <CreatePostTags
          selectedTags={selectedTags}
          tags={["자전거여행"]}
          tagMassage={"태그를 입력해주세요!"}
        />
        <StButtonWrap>
          <Button
            size="small"
            variant="gray"
            onClick={() => {
              navigate(-1);
            }}
          >
            취소
          </Button>
          <Button size="small" onClick={onCreatePost}>
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
