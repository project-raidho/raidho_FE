import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import ReactCrop, { centerCrop, Crop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import AlertModal from "../../global/globalModal/AlertModal";
// import ConfirmModal from "../../global/globalModal/ConfirmModal"
import Potal from "../../global/globalModal/Potal";
import Button from "../../elements/Button";
import styled from "styled-components";

// ::: 이미지 크롭 사전 세팅
const centerAspectCrop = (
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) => {
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

interface CreatePostProps {
  files: Blob[];
  previewFiles: string[];
  selectedImage: string | undefined;
  selectedImageIndex: number;
  selectedPostImages: (images: Blob[]) => void;
  setSelectedImageIndex: Dispatch<SetStateAction<number>>;
  setSelectedImage: Dispatch<SetStateAction<string | undefined>>;
}

interface CropProps {
  height: number;
  unit: string;
  width: number;
  x: number;
  y: number;
}

const CreatePostImageCrop = ({
  files,
  previewFiles,
  selectedImage,
  selectedImageIndex,
  selectedPostImages,
  setSelectedImageIndex,
  setSelectedImage,
}: CreatePostProps) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [buttonActive, setButtonActive] = useState<number>(0);
  const [crop, setCrop] = useState<Crop | undefined>(undefined);
  const [completedCrop, setCompletedCrop] = useState<CropProps | null>(null);
  const [uploadImages, setUploadImages] = useState<Blob[]>([]);
  const [aspect, setAspect] = useState<number>(16 / 9);
  const [saveImagesIndex, setSaveImagesIndex] = useState<number[]>([]);
  const [saveImageValidationMsg, setSaveImageTagValidationMsg] =
    useState<string>("");
  const [saveButtonStatus, setSaveButtonStatus] = useState<boolean>(true);

  // ::: 프로필 편집 모달(createPotal) 컨트롤 하기
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [modalIcon, setModalIcon] = useState<
    "success" | "warning" | "info" | ""
  >("");
  const [alertMsg, setAlertMsg] = useState<string>("");
  const onCloseModal = () => {
    setModalOn(!modalOn);
  };
  const onClickYes = () => {
    setModalOn(!modalOn);
  };

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
  const onClickImageSize = (selectAspect: number, index: number) => {
    const alertMessageImageSize = window.confirm(
      "이미지 비율 버튼을 선택하면, 지금까지 편집한 이미지 내용이 초기화 됩니다. 그래도 계속 진행하시겠습니까?"
    );

    if (alertMessageImageSize) {
      // const { width, height } = imageRef.current;
      const width = imageRef.current?.width ?? null;
      const height = imageRef.current?.height ?? null;
      if (!width || !height) return;

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
  const onImageLoad = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
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

    // ::: 원본 이미지 사이즈에 따라서 비율조절 : 가로 사이즈 1,500픽셀로 맞춤
    const caculatePixelRatio = (originWidth: number, deviceRatio: number) => {
      if (originWidth >= 4000) {
        return deviceRatio * 0.37;
      } else if (originWidth >= 3000) {
        return deviceRatio * 0.5;
      } else if (originWidth >= 2000) {
        return deviceRatio * 0.75;
      } else {
        return deviceRatio;
      }
    };

    const pixelRatio = caculatePixelRatio(imageRef.current.naturalWidth, 1);
    // window.devicePixelRatio ===> 1(기본값)

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
  const onChangeCropImage = () => {
    if (saveButtonStatus === false) {
      setModalIcon("info");
      setAlertMsg("이미 이미지 저장이 완료되었습니다.");
      setModalOn(true);
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
      key={index}
      onClick={() => clickThumbImage(file, index)}
      className={selectedImageIndex === index ? "doing" : "doingNot"}
    >
      <span className="thumbIndex">{index + 1}</span>
      <StThumbInner>
        <img
          src={previewFiles[index]}
          onLoad={() => {
            URL.revokeObjectURL(previewFiles[index]);
          }}
          alt="썸네일"
        />
      </StThumbInner>
    </StThumb>
  ));

  // ::: 썸네일 이미지 클릭시 편집 화면에 이미지 띄우기
  const clickThumbImage = (file: File, index: number) => {
    // ::: 편집완료한 이미지 체크하기
    const checkDuplicateImage = saveImagesIndex.filter(
      (imageIndex) => imageIndex === index
    ).length;
    if (checkDuplicateImage < 1) {
      setSelectedImage(URL.createObjectURL(file));
      setSelectedImageIndex(index);

      // ::: 썸네일 클릭시 이미지 미리보기 되게 하기
      const width = imageRef.current?.width ?? null;
      const height = imageRef.current?.height ?? null;
      if (!width || !height) return;
      setCrop(centerAspectCrop(width, height, aspect));
    } else {
      setModalIcon("info");
      setAlertMsg("이미 저장한 이미지입니다!");
      setModalOn(true);
    }
  };

  useEffect(() => {
    // ::: 썸네일 이미지 미리보기
    return () => previewFiles.forEach((file) => URL.revokeObjectURL(file));
  }, [previewFiles]);

  useEffect(() => {
    // ::: 이미지 저장이 완료되었는지 체크하기
    if (saveImagesIndex.length === files.length) {
      setSaveButtonStatus(false);
      setModalIcon("success");
      setAlertMsg("이미지 업로드 하기가 완료되었습니다!");
      setModalOn(true);
    }
  }, [saveImagesIndex, files]);

  // ::: 이미지 미리보기 편집할 때마다 확인 할 수 있게 설정
  useEffect(() => {
    createCanvas();
  }, [completedCrop, createCanvas, crop]);

  return (
    <StCreatePostImageCrop>
      <p className="guideText">
        <span>1</span>편집을 원하시는 이미지 비율을 선택해주세요.
      </p>
      <StImageSizeButtonWrap>
        {aspectButtonList.map((button, index) => (
          <p
            key={button.index}
            onClick={() => onClickImageSize(Number(button.aspect), index)}
            className={
              button.index === buttonActive ? "activeButton" : "inactiveButton"
            }
          >
            <span></span>
            <strong>{button.content}</strong>
          </p>
        ))}
      </StImageSizeButtonWrap>
      <div className="guideRow">
        <p className="guideText numberTwo">
          <span>2</span>이미지를 원하시는 형태로 조절해주세요.
        </p>
        <p className="guideText numberThree viewDesktop">
          <span>3</span>조절한 이미지를 미리보기를 통해 확인해주세요.
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
          <p className="guideText viewMobile">
            <span>3</span>조절한 이미지를 미리보기를 통해 확인해주세요.
          </p>
          <StCanvasPreview ref={canvasRef} />
          <div className="postImageCropBottom">
            <p className="guideText">
              <span>4</span>편집이 완료되었다면, 저장하기 버튼을 눌러 주세요.
            </p>
            <StValidationMsg>{saveImageValidationMsg}</StValidationMsg>
            <p className="saveButtonWrap">
              <Button
                size="small"
                variant="linePrimary"
                onClick={onChangeCropImage}
              >
                저장하기
              </Button>
            </p>
          </div>
        </StPostImageCropColumn>
      </StPostImageCropWrap>

      <Potal>
        {modalOn && (
          <AlertModal
            onCloseModal={onCloseModal}
            modalIcon={modalIcon}
            alertMsg={alertMsg}
            onClickYes={onClickYes}
          />
        )}
      </Potal>
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
    font-size: 1rem;
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
      width: 20px;
      height: 20px;
      background-color: var(--gray-color);
      color: var(--text-color);
      font-size: 0.8rem;
      line-height: 1;
      margin-right: 0.5rem;
      border-radius: 50%;
    }
  }
  .viewMobile {
    display: none;
  }

  @media (max-width: 767px) {
    .viewMobile {
      display: flex;
    }
    .viewDesktop {
      display: none;
    }
    .guideText {
      &.numberTwo {
        width: 100%;
      }
    }
  }
`;

const StPostImageCropWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 1023px) {
  }
  @media (max-width: 767px) {
    flex-direction: column;
  }
  @media (max-width: 639px) {
  }
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

  @media (max-width: 767px) {
    width: 100%;
    height: auto;
    margin: 1rem 0;
  }
`;

const StImageSizeButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding-bottom: 1rem;
  margin-bottom: 1rem;

  p {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-right: 50px;

    span {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      border: 1px solid var(--gray-color);
      background-color: var(--bg-color);
      margin-right: 8px;
    }
    strong {
      color: var(--gray-color);
      font-size: 300;
    }

    &.activeButton span {
      border: 1px solid var(--blue-color);
      background-color: var(--main-color);
    }
    &.inactiveButton span {
      border: 1px solid var(--gray-color);
      background-color: var(--bg-colr);
    }
  }
`;

const StCanvasPreview = styled.canvas`
  max-width: 100%;
  min-height: 0px;
  max-height: 420px;
  border: 1px solid var(--gray-color);

  @media (max-width: 767px) {
    max-height: 300px;
    margin-bottom: 1rem;
  }
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
    border: 2px solid var(--main-color);

    .thumbIndex {
      border: 2px solid var(--main-color);
      background-color: var(--main-color);
    }
  }
  &.doingNot {
    border: 0px solid #000;
  }
  .thumbIndex {
    position: absolute;
    top: 3px;
    right: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    font-size: 0.8rem;
    line-height: 1;
    color: var(--title-color);
    background-color: var(--bg-color);
    border-radius: 50%;
  }

  @media (max-width: 767px) {
    margin-right: 8px;
  }
`;

const StThumbInner = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
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

  @media (max-width: 767px) {
    flex-direction: row;
  }
`;

const StValidationMsg = styled.p`
  font-size: 1rem;
  font-weight: 300;
  color: var(--main-color);
  margin-bottom: 1rem;
  @media ${(props) => props.theme.mobile} {
    font-size: 0.9rem;
  }
`;
