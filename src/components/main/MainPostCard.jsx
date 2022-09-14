import styled from "styled-components";
import { authInstance } from "../../shared/api";
import HeartButton from "./HeartButton";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { RiFileCopyLine } from "react-icons/ri";
import fileIcon from "../../assets/fileIcon.svg";

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

  const toggleLike = async () => {
    if (!like) {
      const res = await authInstance.post(`/api/postheart/${post.id}`);
      console.log(res);
    } else {
      const res = await authInstance.delete(`/api/postheart/${post.id}`);
      console.log(res);
    }
    setLike(!like);
  };

  return (
    <StFigure>
      <img
        className="img"
        src={post.multipartFiles[0]}
        alt="img"
        onClick={() => navigate(`/postdetail/${post.id}`)}
      />
      {post.isImages && <div className="imagesicon" />}
      <div className="userBox">
        <div className="profileBox">
          <img
            className="profileImg"
            src={post.memberImage}
            alt="프로필이미지"
          />
        </div>
        <h2>{post.memberName}</h2>
        <div className="likebutton">
          <HeartButton like={like} onClick={toggleLike} />
        </div>
      </div>
    </StFigure>
  );
};

export default MainPostCard;

const StFigure = styled.figure`
  display: inline-block;
  position: relative;
  border: 1px solid var(--gray-color);
  margin: 0;
  width: 310px;
  margin-bottom: 15px;
  .img {
    width: 100%;
    border: 1px solid var(--gray-color);
    cursor: pointer;
  }
  .imagesicon {
    height: 22px;
    width: 22px;
    position: absolute;
    top: 10px;
    right: 10px;
    background-image: url(${fileIcon});
  }
  .likebutton {
    position: absolute;
    bottom: 5px;
    right: 20px;
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
