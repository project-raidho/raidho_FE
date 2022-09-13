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

const CreatePostImageCrop = ({
  files,
  selectedImage,
  selectedImageIndex,
  selectedPostImages,
  setSelectedImageIndex,
  setSelectedImage,
}) => {
  const refImageSizeButton = useRef(null);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const [crop, setCrop] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [uploadImages, setUploadImages] = useState([]);
  const [aspect, setAspect] = useState(16 / 9);

  // ::: 이미지 비율 버튼 클릭 이벤트
  const onClickImageSize = (selectAspect, event) => {
    const alertMessageImageSize = window.confirm(
      "이미지 비율 버튼을 선택하면, 지금까지 편집한 이미지 내용이 초기화 됩니다. 그래도 계속 진행하시겠어요?"
    );
    if (alertMessageImageSize) {
      console.log(selectAspect);
      const { width, height } = imageRef.current;
      setAspect(selectAspect);
      setCrop(centerAspectCrop(width, height, selectAspect));
      setUploadImages([]);

      event.target.classList.add("activeButton");
    }
    return false;
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

    const imgBase64 = canvasRef.current.toDataURL(
      "image/jpeg",
      "image/octet-stream"
    );
    const decodImg = atob(imgBase64.split(",")[1]);

    let array = [];
    for (let i = 0; i < decodImg.length; i++) {
      array.push(decodImg.charCodeAt(i));
    }
    const file = new Blob([new Uint8Array(array)], { type: "image/jpeg" });
    setUploadImages([...uploadImages, file]);
  };

  // ::: 이미지 미리보기 편집할 때마다 확인 할 수 있게 설정
  useEffect(() => {
    createCanvas();
  }, [completedCrop, createCanvas]);

  console.log("uploadImages ::::", uploadImages);
  console.log("imagesTemp ::::", imagesTemp);
  console.log("selectedImageIndex ::::", selectedImageIndex);

  selectedPostImages(uploadImages);

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
    <StCreatePostImageCrop>
      <p className="guideText">
        <span>1</span>편집을 원하시는 이미지 비율을 선택해주세요!
      </p>
      <StImageSizeButtonWrap>
        <span
          ref={refImageSizeButton}
          onClick={(event) => onClickImageSize(Number(16 / 9), event)}
        >
          16 : 9
        </span>
        <span
          ref={refImageSizeButton}
          onClick={(event) => onClickImageSize(Number(3 / 4), event)}
        >
          3 : 4
        </span>
        <span
          ref={refImageSizeButton}
          onClick={(event) => onClickImageSize(Number(1 / 1), event)}
        >
          1 : 1
        </span>
      </StImageSizeButtonWrap>
      <StPostImageCropWrap>
        <StThumbsContainer>{thumbs}</StThumbsContainer>
        <StPostImageCropColumn>
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
        </StPostImageCropColumn>
        <StPostImageCropColumn>
          <StCanvasPreview ref={canvasRef} />

          <p>
            <Button
              size="squareTheme"
              variant="lineBlue"
              onClick={onChangeCropImage}
            >
              저장하기
            </Button>
          </p>
        </StPostImageCropColumn>
      </StPostImageCropWrap>
    </StCreatePostImageCrop>
  );
};

export default CreatePostImageCrop;
const StCreatePostImageCrop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;

  .guideText {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 30px;
    font-size: 1.3rem;
    margin-bottom: 1rem;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      background-color: var(--main-color);
      color: var(--text-color);
      font-size: 1.3rem;
      line-height: 1;
      margin-right: 1rem;
      border-radius: 50%;
    }
  }
`;

const StPostImageCropWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
`;

const StPostImageCropColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: calc(50% - 70px);
  height: 532px;
  border: 1px solid var(--gray-color);

  &:last-child {
    border: 0px solid var(--gray-color);
  }

  .originImage {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  p {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
`;

const StImageSizeButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid var(--gray-color);
  padding-bottom: 1rem;
  margin-bottom: 2rem;

  span {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 55px;
    font-size: 1.5rem;
    line-height: 1;
    background-color: var(--gray-color);
    margin-right: 10px;
    border: 1px solid #000;
    color: #000;
    border-radius: 5px;

    &.activeButton {
      background-color: var(--main-color);
    }
  }
`;

const StCanvasPreview = styled.canvas`
  max-width: 100%;
  min-height: 0px;
  max-height: 80%;
  border: 1px solid var(--gray-color);
  margin-top: 1rem;
`;

const StThumb = styled.div`
  display: inline-flex;
  border-radius: 2px;
  border: 1px solid var(--gray-color);
  margin-bottom: 8px;
  width: 100px;
  height: 100px;
  padding: 4px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const StThumbInner = styled.div`
  display: flex;
  width: 100%;
  min-width: 0px;
  overflow: hidden;

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
  background-color: var(--bgSub-color);
`;
