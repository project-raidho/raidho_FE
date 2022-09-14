import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Button from "../../elements/Button";
import styled from "styled-components";

// ::: 이미지 크롭 사전 세팅
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
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const [buttonActive, setButtonActive] = useState(0);
  const [crop, setCrop] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [uploadImages, setUploadImages] = useState([]);
  const [aspect, setAspect] = useState(16 / 9);
  const [saveImagesIndex, setSaveImagesIndex] = useState([]);
  const [saveImageValidationMsg, setSaveImageTagValidationMsg] = useState("");
  const [saveButtonStatus, setSaveButtonStatus] = useState(true);

  const aspectButtonList = [
    {
      index: 0,
      aspect: 16 / 9,
      content: "16 : 9",
      isSelected: false,
    },
    {
      index: 1,
      aspect: 3 / 4,
      content: "3 : 4",
      isSelected: false,
    },
    {
      index: 2,
      aspect: 1 / 1,
      content: "1 : 1",
      isSelected: false,
    },
  ];

  // ::: 이미지 비율 버튼 클릭 이벤트
  const onClickImageSize = (selectAspect, index) => {
    const alertMessageImageSize = window.confirm(
      "이미지 비율 버튼을 선택하면, 지금까지 편집한 이미지 내용이 초기화 됩니다. 그래도 계속 진행하시겠어요?"
    );
    if (alertMessageImageSize) {
      const { width, height } = imageRef.current;
      setAspect(selectAspect);
      setCrop(centerAspectCrop(width, height, selectAspect));
      setUploadImages([]);
      setButtonActive(index);
      setSaveImagesIndex([]);
      setSaveImageTagValidationMsg("");
      setSaveButtonStatus(true);
    }
    return false;
  };

  // ::: 이미지 로드 되었을 때
  const onImageLoad = (event) => {
    const { width, height } = event.currentTarget;
    setCrop(centerAspectCrop(width, height, aspect));
    setSaveImageTagValidationMsg("");
  };

  // ::: 크롭 영역 canvas에 넣기
  const createCanvas = useCallback(() => {
    if (!completedCrop || !canvasRef.current || !imageRef.current) {
      return;
    }
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const cropping = completedCrop;
    const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
    const scaleY = imageRef.current.naturalHeight / imageRef.current.height;
    const pixelRatio = window.devicePixelRatio;

    canvasRef.current.width = cropping.width * pixelRatio * scaleX;
    canvasRef.current.height = cropping?.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      imageRef.current,
      cropping.x * scaleX,
      cropping.y * scaleY,
      cropping.width * scaleX,
      cropping.height * scaleY,
      0,
      0,
      cropping.width * scaleX,
      cropping.height * scaleY
    );
  }, [completedCrop]);

  // ::: 이미지 저장하기 버튼 클릭하기
  const onChangeCropImage = (event) => {
    if (saveButtonStatus === false) {
      alert("이미 이미지 저장이 완료되었습니다.");
      return;
    }
    createCanvas();
    if (!canvasRef.current) return;

    // ::: 캔버스 이미지 파일 형식 변환해서 서버 전송 준비
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

    // ::: 편집 완료한 이미지 체크
    setSaveImagesIndex([...saveImagesIndex, selectedImageIndex]);
    setSaveImageTagValidationMsg(
      `${selectedImageIndex + 1}번째 이미지가 성공적으로 저장되었습니다.`
    );
  };

  // ::: CreatePostContainer 컨포넌트로 저장된 이미지 보내기
  selectedPostImages(uploadImages);

  // ::: 썸네일 이미지 출력하기
  const thumbs = files.map((file, index) => (
    <StThumb
      key={file.name}
      onClick={() => clickThumbImage(file, index)}
      className={selectedImageIndex === index ? "doing" : "doingNot"}
    >
      <span className="thumbIndex">{index + 1}</span>
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
    // ::: 편집완료한 이미지 체크하기
    const checkDuplicateImage = saveImagesIndex.filter(
      (imageIndex) => imageIndex === index
    ).length;
    if (checkDuplicateImage < 1) {
      setSelectedImage(URL.createObjectURL(file));
      setSelectedImageIndex(index);

      // ::: 썸네일 클릭시 이미지 미리보기 되게 하기
      const { width, height } = imageRef.current;
      setCrop(centerAspectCrop(width, height, aspect));
    } else {
      alert("이미 저장한 이미지입니다!");
    }
  };

  useEffect(() => {
    // ::: 썸네일 이미지 미리보기
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  useEffect(() => {
    // ::: 이미지 저장이 완료되었는지 체크하기
    if (saveImagesIndex.length === files.length) {
      setSaveButtonStatus(false);
      alert("이미지 업로드 하기가 완료되었습니다!");
    }
  }, [saveImagesIndex, files]);

  // ::: 이미지 미리보기 편집할 때마다 확인 할 수 있게 설정
  useEffect(() => {
    createCanvas();
  }, [completedCrop, createCanvas, crop]);

  // ::: 확인용 console
  console.log(
    "::: CreatePostImageCrop : 최종 이미지 업로드 파일 ===>",
    uploadImages
  );

  return (
    <StCreatePostImageCrop>
      <p className="guideText">
        <span>1</span>편집을 원하시는 이미지 비율을 선택해주세요!
      </p>
      <StImageSizeButtonWrap>
        {aspectButtonList.map((button, index) => (
          <span
            key={button.index}
            onClick={() => onClickImageSize(Number(button.aspect), index)}
            className={
              button.index === buttonActive ? "activeButton" : "inactiveButton"
            }
          >
            {button.content}
          </span>
        ))}
      </StImageSizeButtonWrap>
      <div className="guideRow">
        <p className="guideText numberTwo">
          <span>2</span>이미지를 원하시는 형태로 조절해주세요!
        </p>
        <p className="guideText numberThree">
          <span>3</span>조절한 이미지를 미리보기를 통해 확인해주세요!
        </p>
      </div>
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
          <div className="postImageCropBottom">
            <p className="guideText">
              <span>4</span>편집이 완료되었다면, 저장하기 버튼을 눌러 주세요!
            </p>
            <StValidationMsg>{saveImageValidationMsg}</StValidationMsg>
            <p className="saveButtonWrap">
              <Button
                size="squareTheme"
                variant="lineBlue"
                onClick={onChangeCropImage}
              >
                저장하기
              </Button>
            </p>
          </div>
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

  .guideRow {
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 100%;
  }

  .guideText {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 30px;
    font-size: 1.3rem;
    margin-bottom: 1rem;

    &.numberTwo {
      width: calc(50% + 70px);
    }

    &.numberThree {
      width: calc(50% - 70px);
    }

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
  align-items: flex-start;
  justify-content: space-between;
  width: calc(50% - 70px);
  height: 532px;
  border: 1px solid var(--gray-color);

  &:last-child {
    border: 0px solid var(--gray-color);
  }

  .ReactCrop {
    display: flex;
  }
  .ReactCrop__child-wrapper {
  }

  .originImage {
    max-width: 100%;
    max-height: 100%;
  }

  .postImageCropBottom {
    width: 100%;
  }
  .saveButtonWrap {
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
    margin-right: 10px;
    border: 1px solid #000;
    color: #000;
    border-radius: 5px;

    &.activeButton {
      background-color: var(--main-color);
    }
    &.inactiveButton {
      background-color: var(--gray-color);
    }
  }
`;

const StCanvasPreview = styled.canvas`
  max-width: 100%;
  min-height: 0px;
  max-height: 420px;
  border: 1px solid var(--gray-color);
`;

const StThumb = styled.div`
  position: relative;
  border: 1px solid var(--gray-color);
  margin-bottom: 8px;
  width: 100px;
  height: 100px;
  &:last-child {
    margin-bottom: 0;
  }
  &.doing {
    border: 3px solid var(--main-color);

    .thumbIndex {
      border: 2px solid var(--main-color);
      background-color: var(--main-color);
    }
  }
  &.doingNot {
    border: 1px solid #000;
  }
  .thumbIndex {
    position: absolute;
    top: 3px;
    right: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    line-height: 1;
    color: #000;
    background-color: var(--gray-color);
    border-radius: 50%;
    border: 1px solid #000;
  }
`;

const StThumbInner = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-width: 0px;
  padding: 2px;
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

const StValidationMsg = styled.p`
  font-size: 1.1rem;
  font-weight: 300;
  font-style: italic;
  color: var(--main-color);
  margin-bottom: 1rem;
`;
