import styled from "styled-components";
import React from "react";
import DefaultProfileImage from "../assets/defaultProfileImage.svg";
interface ImageProps {
  src?: string;
  size?: string;
  width?: string;
  height?: string;
}
const Image = (props: ImageProps) => {
  let { src, size = "30px", width, height } = props;

  // porps로 가져온 사진이 null인 경우 기본 프로필로 설정
  if (src === undefined) {
    src = `${DefaultProfileImage}`;
  }
  const styles = {
    src: src,
    size: size,
    width: width,
    height: height,
  };

  return <ImageCircle {...styles}></ImageCircle>;
};

const ImageCircle = styled.div<{ size: string; src: string }>`
  --size: ${(props) => props.size};
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-color: ${(props) => props.theme.main_color_blur};
  margin: 4px;
`;

export default Image;
