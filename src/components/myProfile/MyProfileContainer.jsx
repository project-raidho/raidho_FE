import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { authInstance } from "../../shared/api";
import UpdateMyProfile from "./UpdateMyProfile";
import MyPostList from "./MyPostList";
import Button from "../../elements/Button";
import Loading from "../../elements/Loading";
import Error from "../../elements/Error";
import styled from "styled-components";

const getPostMineList = async () => {
  try {
    const responsePostList = await authInstance.get(`/api/post/mypost`);
    console.log(responsePostList);
    return responsePostList.data.data;
  } catch (error) {
    console.log("내가 쓴 게시글 불러오기 오류 :::", error);
  }
};

const MyProfileContainer = () => {
  const navigate = useNavigate();
  // ::: 게시글 더보기 기능 구현
  const [isMore, setIsMore] = useState(false);
  const { status, data, error } = useQuery("postList", getPostMineList);

  const onClickMorePost = () => {
    setIsMore(!isMore);
  };

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "error") {
    return <Error message={error.message} />;
  }

  // ::: 로그아웃 하기
  const onClickLogOut = () => {
    localStorage.removeItem("Authorization");
    localStorage.removeItem("memberImage");
    localStorage.removeItem("memberName");
    localStorage.removeItem("memberIntro");

    navigate("/");
  };

  console.log("data", data);

  return (
    <StMyProfileContainerWrap>
      <StMyProfileTitleRow>
        <h3>프로필</h3>
        <span className="bgMiddleLine" />
      </StMyProfileTitleRow>
      <UpdateMyProfile />
      <StMyProfileTitleRow>
        <h3>내가 쓴 글</h3>
        <span className="bgMiddleLine" />
      </StMyProfileTitleRow>
      <MyPostList isMore={isMore} data={data} />
      {data.length > 4 ? (
        <StMyProfileTitleRow className="buttonMore" isMore={isMore}>
          <p onClick={onClickMorePost}>더보기</p>
          <span className="bgMiddleLine" />
        </StMyProfileTitleRow>
      ) : null}
      <Button
        className="buttonLogOutInMyProfile"
        size="squareTheme"
        variant="lineBlue"
        onClick={onClickLogOut}
      >
        로그아웃
      </Button>
    </StMyProfileContainerWrap>
  );
};

export default MyProfileContainer;

const StMyProfileContainerWrap = styled.div`
  padding-bottom: 5rem;
  background-color: var(--bg-color);

  .buttonLogOutInMyProfile {
    display: block;
    width: 100%;
    max-width: 500px;
    margin: 2rem auto;
  }
`;

const StMyProfileTitleRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 45px;
  margin: 25px 0;

  &.buttonMore {
    justify-content: center;
  }

  h3 {
    font-size: 2rem;
    font-weight: 400;
    color: var(--title-color);
    padding-right: 25px;
    background-color: var(--bg-color);
    z-index: 2;
  }

  .bgMiddleLine {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: var(--line-color);
    z-index: 1;
  }

  p {
    display: ${(props) => props.isMore && "none"};
    font-size: 1.5rem;
    font-weight: 400;
    color: var(--title-color);
    padding: 0 25px;
    background-color: var(--bg-color);
    z-index: 2;
    transition: 0.2ms;
    cursor: pointer;
  }
`;
