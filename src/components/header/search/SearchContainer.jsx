import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecentSearch,
  addRecentSearch,
  deleteRecentSearch,
} from "../../../redux/modules/searchSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "../../../elements/Input";
import Button from "../../../elements/Button";
import styled from "styled-components";

const SearchContainer = ({ isLogin }) => {
  // ::: 검색기록 전역상태관리 하기(리덕스 툴킷 이용)
  const dispatch = useDispatch();
  const recentSearchList = useSelector(
    (state) => state.searchSlice.recentSearch
  );

  // ::: 태그별 상세 페이지 이동하기
  const navigate = useNavigate();
  const location = useLocation();

  // ::: 추천 태그 리스트 전역에서 불러오기
  const recommendTagList = useSelector(
    (state) => state.themeSlice.recommendTagList
  );

  // ::: 검색창 focus 여부 확인하기
  const [isFocusSearch, setIsFocusSearch] = useState(false);

  // ::: 검색 입력 내용 확인하기
  const [searchInput, setSearchInput] = useState("");

  // ::: 검색창에 입력한 값 확인하기
  const onChangeSearchContent = (event) => {
    setSearchInput(event.target.value);
  };

  // ::: 검색 상세보기 페이지 이동하기
  const goSearchDetail = (url) => {
    navigate(`/post/best?tag=${url}`, {
      state: {
        tagKeyword: url,
      },
    });
  };

  console.log("=====*****====>", location);
  // ::: 검색어를 입력하고 엔터를 눌렀을 때 페이지 이동 및 최근 검색에 저장
  const onKeyPressSearchEnter = (event) => {
    if (event.key === "Enter") {
      if (searchInput === "") {
        return false;
      }
      setIsFocusSearch(false);
      dispatch(addRecentSearch(searchInput));
      dispatch(getRecentSearch());

      // ::: 태그별 상세페이지 이동
      goSearchDetail(searchInput);
    }
  };

  const onFocusSearch = () => {
    setIsFocusSearch(true);
  };

  const onBlurSearch = () => {
    setIsFocusSearch(false);
  };

  // ::: 최근검색기록 삭제하기
  const onClickDeleteRecentSearch = (tag) => {
    setIsFocusSearch(true);
    dispatch(deleteRecentSearch(tag));
    setIsFocusSearch(true);
  };

  // ::: 처음 들어왔을 때 데이터 불러오기
  useEffect(() => {
    dispatch(getRecentSearch());
    location.state !== null && setSearchInput(location.state.tagKeyword);
    location.search === "" && setSearchInput("");
  }, [dispatch, location.state, location.search]);

  return (
    <StSearchContainerWrap isLogin={isLogin}>
      <StSearchDetailBox isFocusSearch={isFocusSearch}>
        <Input
          size="large"
          variant="search"
          onFocus={onFocusSearch}
          onBlur={onBlurSearch}
          onChange={onChangeSearchContent}
          onKeyPress={onKeyPressSearchEnter}
          value={searchInput}
        />
        <StSearchDetailList isFocusSearch={isFocusSearch}>
          <h3>최근 검색 기록</h3>
          <StSearchDetailRow>
            {recentSearchList.map((tag, index) => (
              <Button key={tag + index} size="tag" variant="line">
                <Link
                  to={`/post/best?tag=${tag}`}
                  onClick={() => setSearchInput(tag)}
                >
                  {tag}
                </Link>
                <span
                  className="tagCloseIcon"
                  onClick={() => {
                    onClickDeleteRecentSearch(tag);
                  }}
                >
                  X
                </span>
              </Button>
            ))}
          </StSearchDetailRow>

          <h3>추천 검색어</h3>
          <StTagCardWrap>
            {recommendTagList.map((tagCard) => (
              <Link
                key={tagCard.recommendTagName}
                to={`/post/best?tag=${tagCard.recommendTagName}`}
                onClick={() => setSearchInput(tagCard.recommendTagName)}
              >
                <StTagCard bgImage={`url(${tagCard.recommendTagImage})`}>
                  {tagCard.recommendTagName}
                </StTagCard>
              </Link>
            ))}
          </StTagCardWrap>
        </StSearchDetailList>
      </StSearchDetailBox>
    </StSearchContainerWrap>
  );
};

export default SearchContainer;

const StSearchContainerWrap = styled.div`
  position: relative;
  display: block;
  width: 100%;
  height: 40px;

  @media (max-width: 1023px) {
  }
  @media (max-width: 767px) {
  }
  @media (max-width: 639px) {
    height: 36px;
  }
`;

const StSearchDetailBox = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: ${(props) => (props.isFocusSearch === true ? "500px" : "40px")};
  border: ${(props) =>
    props.isFocusSearch === true ? "1px solid var(--gray-color)" : "none"};
  border-radius: 15px;
  box-shadow: ${(props) => props.isFocusSearch === true && "var(--box-shadow)"};
  background-color: var(--bg-color);
  overflow: hidden;
  z-index: 5;
  transition: 0.5s;

  input {
    border: ${(props) => props.isFocusSearch === true && "none"};
    font-size: 1.2rem;
    box-shadow: ${(props) =>
      props.isFocusSearch === true ? "none" : "0px 4px 5px rgba(0, 0, 0, 0.1)"};
    transition: 0.5s;
  }
  @media (max-width: 767px) {
    width: 100%;
    height: ${(props) => (props.isFocusSearch === true ? "630px" : "40px")};
  }
  @media (max-width: 639px) {
    width: 100%;
    height: ${(props) => (props.isFocusSearch === true ? "550px" : "34px")};

    input {
      height: 34px;
      font-size: 1rem;
      background-size: 27px 27px;
      background-position: 96% center;
      padding: 8px 20px;
    }
  }
`;

const StSearchDetailList = styled.div`
  width: calc(100% - 3rem);
  border-top: ${(props) =>
    props.isFocusSearch === true ? "1px solid var(--gray-color)" : "none"};
  margin: 0.8rem auto;
  transition: 0.5s;

  h3 {
    font-size: 1.2rem;
    margin: 15px 0;
    color: var(--title-color);
  }

  @media (max-width: 639px) {
    h3 {
      font-size: 1rem;
    }
  }
`;

const StSearchDetailRow = styled.div`
  button {
    position: relative;
    margin-bottom: 15px;

    a {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-size: 1.2rem;
      padding: 0 20px;
    }
  }

  .tagCloseIcon {
    display: block;
    position: absolute;
    right: 5px;
    top: 5px;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 1.2rem;
    color: var(--main-color);
    border-radius: 50%;
    background: var(--bg-color);
    cursor: pointer;
  }
  @media (max-width: 767px) {
    button {
      a {
        font-size: 1.1rem;
      }
    }
  }
  @media (max-width: 639px) {
    button {
      height: 28px;
      padding: 0 8px 0 0;
      margin-bottom: 6px;
      margin-right: 8px;
      a {
        font-size: 0.95rem;
      }
      span.tagCloseIcon {
        width: 14px;
        height: 14px;
        line-height: 14px;
        font-size: 1rem;
        top: 6px;
      }
    }
  }
`;

const StTagCardWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  @media (max-width: 639px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
`;

const StTagCard = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 95px;
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
  border-radius: 15px;
  background-image: linear-gradient(
      0deg,
      rgba(71, 71, 71, 0.57),
      rgba(71, 71, 71, 0.57)
    ),
    ${(props) => props.bgImage && props.bgImage};
  background-size: cover;
  background-position: center;
  cursor: pointer;

  &:hover {
    background-image: linear-gradient(
        0deg,
        rgba(71, 71, 71, 0.7),
        rgba(71, 71, 71, 0.7)
      ),
      ${(props) => props.bgImage && props.bgImage};
  }
  @media (max-width: 767px) {
    height: 65px;
    font-size: 1.1rem;
  }
  @media (max-width: 639px) {
    height: 60px;
    font-size: 1rem;
  }
`;
