import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";

import UpdateMyProfile from "./UpdateMyProfile";
import MyPostList from "./MyPostList";
import MyMeetingList from "./MyMeetingList";

import { authInstance } from "../../shared/api";
import { RootState } from "../../redux/store";
import { updateDarkMode } from "../../redux/modules/searchSlice";

const getMeetingMineList = async () => {
  const res = await authInstance.get(`/api/meeting/myMeetingPost`);
  return res.data.data;
};
const getMeetingListLiked = async () => {
  const res = await authInstance.get(`/api/meeting/myHeartMeetingPost`);
  return res.data.data;
};

const getPostMineList = async () => {
  const res = await authInstance.get(`/api/post/mypost`);
  return res.data.data;
};

const getPostCommented = async () => {
  const res = await authInstance.get(`/api/post/commented`);
  return res.data.data;
};

const getPostliked = async () => {
  const res = await authInstance.get(`/api/post/liked`);
  return res.data.data;
};

const MyProfileContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkDarkMode = useSelector(
    (state: RootState) => state.searchSlice.darkMode
  );

  // ::: 게시글 더보기 기능 구현
  const [isMoreMeeting, setIsMoreMeeting] = useState<boolean>(false);
  const [isMoreMeetingLiked, setIsMoreMeetingLiked] = useState<boolean>(false);
  const [isMorePost, setIsMorePost] = useState<boolean>(false);
  const [isMorePostCommented, setIsMorePostCommented] =
    useState<boolean>(false);
  const [isMorePostLiked, setIsMorePostLiked] = useState<boolean>(false);

  const MeetingListQuery = useQuery("meetingListMine", getMeetingMineList);
  const MeetingLikedQuery = useQuery("MeetingListLiked", getMeetingListLiked);
  const PostListQuery = useQuery("postListMine", getPostMineList);
  const PostCommentedQuery = useQuery("postListCommented", getPostCommented);
  const PostLikedQuery = useQuery("postListLiked", getPostliked);

  const onClickMoreMeeting = (): void => {
    setIsMoreMeeting(!isMoreMeeting);
  };

  const onClickMoreMeetingLiked = () => {
    setIsMoreMeetingLiked(!isMoreMeetingLiked);
  };

  const onClickMorePost = () => {
    setIsMorePost(!isMorePost);
  };

  const onClickMorePostCommented = () => {
    setIsMorePostCommented(!isMorePostCommented);
  };
  const onClickMorePostLiked = () => {
    setIsMorePostLiked(!isMorePostLiked);
  };

  const darkOnOff = () => {
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

  // ::: 로그아웃 하기
  const onClickLogOut = () => {
    localStorage.removeItem("Authorization");
    localStorage.removeItem("memberImage");
    localStorage.removeItem("memberName");
    localStorage.removeItem("memberIntro");

    navigate("/");
  };

  if (PostCommentedQuery.isLoading) {
    return null;
  }
  return (
    <StMyProfileContainer>
      <StMyProfileTextRow>
        <p>프로필</p>
      </StMyProfileTextRow>

      <UpdateMyProfile />

      <StMyProfileTitleRow>
        <h3>내가 작성한 모집글</h3>
        {isMoreMeeting ? (
          <FaAngleUp className="moreIcon" onClick={onClickMoreMeeting} />
        ) : (
          <FaAngleDown className="moreIcon" onClick={onClickMoreMeeting} />
        )}
      </StMyProfileTitleRow>
      {isMoreMeeting && (
        <MyMeetingList
          status={MeetingListQuery.status}
          data={MeetingListQuery.data}
          error={MeetingListQuery.error as Error}
        />
      )}

      <StMyProfileTitleRow>
        <h3>내가 찜한 모집글</h3>
        {isMoreMeetingLiked ? (
          <FaAngleUp className="moreIcon" onClick={onClickMoreMeetingLiked} />
        ) : (
          <FaAngleDown className="moreIcon" onClick={onClickMoreMeetingLiked} />
        )}
      </StMyProfileTitleRow>
      {isMoreMeetingLiked && (
        <MyMeetingList
          status={MeetingLikedQuery.status}
          data={MeetingLikedQuery.data}
          error={MeetingLikedQuery.error as Error}
        />
      )}

      <StMyProfileTitleRow>
        <h3>내가 작성한 여행후기</h3>
        {isMorePost ? (
          <FaAngleUp className="moreIcon" onClick={onClickMorePost} />
        ) : (
          <FaAngleDown className="moreIcon" onClick={onClickMorePost} />
        )}
      </StMyProfileTitleRow>
      {isMorePost && (
        <MyPostList
          data={PostListQuery.data}
          status={PostLikedQuery.status}
          error={PostLikedQuery.error as Error}
        />
      )}

      <StMyProfileTitleRow>
        <h3>내가 댓글단 여행후기</h3>
        {isMorePostCommented ? (
          <FaAngleUp className="moreIcon" onClick={onClickMorePostCommented} />
        ) : (
          <FaAngleDown
            className="moreIcon"
            onClick={onClickMorePostCommented}
          />
        )}
      </StMyProfileTitleRow>
      {isMorePostCommented && (
        <MyPostList
          data={PostCommentedQuery.data}
          status={PostLikedQuery.status}
          error={PostLikedQuery.error as Error}
        />
      )}

      <StMyProfileTitleRow>
        <h3>내가 좋아요한 여행후기</h3>
        {isMorePostLiked ? (
          <FaAngleUp className="moreIcon" onClick={onClickMorePostLiked} />
        ) : (
          <FaAngleDown className="moreIcon" onClick={onClickMorePostLiked} />
        )}
      </StMyProfileTitleRow>
      {isMorePostLiked && (
        <MyPostList
          data={PostLikedQuery.data}
          status={PostLikedQuery.status}
          error={PostLikedQuery.error as Error}
        />
      )}

      <StMyProfileTextRow>
        <p>설정</p>
      </StMyProfileTextRow>
      <StMyProfileTextRow>
        <p>다크모드</p>
        <StSwitchButton checkDarkMode={checkDarkMode}>
          <input
            type="checkbox"
            onClick={darkOnOff}
            defaultChecked={checkDarkMode ? true : false}
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
    </StMyProfileContainer>
  );
};

export default MyProfileContainer;

const StMyProfileContainer = styled.div`
  padding-bottom: 5rem;
  background-color: var(--bg-color);

  .moreIcon {
    font-size: 1.5rem;
    margin-right: 10px;
    cursor: pointer;
  }
`;

const StMyProfileTitleRow = styled.div`
  border-bottom: 1px solid var(--gray-color);
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
    margin-left: 10px;
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
    font-size: 1.5rem;
    font-weight: 400;
    color: var(--title-color);
    padding: 0 25px;
    background-color: var(--bg-color);
    z-index: 2;
    transition: 0.2ms;
    cursor: pointer;
  }

  @media ${(props) => props.theme.mobile} {
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
  margin-top: 1rem;

  p {
    font-size: 1.5rem;
    margin-left: 10px;

    &.buttonLogout {
      cursor: pointer;
    }
    &.buttonLogout:hover {
      text-decoration: underline;
    }
  }

  @media ${(props) => props.theme.mobile} {
    p {
      font-size: 1.2rem;
      padding: 0.5rem 0 0.5rem 1rem;
    }
  }
`;

const StSwitchButton = styled.label<{ checkDarkMode: boolean }>`
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
  @media ${(props) => props.theme.mobile} {
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
