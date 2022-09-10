import styled from 'styled-components';
// import axios from "axios";
import React, { useState, useEffect } from 'react';
import HeartButton from './HeartButton';

type CardProps = {
  image: string;
  onClickhandler: React.MouseEventHandler<HTMLImageElement>;
};

function MainPostCard({ image, onClickhandler }: CardProps) {
  const [like, setLike] = useState(false);

  useEffect(() => {
    //   const fetchData = async () => {
    //     const URI = process.env.REACT_APP_BASE_URI
    //     const res = await axios.get(`${URI}/post`)
    //     if (res.data.type === 'liked') setLike(true)
    //   }
    //   fetchData()
    // eslint-disable-next-line
  }, []);

  const toggleLike = async () => {
    //   const res = await axios.post(...) // [POST] 사용자가 좋아요를 누름 -> DB 갱신
    setLike(!like);
  };

  return (
    <StFigure>
      <img className="img" src={image} alt="img" onClick={onClickhandler} aria-hidden="true" />
      <div className="likebutton">
        <HeartButton like={like} onClick={toggleLike} />
      </div>
    </StFigure>
  );
}

export default MainPostCard;

const StFigure = styled.figure`
  display: inline-block;
  position: relative;

  margin: 0;
  width: 300px;
  margin-bottom: 15px;
  .img {
    width: 100%;

    cursor: pointer;
  }
  .likebutton {
    position: absolute;
    bottom: 20px;
    left: 20px;
  }
`;
