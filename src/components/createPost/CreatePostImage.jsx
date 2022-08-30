import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

const CreatePostImage = (props) => {
  const [files, setFiles] = useState([]);
  const {
    getRootProps, 
    getInputProps
  } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });
  
  const thumbs = files.map(file => (
    <StThumb key={file.name} onClick={() => clickThumbImage()}>
      <StThumbInner>
        <img
          src={file.preview}
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
          alt={file.name}
        />
      </StThumbInner>
    </StThumb>
  ));

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  const clickThumbImage = () => {}
  return(
    <StCreatePostImageWrap>
      <StImageDropZone {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>이미지를 드레그 또는 클릭해서 선택해주세요.</p>
      </StImageDropZone>
      <StThumbsContainer>
        {thumbs}
      </StThumbsContainer>
    </StCreatePostImageWrap>
  );
};

export default CreatePostImage;

const StCreatePostImageWrap = styled.div`
  width: 100%;
  background-color: ivory;
`;

const StImageDropZone = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  border: 1px solid var(--gray-color);
  border-radius: 20px;

  p {
    text-align: center;
  }
  
`;

const StThumb = styled.div`
  display: inline-flex;
  border-radius: 2px;
  border: 1px solid #eaeaea;
  margin-bottom: 8px;
  margin-right: 8px;
  width: 100px;
  height: 100px;
  padding: 4px;
  border: 1px solid red;
`;

const StThumbInner = styled.div`
  display: flex;
  width: 100%;
  min-width: 0px;
  overflow: hidden;
  background-color: pink;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StThumbsContainer = styled.aside`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16px;
  background-color: yellow;
`;