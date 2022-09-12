import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import CreatePostImageCrop from './CreatePostImageCrop';

interface Props {
  selectedPostImages: Blob[] | null;
}

function CreatePostImage({ selectedPostImages }: Props) {
  const [files, setFiles] = useState<object[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [fileRejectionsMessage, setFileRejectionsMessage] = useState(null);
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file: File) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
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
          </>,
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
  const clickThumbImage = (file: File, index: number) => {
    setSelectedImage(URL.createObjectURL(file));
    setSelectedImageIndex(index);
  };

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <StCreatePostImageWrap>
      {files.length !== 0 ? (
        <CreatePostImageCrop
          files={files}
          selectedImage={selectedImage}
          selectedImageIndex={selectedImageIndex}
          selectedPostImages={selectedPostImages}
        />
      ) : (
        <StImageDropZone {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>이미지를 드레그 또는 클릭해서 선택해주세요.</p>
        </StImageDropZone>
      )}

      <StThumbsContainer>{thumbs}</StThumbsContainer>
      <StAlertMessage>{fileRejectionsMessage}</StAlertMessage>
    </StCreatePostImageWrap>
  );
}

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
  height: 100px;
  border: 1px dashed var(--gray-color);
  border-radius: 20px;
  background-color: var(--bg-color);
  cursor: pointer;

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
  min-height: 100px;
  flex-direction: row;
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
