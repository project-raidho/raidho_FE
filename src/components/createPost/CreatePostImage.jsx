import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import CreatePostImageCrop from "./CreatePostImageCrop";
import styled from "styled-components";

const CreatePostImage = ({ selectedPostImages }) => {
  const [files, setFiles] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [fileRejectionsMessage, setFileRejectionsMessage] = useState(null);
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      // ::: 편집화면 첫 이미지는 첫번째 이미지로 설정
      setSelectedImage(acceptedFiles[0].preview);
    },
    maxFiles: 5, // ::: 최대 이미지 개수 설정하기
  });

  // ::: 최대 이미지보다 많은 이미지를 넣게 되면 에러 메시지 나타내기
  useEffect(() => {
    fileRejections.length > 0
      ? setFileRejectionsMessage(
          <>
            <span>- 이미지는 최대 5장까지 업로드가 가능합니다!</span> <br />
            <strong>현재 업로드한 이미지 개수 : {fileRejections.length}</strong>
          </>
        )
      : setFileRejectionsMessage(null);
  }, [fileRejections]);

  // ::: 썸네일 이미지 출력하기
  const thumbs = files.map((file, index) => (
    <StThumb key={file.name} onClick={() => clickThumbImage(file, index)}>
      <StThumbInner>
        <img
          src={file.preview}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
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
  };

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <StCreatePostImageWrap>
      {files.length === 0 && (
        <StImageDropZone {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>
            해당 영역을 클릭하거나 이미지 파일을 드레그하여 업로드할 이미지를
            선택해주세요. <br />
            최대 5장까지 업로드 가능합니다.
          </p>
        </StImageDropZone>
      )}
      <StAlertMessage>{fileRejectionsMessage}</StAlertMessage>
      <StPostImageCropWrap>
        <StThumbsContainer>{thumbs}</StThumbsContainer>
        {files.length !== 0 && (
          <CreatePostImageCrop
            files={files}
            selectedImage={selectedImage}
            selectedImageIndex={selectedImageIndex}
            selectedPostImages={selectedPostImages}
          />
        )}
      </StPostImageCropWrap>
    </StCreatePostImageWrap>
  );
};

export default CreatePostImage;

const StCreatePostImageWrap = styled.div`
  width: 100%;
`;

const StImageDropZone = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 150px;
  border: 1px solid var(--gray-color);
  background-color: var(--bg-color);
  cursor: pointer;

  p {
    text-align: center;
    font-size: 1.2rem;
    line-height: 1.5;
  }
`;

const StPostImageCropWrap = styled.div``;

const StThumb = styled.div`
  display: inline-flex;
  border-radius: 2px;
  border: 1px solid #eaeaea;
  margin-bottom: 8px;
  margin-right: 8px;
  width: 100px;
  height: 100px;
  padding: 4px;
`;

const StThumbInner = styled.div`
  display: flex;
  width: 100%;
  min-width: 0px;
  overflow: hidden;
  background-color: var(--bg-color);

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StThumbsContainer = styled.aside`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 16px;
  background-color: var(--bgSub-color);
`;

const StAlertMessage = styled.p`
  line-height: 1.3;
  font-style: italic;
  margin-top: 1rem;

  span,
  strong {
    color: var(--red-color);
  }

  strong {
    text-decoration: underline;
    padding-left: 10px;
  }
`;
