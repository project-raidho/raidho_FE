import React, { useState, useEffect } from "react";
import styled from "styled-components";

import PostDetailImage from "./PostDetailImg";
import PostDetailLike from "./PostDetailLike";
import PostDetailUser from "./PostDetailUser";
import { useNavigate, useParams } from "react-router-dom";

import { RiDeleteBin6Fill } from "react-icons/ri";
import { RiEdit2Fill } from "react-icons/ri";
import { IoArrowBackSharp } from "react-icons/io5";
import { authInstance } from "../../shared/api";

const PostDetailContainer = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [postDetail, setPostDetail] = useState({
    id: "",
    content: "",
    multipartFiles: [],
    tags: [],
    locationTags: [],
    heartCount: 0,
    isHeartMine: false,
    isMine: true,
    memberId: 1,
    memberImage: "",
    memberName: "",
  });
  console.log(postDetail.id);
  // const [isMine, setIsMine] = useState(false);
  useEffect(() => {
    getpostdetail(id);
    // const memberID = localStorage.getItem("memberId");

    // if (postDetail.memberId === Number(memberID)) {
    //   return setIsMine(true);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // ::: 상세페이지 조회 axios
  const getpostdetail = async (id) => {
    const res = await authInstance.get(`/api/post/${id}`);
    console.log(res);
    return setPostDetail(res.data.data[0]);
  };
  // ::: 상세페이지 삭세 axios
  const deletePostDetail = async (id) => {
    const res = await authInstance.delete(`/api/post/${id}`);
    console.log(res);
    navigate(-1);
    return id;
  };
  console.log(postDetail.isHeartMine);
  return (
    <StDetailContainer>
      <IoArrowBackSharp
        className="backButton"
        size="24"
        onClick={() => {
          navigate(-1);
        }}
      />
      {postDetail.isMine && (
        <RiDeleteBin6Fill
          className="deleteButton"
          size="24"
          onClick={deletePostDetail}
        />
      )}
      {postDetail.isMine && (
        <RiEdit2Fill
          className="editButton"
          size="24"
          onClick={() => {
            navigate(`/updatePost/${id}`);
          }}
        />
      )}

      <PostDetailImage images={postDetail.multipartFiles} />
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
