import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Button from "../../elements/Button";
import styled from "styled-components";

const centerAspectCrop = (mediaWidth, mediaHeight, aspect) => {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 100,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
};

const CreatePostImageCrop = ({ selectedImage, selectedImageIndex }) => {
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const [crop, setCrop] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [uploadImages, setUploadImages] = useState([]);
  const [aspect, setAspect] = useState(16 / 9);

  // ::: 이미지 비율 버튼 클릭 이벤트
  const onClickImageSize = (selectAspect) => {
    console.log(selectAspect);
    const { width, height } = imageRef.current;
    setAspect(selectAspect);
    setCrop(centerAspectCrop(width, height, selectAspect));
  };

  // ::: 이미지 로드 되었을 때
  const onImageLoad = (event) => {
    const { width, height } = event.currentTarget;
    setCrop(centerAspectCrop(width, height, aspect));
    console.log(selectedImageIndex);
  };

  // ::: 크롭 영역 canvas에 넣기
  const createCanvas = useCallback(() => {
    if (!completedCrop || !canvasRef.current || !imageRef.current) {
      return;
    }
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const crop = completedCrop;

    const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
    const scaleY = imageRef.current.naturalHeight / imageRef.current.height;
    const pixelRatio = window.devicePixelRatio;

    canvasRef.current.width = crop.width * pixelRatio * scaleX;
    canvasRef.current.height = crop?.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      imageRef.current,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);

  let imagesTemp = uploadImages;
  const onChangeCropImage = () => {
    createCanvas();
    if (!canvasRef.current) return;

    // ::: canvas를 blob 형태로 만들어서 이미지 업로드하기
    // canvasRef.current.toBlob(
    //   (blob) => uploadCoverImage(blob),
    //   "image/jpeg",
    //   0.95
    // );

    // ::: 전송할 이미지 배열 형태로 저장하기
    const targetUploadImage = () => {
      imagesTemp.splice(selectedImageIndex, 0, completedCrop);
      return imagesTemp;
    };
    setUploadImages(targetUploadImage);
  };

  // ::: 이미지 미리보기 편집할 때마다 확인 할 수 있게 설정
  useEffect(() => {
    createCanvas();
  }, [completedCrop, createCanvas]);

  // console.log("completedCrop ::::", completedCrop);
  // console.log("uploadImages ::::", uploadImages);
  console.log("imagesTemp ::::", imagesTemp);
  console.log("selectedImageIndex ::::", selectedImageIndex);

  return (
    <StCreatePostImageCrop>
      <StImageSizeButtonWrap>
        <Button onClick={() => onClickImageSize(Number(16 / 9))}>16 : 9</Button>
        <Button onClick={() => onClickImageSize(Number(3 / 4))}>3 : 4</Button>
        <Button onClick={() => onClickImageSize(Number(1 / 1))}>1 : 1</Button>
      </StImageSizeButtonWrap>
      <ReactCrop
        crop={crop}
        onChange={(crop) => setCrop(crop)}
        onComplete={(crop) => setCompletedCrop(crop)}
        aspect={aspect}
      >
        <img
          className="originImage"
          src={selectedImage}
          ref={imageRef}
          onLoad={onImageLoad}
          alt="편집할이미지"
        />
      </ReactCrop>

      <StCanvasPreview ref={canvasRef} />

      <Button onClick={onChangeCropImage}>저장하기</Button>
    </StCreatePostImageCrop>
  );
};

export default CreatePostImageCrop;
const StCreatePostImageCrop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 1px solid blue;

  .originImage {
    border: 1px solid yellow;
  }
`;

const StImageSizeButtonWrap = styled.div`
  border: 1px solid orange;

  button {
    margin-right: 10px;
  }
`;

const StCanvasPreview = styled.canvas`
  max-width: 80%;
  min-height: 0;
  max-height: 300px;
  border: 1px solid orange;
`;
