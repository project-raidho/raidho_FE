import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import MainPostCard from "../main/MainPostCard";
import MeetingListCard from "../meetingList/MeetingListCard";
import { instance } from "../../shared/api";

const SearchTagContainer = () => {
  const location = useLocation();

  // ::: 추천 테마 리스트 전역에서 불러오기
  const themeList = useSelector((state) => state.themeSlice.themeList);
  const meetingList = useSelector((state) => state.meetingSlice.meetingList);
  const [postList, setPostList] = useState([
    {
      id: 1,
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU",
      memberImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
      memberName: "김경문",
      isImages: true,
      multipartFiles: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU",
      ],
      heartCount: 100,
      isHeartMine: true,
    },
    {
      id: 2,
      multipartFiles: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU",
      ],
      memberName: "김경문",
      isImages: false,
      memberImage: null,
      isHeartMine: false,
    },
  ]);

  // ::: ===> 서버테스트 세팅
  // const [meetingList, setMeetingList] = useState([]);

  // ::: Uri 한글깨짐 방지
  const decodeUri = decodeURI(location?.search);
  const tagName = decodeUri.split("=")[1];
  const tagUri = location.pathname.includes("post");

  // ::: 검색 uri 상태 확인
  const [checkUri, setCheckUri] = useState(tagUri); // ::: true => 여행후기 ::: false => 여행친구찾기

  const onClickCheckUri = () => {
    // ::: tagUri true이면 post get / false이면 meeting get
    setCheckUri(tagUri);
  };
  console.log("Post : True / Meeting : False ===>", checkUri);
  console.log("tagName===>", tagName);

  // ::: uri 정보 가져오기
  useEffect(() => {
    const tagUri = location.pathname.includes("post");
    setCheckUri(tagUri);
  }, [location]);

  // ::: 테그 상세 리스트 리스트 불러오기
  const getSearchTagList = async () => {
    console.log("====>tag", tagName);
    try {
      // ::: 포스트 게시글 가져오기
      const responseTagPost = await instance.get(`/api/search/${tagName}`);
      console.log(responseTagPost);
      return setPostList(responseTagPost.data.data.content);

      // if (checkUri) {
      // ::: 포스트 게시글 가져오기
      // } else {
      //   // ::: 미팅 게시글 가져오기
      //   // const responseTagMeeting = await authInstance.get(
      //   //   `/api/meeting/${tagName}`
      //   // );
      //   // console.log(responseTagMeeting);
      //   // return setMeetingList(responseTagMeeting.data);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearchTagList();
    // eslint-disable-next-line
  }, [location]);
  return (
    <StSearchTagContainerWrap>
      <StTagCategoryWrap>
        <li>
          <NavLink
            to={`/post/best?tag=${tagName}`}
            className={checkUri ? "active" : ""}
            onClick={onClickCheckUri}
          >
            여행 후기
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/meeting/chat?tag=${tagName}`}
            className={checkUri ? "" : "active"}
            onClick={onClickCheckUri}
          >
            여행 친구 찾기
          </NavLink>
        </li>
      </StTagCategoryWrap>
      <StTagContentWrap checkUri={checkUri}>
        {checkUri &&
          postList.map((post) => <MainPostCard key={post.id} post={post} />)}
        <StMeetingListWrap>
          <StMeetingCategoryRow className="themeCategoryRow">
            {!checkUri &&
              themeList.map((theme, index) => (
                <p
                  className="themeCategoryButton"
                  size="squareTheme"
                  variant="lineBlue"
                  key={theme.themeName + index}
                  // onClick={() => onClickTheme(theme.themePath)}
                >
                  <NavLink
                    to={`/meeting/${theme.themePath}/chat?tag=${tagName}`}
                    activeClassName="active"
                  >
                    {theme.themeName}
                  </NavLink>
                </p>
              ))}
          </StMeetingCategoryRow>
          <StMeetingCardBox>
            {!checkUri &&
              meetingList.map((meeting) => (
                <MeetingListCard key={meeting.id} meeting={meeting} />
              ))}
          </StMeetingCardBox>
        </StMeetingListWrap>
      </StTagContentWrap>
    </StSearchTagContainerWrap>
  );
};

export default SearchTagContainer;

const StSearchTagContainerWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  h3 {
    font-size: 1.5rem;
    margin: 15px 0;
    color: var(--title-color);
  }
`;

// const StTagCardWrap = styled.ul`
//   display: grid;
//   grid-template-columns: repeat(6, 1fr);
//   gap: 18px;
//   @media (max-width: 767px) {
//     grid-template-columns: repeat(3, 1fr);
//   }
// `;

// const StTagCard = styled.li`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 95px;
//   color: #ffffff;
//   font-size: 1.5rem;
//   font-weight: 700;
//   text-align: center;
//   border-radius: 15px;
//   background-image: linear-gradient(
//       0deg,
//       rgba(71, 71, 71, 0.57),
//       rgba(71, 71, 71, 0.57)
//     ),
//     ${(props) => props.bgImage && props.bgImage};
//   background-size: cover;
//   background-position: center;
//   cursor: pointer;

//   &:hover {
//     background-image: linear-gradient(
//         0deg,
//         rgba(71, 71, 71, 0.7),
//         rgba(71, 71, 71, 0.7)
//       ),
//       ${(props) => props.bgImage && props.bgImage};
//   }
// `;

const StTagCategoryWrap = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 70px;
  margin-top: 2rem;
  border-bottom: 1px solid var(--gray-color);
  li {
    height: 100%;
    padding: 0 1rem;
    margin-right: 1rem;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      font-size: 1.5rem;
      font-weight: 700;
      padding: 0 1rem;
    }

    .active {
      border-bottom: 4px solid var(--title-color);
    }
  }
`;

const StTagContentWrap = styled.div`
  width: 100%;
  min-height: 100px;
  margin-top: 1.5rem;

  ${(props) =>
    props.checkUri
      ? css`
          column-width: 310px;
          column-gap: 15px;
        `
      : css`
          /* display: grid;
          grid-template-columns: repeat(3, 1fr); */
        `}
`;

const StMeetingListWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StMeetingCategoryRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 1rem 0 0;
  margin-bottom: 1rem;
  &.flexRightLayout {
    justify-content: flex-end;
  }
  button {
    margin-right: 1rem;
    margin-bottom: 1rem;
  }
  .themeCategoryButton {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 250px;
    height: 55px;

    border: 1px solid var(--title-color);
    border-radius: 15px;
    background-color: var(--bg-color);
    margin-right: 1rem;
    margin-bottom: 1rem;
    overflow: hidden;
    cursor: pointer;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 700;
      width: 100%;
      height: 100%;
      &.active {
        background-color: var(--main-color);
      }
    }
  }

  label {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-left: 1rem;
  }
`;

const StMeetingCardBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding-bottom: 5rem;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
