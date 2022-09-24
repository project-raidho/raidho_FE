import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import SearchTagPost from "./SearchTagPost";
import SearchTagMeeting from "./SearchTagMeeting";

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

  // ::: uri 정보 가져오기
  useEffect(() => {
    const tagUri = location.pathname.includes("post");
    setCheckUri(tagUri);
  }, [location]);

  return (
    <StSearchTagContainerWrap>
      <StTagCategoryWrap>
        <li>
          <NavLink
            to={`/post/best?tag=${tagName}`}
            className={checkUri ? "active" : ""}
          >
            여행 후기
            {/* <strong>{tagPostListQuery.data.data.data.totalElements}</strong> */}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/meeting/chat?tag=${tagName}`}
            className={checkUri ? "" : "active"}
          >
            여행 친구 찾기
            {/* <strong>{tagMeetingListQuery.data.data.data.totalElements}</strong> */}
          </NavLink>
        </li>
      </StTagCategoryWrap>
      <StTagContentWrap>
        {checkUri && <SearchTagPost tagName={tagName} />}
        {!checkUri && <SearchTagMeeting tagName={tagName} />}
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
`;
