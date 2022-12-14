import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";

import SearchTagPost from "./SearchTagPost";
import SearchTagMeeting from "./SearchTagMeeting";

const SearchTagContainer = () => {
  const location = useLocation();

  // ::: Uri 한글깨짐 방지
  const decodeUri = decodeURI(location?.search);
  const tagName = decodeUri.split("=")[1];
  const tagUri = location.pathname.includes("post");

  // ::: 검색 uri 상태 확인
  const [checkUri, setCheckUri] = useState<boolean>(tagUri); // ::: true => 여행후기 ::: false => 여행친구찾기

  // ::: uri 정보 가져오기
  useEffect(() => {
    const tagUri = location.pathname.includes("post");
    setCheckUri(tagUri);
  }, [location]);

  return (
    <StSearchTagContainer>
      <StTagCategoryWrap>
        <li>
          <NavLink
            to={`/post/best?tag=${tagName}`}
            className={checkUri ? "active" : ""}
          >
            여행 후기
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/meeting/chat?tag=${tagName}`}
            className={checkUri ? "" : "active"}
          >
            여행 친구 찾기
          </NavLink>
        </li>
      </StTagCategoryWrap>
      <StTagContentWrap>
        {checkUri && <SearchTagPost tagName={tagName} />}
        {!checkUri && <SearchTagMeeting tagName={tagName} />}
      </StTagContentWrap>
    </StSearchTagContainer>
  );
};

export default SearchTagContainer;

const StSearchTagContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`;

const StTagCategoryWrap = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 50px;
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
      font-size: 1.2rem;
      font-weight: 700;
      padding: 0 0.5rem;
    }

    .active {
      border-bottom: 4px solid var(--main-color);
    }
  }
  @media ${(props) => props.theme.mobile} {
    li {
      margin-right: 0.5rem;

      a {
        padding: 0 0.2rem;
      }
    }
  }
`;

const StTagContentWrap = styled.div`
  width: 100%;
  min-height: 100px;
  margin-top: 1rem;
`;
