import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import MainPostCard from "../main/MainPostCard";
import MeetingListCard from "../meetingList/MeetingListCard";
import { authInstance } from "../../shared/api";
import { useQuery } from "react-query";
import Info from "../../elements/Info";

const SearchTagContainer = () => {
  const location = useLocation();
  // ::: Uri 한글깨짐 방지
  const decodeUri = decodeURI(location?.search);
  const tagName = decodeUri.split("=")[1];
  const tagUri = location.pathname.includes("post");

  // ::: 검색 uri 상태 확인
  const [checkUri, setCheckUri] = useState(tagUri); // ::: true => 여행후기 ::: false => 여행친구찾기
  console.log("Post : True / Meeting : False ===>", checkUri);
  console.log("tagName===>", tagName);

  // ::: 테그 상세 리스트 리스트 불러오기
  const getSearchTagPostList = async () => {
    console.log("====>tag", tagName);
    try {
      // ::: 포스트 게시글 가져오기
      // if (checkUri) {
      // ::: 포스트 게시글 가져오기
      return await authInstance.get(`/api/search/${tagName}`);
      // }
    } catch (error) {
      console.log(error);
    }
  };
  // ::: 테그 상세 리스트 리스트 불러오기
  const getSearchTagMeetingList = async () => {
    console.log("====>tag", tagName);
    try {
      // ::: 포스트 게시글 가져오기
      // if (!checkUri) {
      // ::: 미팅 게시글 가져오기
      return await authInstance.get(`/api/search/meeting/${tagName}`);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const tagPostListQuery = useQuery(
    ["tagPostList", tagName],
    getSearchTagPostList,
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  const tagMeetingListQuery = useQuery(
    ["tagMeetingList", tagName],
    getSearchTagMeetingList,
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  // ::: uri 정보 가져오기
  useEffect(() => {
    const tagUri = location.pathname.includes("post");
    setCheckUri(tagUri);
  }, [location]);

  if (tagPostListQuery.isLoading) {
    return null;
  }

  if (tagMeetingListQuery.isLoading) {
    return null;
  }

  console.log(tagPostListQuery.data);
  console.log(tagMeetingListQuery.data.data.data.content);

  return (
    <StSearchTagContainerWrap>
      <StTagCategoryWrap>
        <li>
          <NavLink
            to={`/post/best?tag=${tagName}`}
            className={checkUri ? "active" : ""}
            // onClick={onClickCheckUri}
          >
            여행 후기
            <strong>{tagPostListQuery.data.data.data.totalElements}</strong>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/meeting/chat?tag=${tagName}`}
            className={checkUri ? "" : "active"}
            // onClick={onClickCheckUri}
          >
            여행 친구 찾기
            <strong>{tagMeetingListQuery.data.data.data.totalElements}</strong>
          </NavLink>
        </li>
      </StTagCategoryWrap>
      <StAlertWrap>
        {tagPostListQuery.data.data.data.content.length === 0 && (
          <>
            <StIconBox>
              <Info />
            </StIconBox>

            <div>
              <h3>
                <strong>{tagName}</strong>에 대한 검색결과가 없습니다.
              </h3>
              <p>
                - 단어의 철자가 정확한지 확인해 보세요.
                <br />
                - 한글을 영어로 혹은 영어를 한글로 입력했는지 확인해 보세요.
                <br />
                - 검색어의 단어 수를 줄이거나, 보다 일반적인 검색어로 다시
                검색해 보세요. <br />
                - 두 단어 이상의 검색어인 경우, 띄어쓰기를 확인해 보세요. <br />
              </p>
            </div>
          </>
        )}
      </StAlertWrap>
      <StTagContentWrap checkUri={checkUri}>
        {checkUri &&
          tagPostListQuery.data.data.data.content.map((post) => (
            <MainPostCard key={post.id} post={post} />
          ))}
        <StMeetingListWrap>
          <StMeetingCardBox>
            {!checkUri &&
              tagMeetingListQuery.data.data.data.content.map((meeting) => (
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

// const StMeetingCategoryRow = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: flex-start;
//   width: 100%;
//   padding: 1rem 0 0;
//   margin-bottom: 1rem;
//   &.flexRightLayout {
//     justify-content: flex-end;
//   }
//   button {
//     margin-right: 1rem;
//     margin-bottom: 1rem;
//   }
//   .themeCategoryButton {
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//     justify-content: center;
//     width: 250px;
//     height: 55px;

//     border: 1px solid var(--title-color);
//     border-radius: 15px;
//     background-color: var(--bg-color);
//     margin-right: 1rem;
//     margin-bottom: 1rem;
//     overflow: hidden;
//     cursor: pointer;

//     a {
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-size: 1.5rem;
//       font-weight: 700;
//       width: 100%;
//       height: 100%;
//       &.active {
//         background-color: var(--main-color);
//       }
//     }
//   }

//   label {
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//     justify-content: flex-start;
//     margin-left: 1rem;
//   }

//   @media (max-width: 767px) {
//     display: grid;
//     grid-template-columns: repeat(4, 1fr);
//     .themeCategoryButton {
//       width: auto;
//       a {
//         font-size: 1.2rem;
//       }
//     }
//   }
// `;

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

const StAlertWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;

  h3 {
    padding: 2rem 1rem 0 1rem;
    strong {
      font-size: 1.5rem;
      border-bottom: 1px solid var(--title-color);
    }
  }
  p {
    font-size: 1.2rem;
    line-height: 1.5;
    padding: 0 1rem;
  }

  @media (max-width: 639px) {
    flex-direction: column;
  }
`;

const StIconBox = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 3rem;
  margin-right: 1rem;
  overflow: hidden;

  @media (max-width: 639px) {
    width: 50px;
    height: 50px;
    min-width: 50px;
    min-height: 50px;
  }
`;
