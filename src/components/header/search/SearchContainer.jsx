import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../../elements/Input";
import Button from "../../../elements/Button";
import styled from "styled-components";

const SearchContainer = ({ isLogin }) => {
  // ::: 검색창 focus 여부 확인하기
  const [ isFocusSearch, setIsFocusSearch ] = useState(false);

  // ::: 최근 검색 기록 샘플
  const recentlySearchList = [
    "자전거 여행",
    "여행지 추천",
    "서울 여행",
    "배낭 여행",
    "바다 추천"
  ];

  // ::: 추천 테마 리스트 샘플
  const themeList = [
    {themeName: "자전거", themeImage: "https://www.outsideonline.com/wp-content/uploads/2020/05/15/29er-trend-2020_h.jpg?crop=16:9&width=960&enable=upscale&quality=100"},
    {themeName: "오토바이", themeImage: "https://cdn.incheontoday.com/news/photo/201803/38626_32816_3621.jpg"},
    {themeName: "서핑", themeImage: "https://img.etoday.co.kr/pto_db/2020/07/600/20200724101818_1488853_1199_796.jpg"},
    {themeName: "클라이밍", themeImage: "http://www.ngonews.kr/imgdata/wngo_kr/202011/2020110842523078.jpg"},
    {themeName: "보도", themeImage: "https://scontent-ssn1-1.xx.fbcdn.net/v/t1.6435-9/53932247_826285544383664_3053291739625291776_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=1Hd45M8Uz6wAX9gh658&_nc_ht=scontent-ssn1-1.xx&oh=00_AT-2gRhK6AVu7k-3DkpxbIWwCicb5x78BXN-MREC-IufjQ&oe=633521FA"},
  ];

  return(
    <StSearchContainerWrap 
      isLogin={isLogin}
    >
      <StSearchDetailBox
        isFocusSearch={isFocusSearch}
      >
        <Input
          size="large" 
          variant="search" 
          onFocus={() => {setIsFocusSearch(true)}}
          onBlur={() => {setIsFocusSearch(false)}}
        />
        <StSearchDetailList>
          <h3>최근 검색 기록</h3>
          <StSearchDetailRow>
            {recentlySearchList.map((tag, index)=>(
              <Link 
                key={tag+index}
                // ::: 테그별 링크 연결 시켜야 함
                to={`/`}
              >
                <Button 
                  size="tag" 
                  variant="line"
                >
                  {tag}
                </Button>
              </Link>
            ))}
          </StSearchDetailRow>

          <h3>추천 테마</h3>
          <StTagCardWrap>
            {themeList.map((themeCard)=>(
              <Link 
                key={themeCard.themeName} 
                // ::: 테그별 링크 연결 시켜야 함
                to={`/`}
              >
                <StTagCard 
                  bgImage={`url(${themeCard.themeImage})`}
                >
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
  width: ${(props) => props.isLogin === true ? "70%" : "74%"};
  height: 55px;
`;

const StSearchDetailBox = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height:${(props)=>props.isFocusSearch === true ? "455px" : "58px"};
  border:${(props)=>props.isFocusSearch === true ? "1px solid var(--gray-color)" : "none"};
  border-radius: 20px 20px 10px 10px;
  box-shadow:${(props)=>props.isFocusSearch === true && "var(--box-shadow)"};
  background-color: var(--bg-color);
  overflow: hidden;
  transition: 0.5s;
  z-index: 5;

  input {
    border: ${(props)=>props.isFocusSearch === true && "none"};
  }
`;

const StSearchDetailList = styled.div`
  width: calc(100% - 3rem);
  border-top: 1px solid var(--gray-color);
  margin: 1rem auto;

  h3 {
    font-size: 1.5rem;
    margin: 15px 0;
  }
`;

const StSearchDetailRow = styled.div`
  button {
    margin-bottom: 15px;
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
  background-image: 
    linear-gradient(0deg, rgba(71,71,71,0.57), rgba(71,71,71,0.57)), 
    ${(props) => props.bgImage && props.bgImage};
  background-size: cover;
  background-position:center;
  cursor: pointer;

  &:hover {
    background-image: 
    linear-gradient(0deg, rgba(71,71,71,0.7), rgba(71,71,71,0.7)), 
    ${(props) => props.bgImage && props.bgImage};
  }
`;