import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import fileIcon from "../../assets/fileIcon.svg";
import IconError from "../../assets/iconError.svg";
import Loading from "../../elements/Loading";
import Error from "../../elements/Error";

import Slider from "react-slick";
import "../../elements/slider/slick-theme.css";
import "../../elements/slider/slick.css";

interface MyPostListProps {
  data: {
    isImages: boolean;
    id: number;
    multipartFiles: string[];
  }[];
  status: string;
  error: { message: string };
}

const MyPostList = ({ data, status, error }: MyPostListProps) => {
  // ::: 디바이스 화면 크기 확인
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const checkDiviceWidth = () => {
    const browserWidth = window.innerWidth;
    browserWidth <= 639 ? setIsMobile(true) : setIsMobile(false);
    browserWidth > 639 && browserWidth < 1023
      ? setIsTablet(true)
      : setIsTablet(false);
  };

  useEffect(() => {
    window.addEventListener("resize", checkDiviceWidth);
    return () => {
      window.removeEventListener("resize", checkDiviceWidth);
    };
  }, []);

  const countMeetingCard = () => {
    if (isMobile) {
      return 3;
    }
    if (isTablet) {
      return 4;
    }
    return 4;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: countMeetingCard(),
    slidesToScroll: 2,
  };

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "error") {
    return <Error message={error.message} />;
  }

  return (
    <>
      {data.length === 0 && (
        <StMessageMinePost>
          <img src={IconError} alt="에러" />
          <p>해당 게시글이 없습니다.</p>
        </StMessageMinePost>
      )}
      <StMyPostListWrap>
        {(data.length < 4 && isMobile) || !isMobile ? (
          <StPostCardBox>
            {data?.map(
              (post: {
                isImages: boolean;
                id: number;
                multipartFiles: string[];
              }) => (
                <StPostCard key={post.id}>
                  <Link to={`/postDetail/${post.id}`}>
                    {post.isImages && <div className="imagesIcon" />}
                    <img
                      src={post.multipartFiles[0]}
                      alt={"이미지"}
                      loading="lazy"
                    />
                  </Link>
                </StPostCard>
              )
            )}
          </StPostCardBox>
        ) : (
          <Slider {...settings}>
            {data?.map(
              (post: {
                isImages: boolean;
                id: number;
                multipartFiles: string[];
              }) => (
                <StPostCard key={post.id}>
                  <Link to={`/postDetail/${post.id}`}>
                    {post.isImages && <div className="imagesIcon" />}
                    <img
                      src={post.multipartFiles[0]}
                      alt={"이미지"}
                      loading="lazy"
                    />
                  </Link>
                </StPostCard>
              )
            )}
          </Slider>
        )}
      </StMyPostListWrap>
    </>
  );
};

export default MyPostList;

const StMessageMinePost = styled.div`
  width: 100%;
  text-align: center;
  img {
    width: 70px;
  }

  p {
    font-size: 1.2rem;
    color: var(--title-color);
    font-style: italic;
    padding: 1rem 0;
  }

  @media (max-width: 639px) {
    img {
      width: 50px;
    }
    p {
      padding: 0.5rem 0;
      font-size: 0.9rem;
    }
    button {
      width: 200px;
    }
  }
`;

const StMyPostListWrap = styled.div`
  height: auto;
  background-color: var(--bg-color);
  overflow: hidden;
`;

const StPostCardBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  @media (max-width: 1023px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    height: auto;
  }
  @media (max-width: 639px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
`;

const StPostCard = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  padding: 10px;

  .imagesIcon {
    height: 22px;
    width: 22px;
    position: absolute;
    top: 13px;
    right: 10px;
    background-image: url(${fileIcon});
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 767px) {
    height: 200px;
  }
  @media (max-width: 639px) {
    height: 200px;
  }
`;
