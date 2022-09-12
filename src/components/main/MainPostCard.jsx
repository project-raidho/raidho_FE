import styled from "styled-components";
// import axios from "axios";
import HeartButton from "./HeartButton";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MainPostCard = ({ post }) => {
  const navigate = useNavigate();
  const [like, setLike] = useState(false);

  useEffect(() => {
    //   const fetchData = async () => {
    //     const URI = process.env.REACT_APP_BASE_URI
    //     const res = await axios.get(`${URI}/post`)
    //     if (res.data.type === 'liked') setLike(true)
    //   }
    //   fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleLike = async (e) => {
    //   const res = await axios.post(...) // [POST] 사용자가 좋아요를 누름 -> DB 갱신
    setLike(!like);
  };

  return (
    <StFigure>
      <img
        className="img"
        src={post.imgurl}
        alt="img"
        onClick={() => navigate(`/postdetail/${post.id}`)}
      />
      <div className="likebutton">
        <HeartButton like={like} onClick={toggleLike} />
      </div>
      <div className="userBox">
        <div className="profileBox">
          <img
            className="profileImg"
            src={post.memberImage}
            alt="프로필이미지"
          />
        </div>
        <h2>{post.memberName}</h2>
      </div>
    </StFigure>
  );
};

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
    bottom: 50px;
    left: 20px;
  }
  .userBox {
    display: flex;
  }
  .profileBox {
    width: 30px;
    height: 30px;
    border-radius: 70%;
    overflow: hidden;
  }
  .profileImg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  h2 {
    margin: auto 10px;
  }
`;
