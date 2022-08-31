import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import CreatePostImageCrop from "./CreatePostImageCrop";
import styled from "styled-components";

const CreatePostImage = (props) => {
  const [files, setFiles] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [selectedImageIndex, setSelectedImageIndex] = useState();
  const {
    getRootProps, 
    getInputProps,
    fileRejections
  } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
      // ::: 편집화면 첫 이미지는 첫번째 이미지로 설정
      setSelectedImage(acceptedFiles[0].preview);
    },
    maxFiles:5 // ::: 최대 이미지 개수 설정하기
  });

  // ::: 최대 이미지보다 많은 이미지를 넣게 되면 에러 메시지 나타내기
  const fileRejectionItems = fileRejections.map(({ file, errors  }) => { 
    return (
      <li key={file.path}>
           {file.path} - {file.size} bytes
           <ul>
             {errors.map(error => <li key={error.code}> 이미지는 최대 5장까지만 넣을 수 있습니다 / {error.message}</li>)}
          </ul>
      </li>
    ) 
   });
  
   // ::: 썸네일 이미지 출력하기
  const thumbs = files.map((file, index) => (
    <StThumb key={file.name} onClick={() => clickThumbImage(file, index)}>
      <StThumbInner>
        <img
          src={file.preview}
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
          alt={file.name}
        />
      </StThumbInner>
    </StThumb>
  ));
  
  // ::: 썸네일 이미지 클릭시 편집 화면에 이미지 띄우기
  const clickThumbImage = (file, index) => {
    console.log(file, index);
    setSelectedImage(URL.createObjectURL(file));
    setSelectedImageIndex(index);
  }

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return(
    <StCreatePostImageWrap>
      {files.length !== 0 ? 
        <CreatePostImageCrop 
          files={files}
          selectedImage={selectedImage} 
          selectedImageIndex={selectedImageIndex} 
        />
      :
        <StImageDropZone {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />
          <p>이미지를 드레그 또는 클릭해서 선택해주세요.</p>
        </StImageDropZone>
      }

      <StThumbsContainer>
        {thumbs}
      </StThumbsContainer>

      <ul>{fileRejectionItems}</ul>
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