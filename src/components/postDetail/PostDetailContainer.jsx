import React, { useState, useEffect } from "react";
import styled from "styled-components";

import PostDetailImage from "./postDetailImage";
import PostDetailLike from "./PostDetailLike";
import PostDetailUser from "./PostDetailUser";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { RiEdit2Fill } from "react-icons/ri";
import { IoArrowBackSharp } from "react-icons/io5";

const PostDetailContainer = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  // const [postDetail, setPostDetail] = useState(
  //   {
  //     id: 1,
  //     content: "너무 멋져요~~",
  //     postImgs: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU"],
  //     tags: ["#등산", "#한라산"],
  //     locationTags: ["#경기", "#안양"],
  //     heartCount: 100,
  //     memberId: 1,
  //     memberImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
  //     memberName: "김경문",
  //   }
  // );
  const postDetail = {
    id: 1,
    content: "너무 멋져요~~",
    postImgs: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU",
    ],
    tags: ["#등산", "#한라산"],
    locationTags: ["#경기", "#안양"],
    heartCount: 100,
    memberId: 1,
    memberImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
    memberName: "김경문",
  };
  const [isMine, setIsMine] = useState(false);
  useEffect(() => {
    const memberID = localStorage.getItem("memberId");
    // getpostdetail(id);
    if (postDetail.memberId === Number(memberID)) {
      return setIsMine(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // ::: 상세보기 가져오는 axios
  // const getpostdetail = async (id) => {
  //   const res = await axios.get(`${URI}/detail/${id}`);
  //   return setPostDetail(res.data);
  // };
  let config = {
    headers: {
      Authorization: localStorage.getItem("Authorization"),
      RefreshToken: localStorage.getItem("RefreshToken"),
    },
  };
  const URI = process.env.REACT_APP_BASE_URI;
  const deletePostDetail = async (postId) => {
    const res = await axios.delete(`${URI}/items/cart/${postId}`, config);
    console.log(res);
    return postId;
  };

  return (
    <StDetailContainer>
      <IoArrowBackSharp
        className="backButton"
        size="24"
        onClick={() => {
          navigate(-1);
        }}
      />
      {isMine && (
        <RiDeleteBin6Fill
          className="deleteButton"
          size="24"
          onClick={deletePostDetail(postDetail.id)}
        />
      )}
      {isMine && (
        <RiEdit2Fill
          className="editButton"
          size="24"
          onClick={() => {
            navigate("/");
          }}
        />
      )}

      <PostDetailImage images={postDetail.postImgs} />
      <PostDetailLike postDetail={postDetail} />
      <PostDetailUser postDetail={postDetail} />
      <StContentBox>{postDetail.content}</StContentBox>
    </StDetailContainer>
  );
};

export default PostDetailContainer;

const StDetailContainer = styled.div`
  margin: 20px auto;

  width: 800px;
  height: 1200px;
  border: 1px solid;
  border-radius: 20px;
  padding: 20px 50px;
  box-shadow: var(--box-shadow);

  .backButton {
    background-color: transparent;
    border: none;
    margin-top: 10px;
    margin-right: 10px;

    cursor: pointer;
  }
  .deleteButton {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
    cursor: pointer;
  }
  .editButton {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
    cursor: pointer;
  }
`;

const StContentBox = styled.div`
  margin-top: 20px;
  width: 100%;
`;
