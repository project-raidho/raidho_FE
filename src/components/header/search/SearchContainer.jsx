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

  // ::: 추천 테마 리스트 샘플
  const themeList = [
    {
      themeName: "자전거",
      themeImage:
        "https://www.outsideonline.com/wp-content/uploads/2020/05/15/29er-trend-2020_h.jpg?crop=16:9&width=960&enable=upscale&quality=100",
    },
    {
      themeName: "오토바이",
      themeImage:
        "https://cdn.incheontoday.com/news/photo/201803/38626_32816_3621.jpg",
    },
    {
      themeName: "서핑",
      themeImage:
        "https://img.etoday.co.kr/pto_db/2020/07/600/20200724101818_1488853_1199_796.jpg",
    },
    {
      themeName: "클라이밍",
      themeImage:
        "https://scontent-ssn1-1.xx.fbcdn.net/v/t1.6435-9/53932247_826285544383664_3053291739625291776_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=1Hd45M8Uz6wAX9gh658&_nc_ht=scontent-ssn1-1.xx&oh=00_AT-2gRhK6AVu7k-3DkpxbIWwCicb5x78BXN-MREC-IufjQ&oe=633521FA",
    },
    {
      themeName: "보도",
      themeImage:
        "https://scontent-ssn1-1.xx.fbcdn.net/v/t1.6435-9/53932247_826285544383664_3053291739625291776_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=1Hd45M8Uz6wAX9gh658&_nc_ht=scontent-ssn1-1.xx&oh=00_AT-2gRhK6AVu7k-3DkpxbIWwCicb5x78BXN-MREC-IufjQ&oe=633521FA",
    },
  ];

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
    navigate(`/tag?tag=${url}`, {
      state: {
        tagKeyword: url,
      },
    });
  };

  // ::: 검색어를 입력하고 엔터를 눌렀을 때 페이지 이동 및 최근 검색에 저장
  const onKeyPressSearchEnter = (event) => {
    if (event.key === "Enter") {
      if (searchInput === "") {
        return false;
      }
      dispatch(addRecentSearch(searchInput));
      dispatch(getRecentSearch());

      // ::: 태그별 상세페이지 이동
      goSearchDetail(searchInput);
    }
  };

  // ::: 최근검색기록 삭제하기
  const onClickDeleteRecentSearch = (tag) => {
    dispatch(deleteRecentSearch(tag));
  };

  // ::: 처음 들어왔을 때 데이터 불러오기
  useEffect(() => {
    dispatch(getRecentSearch());
    location.state !== null && setSearchInput(location.state.tagKeyword);
  }, [dispatch, location.state]);

  return (
    <StSearchContainerWrap isLogin={isLogin}>
      <StSearchDetailBox isFocusSearch={isFocusSearch}>
        <Input
          size="large"
          variant="search"
          onFocus={() => {
            setIsFocusSearch(true);
          }}
          onBlur={() => {
            setIsFocusSearch(false);
          }}
          onChange={onChangeSearchContent}
          onKeyPress={onKeyPressSearchEnter}
          value={searchInput}
        />
        <StSearchDetailList>
          <h3>최근 검색 기록</h3>
          <StSearchDetailRow>
            {recentSearchList.map((tag, index) => (
              <Button key={tag + index} size="tag" variant="line">
                <Link to={`/tag?tag=${tag}`}>{tag}</Link>
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

          <h3>추천 테마</h3>
          <StTagCardWrap>
            {themeList.map((themeCard) => (
              <Link
                key={themeCard.themeName}
                // ::: 테마별 링크 연결 시켜야 함
                to={`/tag?tag=${themeCard.themeName}`}
              >
                <StTagCard bgImage={`url(${themeCard.themeImage})`}>
                  {themeCard.themeName}
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
  width: ${(props) => (props.isLogin === true ? "70%" : "74%")};
  height: 55px;
`;

const StSearchDetailBox = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: ${(props) => (props.isFocusSearch === true ? "455px" : "58px")};
  border: ${(props) =>
    props.isFocusSearch === true ? "1px solid var(--gray-color)" : "none"};
  border-radius: 20px 20px 10px 10px;
  box-shadow: ${(props) => props.isFocusSearch === true && "var(--box-shadow)"};
  background-color: var(--bg-color);
  overflow: hidden;
  transition: 0.5s;
  z-index: 5;

  input {
    border: ${(props) => props.isFocusSearch === true && "none"};
    box-shadow: ${(props) =>
      props.isFocusSearch === true ? "none" : "0px 4px 5px rgba(0, 0, 0, 0.1)"};
  }
`;

const StSearchDetailList = styled.div`
  width: calc(100% - 3rem);
  border-top: 1px solid var(--gray-color);
  margin: 1rem auto;

  h3 {
    font-size: 1.5rem;
    margin: 15px 0;
    color: var(--title-color);
  }
`;

const StSearchDetailRow = styled.div`
  button {
    position: relative;
    margin-bottom: 15px;
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
`;

const StTagCardWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
`;

const StTagCard = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 95px;
  color: #ffffff;
  font-size: 1.5rem;
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
`;
