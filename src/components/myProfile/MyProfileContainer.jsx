import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateDarkMode } from "../../redux/modules/searchSlice";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { authInstance } from "../../shared/api";
import UpdateMyProfile from "./UpdateMyProfile";
import MyPostList from "./MyPostList";
import MyMeetingList from "./MyMeetingList";
import Loading from "../../elements/Loading";
import Error from "../../elements/Error";
import styled from "styled-components";

const getPostMineList = async () => {
  const responsePostList = await authInstance.get(`/api/post/mypost`);
  console.log(responsePostList);
  return responsePostList.data.data;
};

const MyProfileContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkDarkMode = useSelector((state) => state.searchSlice.darkMode);

  // ::: 게시글 더보기 기능 구현
  const [isMore, setIsMore] = useState(false);
  const { status, data, error } = useQuery("postList", getPostMineList);

  const onClickMorePost = () => {
    setIsMore(!isMore);
  };

  const darkOnOff = (event) => {
    if (
      document.getElementsByTagName("html")[0].classList.contains("darkMode")
    ) {
      document.getElementsByTagName("html")[0].classList.remove("darkMode");
      dispatch(updateDarkMode(false));
    } else {
      document.getElementsByTagName("html")[0].classList.add("darkMode");
      dispatch(updateDarkMode(true));
    }
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
        <h3>내가 작성한 모집글</h3>
        <span className="bgMiddleLine" />
      </StMyProfileTitleRow>
      <MyMeetingList />
      <StMyProfileTitleRow>
        <h3>내가 작성한 여행후기</h3>
        <span className="bgMiddleLine" />
      </StMyProfileTitleRow>
      <MyPostList isMore={isMore} data={data} />
      {data.length > 4 ? (
        <StMyProfileTitleRow className="buttonMore" isMore={isMore}>
          <p onClick={onClickMorePost}>더보기</p>
        </StMyProfileTitleRow>
      ) : null}
      <StMyProfileTitleRow>
        <h3>설정</h3>
        <span className="bgMiddleLine" />
      </StMyProfileTitleRow>
      <StMyProfileTextRow>
        <p>다크모드</p>
        <StSwitchButton checkDarkMode={checkDarkMode}>
          <input
            type="checkbox"
            onClick={darkOnOff}
            defaultChecked={checkDarkMode && "checked"}
          />
          <span className="onoffSwitch"></span>
          <strong>{checkDarkMode ? "on" : "off"}</strong>
        </StSwitchButton>
      </StMyProfileTextRow>
      <StMyProfileTextRow>
        <p className="buttonLogout" onClick={onClickLogOut}>
          로그아웃
        </p>
      </StMyProfileTextRow>
    </StMyProfileContainerWrap>
  );
};

export default MyProfileContainer;

const StMyProfileContainerWrap = styled.div`
  padding-bottom: 5rem;
  background-color: var(--bg-color);
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
    justify-content: end;
    p {
      padding: 0;
      font-size: 1rem;
    }
  }

  h3 {
    font-size: 1.5rem;
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

  @media (max-width: 639px) {
    h3 {
      font-size: 1.2rem;
      padding-left: 1rem;
    }
  }
`;

const StMyProfileTextRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 0.8rem;

  p {
    font-size: 1.5rem;

    &.buttonLogout {
      cursor: pointer;
    }
    &.buttonLogout:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 639px) {
    p {
      font-size: 1.2rem;
      padding-left: 1rem;
    }
  }
`;

const StSwitchButton = styled.label`
  position: relative;
  width: 80px;
  height: 30px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .onoffSwitch {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    border: 1px solid var(--gray-color);
    background-color: #ffffff;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .onoffSwitch:before {
    position: absolute;
    content: "";
    height: 22px;
    width: 22px;
    left: 4px;
    bottom: 3px;
    color: var(--gray-color);
    background-color: var(--lightBlue-color);
    -webkit-transition: 0.5s;
    transition: 0.4s;
    border-radius: 20px;
    z-index: 2;
  }

  input:checked + .onoffSwitch {
    background-color: #424242;
  }

  input:checked + .onoffSwitch:before {
    -webkit-transform: translateX(48px);
    -ms-transform: translateX(48px);
    transform: translateX(48px);
  }

  strong {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 30px;
    height: 14px;
    font-size: 0.8rem;
    text-align: center;
    line-height: 14px;
    color: var(--gray-color);
    margin-left: ${(props) => (props.checkDarkMode ? "-20px" : "-7px")};
    margin-top: -7px;
    z-index: 1;
  }
  @media (max-width: 639px) {
    margin-right: 1rem;
    width: 60px;
    height: 24px;

    .onoffSwitch:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 4px;
      bottom: 2px;
      color: var(--gray-color);
      background-color: var(--lightBlue-color);
      -webkit-transition: 0.5s;
      transition: 0.4s;
      border-radius: 20px;
      z-index: 2;
    }

    input:checked + .onoffSwitch {
      background-color: #424242;
    }

    input:checked + .onoffSwitch:before {
      -webkit-transform: translateX(33px);
      -ms-transform: translateX(33px);
      transform: translateX(33px);
    }

    strong {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 30px;
      height: 14px;
      font-size: 0.8rem;
      text-align: center;
      line-height: 14px;
      color: var(--gray-color);
      margin-left: ${(props) => (props.checkDarkMode ? "-20px" : "-7px")};
      margin-top: -7px;
      z-index: 1;
    }
  }
`;
