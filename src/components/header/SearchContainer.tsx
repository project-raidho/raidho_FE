import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import {
  getRecentSearch,
  addRecentSearch,
  deleteRecentSearch,
} from "../../redux/modules/searchSlice";

import Input from "../../elements/Input";
import Button from "../../elements/Button";
import Potal from "../../global/globalModal/Potal";
import AlertModal from "../../global/globalModal/AlertModal";

interface LocationProps {
  tagKeyword: string;
}

const SearchContainer = ({ isMobile }: { isMobile: boolean }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // ::: 검색기록 전역상태관리 하기(리덕스 툴킷 이용)
  const recentSearchList = useSelector(
    (state: RootState) => state.searchSlice.recentSearch
  );

  // ::: 추천 태그 리스트 전역에서 불러오기
  const recommendTagList = useSelector(
    (state: RootState) => state.themeSlice.recommendTagList
  );

  // ::: 검색창 focus 여부 확인하기
  const [isFocusSearch, setIsFocusSearch] = useState<boolean>(false);

  // ::: 검색 입력 내용 확인하기
  const [searchInput, setSearchInput] = useState<string>("");

  // ::: 모달 컨트롤 하기
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [modalIcon, setModalIcon] = useState<
    "success" | "warning" | "info" | ""
  >("");
  const [alertMsg, setAlertMsg] = useState<string>("");

  const onClickYes = () => {
    setModalOn(!modalOn);
  };
  const onCloseModal = () => {
    setModalOn(!modalOn);
  };

  // ::: 검색창에 입력한 값 확인하기
  const onChangeSearchContent = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.target.value);
  };

  // ::: 검색 상세보기 페이지 이동하기
  const goSearchDetail = (url: string) => {
    navigate(`/post/best?tag=${url}`, {
      state: {
        tagKeyword: url,
      },
    });
  };

  // ::: 검색 이벤트
  const onSearchTag = () => {
    if (searchInput === "") {
      setModalIcon("info");
      setAlertMsg("검색어를 입력해주세요.");
      setModalOn(true);
      return;
    }
    setIsFocusSearch(false);
    dispatch(addRecentSearch(searchInput));
    dispatch(getRecentSearch());

    // ::: 태그별 상세페이지 이동
    goSearchDetail(searchInput);
  };

  // ::: 검색어를 입력하고 엔터를 눌렀을 때 페이지 이동 및 최근 검색에 저장
  const onKeyPressSearchEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      onSearchTag();
    }
  };

  // ::: 검색어를 입력하고 검색 버튼을 눌렀을 때 페이지 이동 및 최근 검색에 저장
  const onClickSearchButton = () => {
    onSearchTag();
  };

  const onFocusSearch = () => {
    setIsFocusSearch(true);
  };

  const onBlurSearch = () => {
    setIsFocusSearch(false);
  };

  // ::: 최근검색기록 삭제하기
  const onClickDeleteRecentSearch = (tag: string) => {
    setIsFocusSearch(true);
    dispatch(deleteRecentSearch(tag));
  };

  // ::: 최근검색기록, 추천검색기록 이동하기
  const onClickLinkTagSearch = (tag: string) => {
    setSearchInput(tag);
    navigate(`/post/best?tag=${tag}`);
    setIsFocusSearch(false);
  };

  // ::: 처음 들어왔을 때 데이터 불러오기
  useEffect(() => {
    const state = location.state as LocationProps;
    dispatch(getRecentSearch());
    location.state !== null
      ? setSearchInput(state.tagKeyword)
      : setSearchInput("");
    location.search === "" && setSearchInput("");
  }, [dispatch, location.state, location.search]);

  return (
    <StSearchContainer>
      <StSearchDetailBox isFocusSearch={isFocusSearch}>
        <Input
          size="large"
          variant="search"
          onFocus={onFocusSearch}
          onBlur={onBlurSearch}
          onChange={onChangeSearchContent}
          onKeyPress={onKeyPressSearchEnter}
          value={searchInput}
          placeholder={
            isMobile ? "여행을 검색해주세요." : "여행이나 지역을 검색해주세요."
          }
        />
        <button className="buttonSearch" onClick={onClickSearchButton}></button>
        <StSearchDetailList isFocusSearch={isFocusSearch}>
          <h3>최근 검색 기록</h3>
          <StSearchDetailRow>
            {recentSearchList.map((tag, index) => (
              <p className="recentTagBox" key={tag + index}>
                <Button
                  size="tag"
                  variant="line"
                  onClick={() => onClickLinkTagSearch(tag)}
                >
                  {tag}
                </Button>
                <span
                  className="tagCloseIcon"
                  onClick={() => {
                    onClickDeleteRecentSearch(tag);
                  }}
                >
                  삭제
                </span>
              </p>
            ))}
          </StSearchDetailRow>

          <h3>추천 검색어</h3>
          <StTagCardWrap>
            {recommendTagList.map((tagCard) => (
              <StTagCard
                key={tagCard.recommendTagName}
                bgImage={`url(${tagCard.recommendTagImage})`}
                onClick={() => {
                  onClickLinkTagSearch(tagCard.recommendTagName);
                }}
              >
                {tagCard.recommendTagName}
              </StTagCard>
            ))}
          </StTagCardWrap>
        </StSearchDetailList>
      </StSearchDetailBox>
      <Potal>
        {modalOn && (
          <AlertModal
            onCloseModal={onCloseModal}
            modalIcon={modalIcon}
            alertMsg={alertMsg}
            onClickYes={onClickYes}
          />
        )}
      </Potal>
    </StSearchContainer>
  );
};

export default SearchContainer;

const StSearchContainer = styled.div`
  position: relative;
  display: block;
  width: 100%;
  height: 40px;

  @media ${(props) => props.theme.mobile} {
    height: 36px;
  }
`;

const StSearchDetailBox = styled.div<{ isFocusSearch: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: ${(props) => (props.isFocusSearch === true ? "580px" : "40px")};
  border: ${(props) =>
    props.isFocusSearch === true ? "1px solid var(--gray-color)" : "none"};
  border-radius: 15px;
  box-shadow: ${(props) => props.isFocusSearch === true && "var(--box-shadow)"};
  background-color: var(--bg-color);
  overflow: hidden;
  z-index: 5;
  transition: 0.8s;

  input {
    border: ${(props) => props.isFocusSearch === true && "none"};
    font-size: 1.2rem;
    box-shadow: ${(props) =>
      props.isFocusSearch === true ? "none" : "0px 4px 5px rgba(0, 0, 0, 0.1)"};
    transition: 0.5s;
  }

  button.buttonSearch {
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 40px;
    background-color: transparent;
    border: 0;
    cursor: pointer;
  }
  button.buttonSearch:hover {
    box-shadow: none;
  }
  @media (max-width: 767px) {
    width: 100%;
    height: ${(props) => (props.isFocusSearch === true ? "670px" : "40px")};
  }
  @media (max-width: 639px) {
    width: 100%;
    height: ${(props) => (props.isFocusSearch === true ? "540px" : "34px")};

    input {
      height: 34px;
      font-size: 1rem;
      background-size: 27px 27px;
      background-position: 96% center;
      padding: 8px 20px;
    }
    button.buttonSearch {
      width: 40px;
      height: 35px;
    }
  }
`;

const StSearchDetailList = styled.div<{ isFocusSearch: boolean }>`
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

  @media ${(props) => props.theme.mobile} {
    h3 {
      font-size: 1rem;
    }
  }
`;

const StSearchDetailRow = styled.div`
  width: 100%;
  .recentTagBox {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 5px;

    button {
      width: auto;
      height: 34px;
      font-size: 1rem;
      padding: 0 20px;
    }

    .tagCloseIcon {
      display: flex;
      justify-content: end;
      align-items: center;
      width: 40px;
      height: 30px;
      font-size: 1rem;
      color: var(--gray-color);
      cursor: pointer;
    }
    .tagCloseIcon:hover {
      color: var(--title-color);
    }
  }

  @media ${(props) => props.theme.mobile} {
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
  @media ${(props) => props.theme.mobile} {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    height: 135px;
    overflow: hidden;
  }
`;

const StTagCard = styled.p<{ bgImage: string }>`
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
  @media ${(props) => props.theme.mobile} {
    height: 60px;
    font-size: 1rem;
  }
`;
