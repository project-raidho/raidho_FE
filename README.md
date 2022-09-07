# Project "Raidho ::: 라이도"

## 프로젝트 소개

- 📌 여행하고 싶은 사람들이 이용하는 공간으로, 함께 여행하고 싶은 사람을 모집하고, 경험을 공유하는 웹 서비스
- 📌 자전거, 오토바이 등 같은 취미를 가지고 있는 사람을 구하기 어려운 여행을 쉽게 모집할 수 있도록 도와주는 서비스

---

## 기술정보

<p>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
  <img src="https://img.shields.io/badge/Create React App-09D3AC?style=for-the-badge&logo=Create React App&logoColor=black">
  <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white">
  <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white">
  <img src="https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=Yarn&logoColor=white">
  <img src="https://img.shields.io/badge/styled-components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white">
  <img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=for-the-badge&logo=GitHub Actions&logoColor=white">
  <img src="https://img.shields.io/badge/Amazon S3-569A31?style=for-the-badge&logo=Amazon S3&logoColor=white">
</p>

---

## 맴버 정보

| Position         | Name   | Blog                                                     | MBTI |
| ---------------- | ------ | -------------------------------------------------------- | ---- |
| 리더·FE·ReactJS  | 나유진 | 🔗 [GitHub::YooJinRa](https://github.com/YooJinRa)       | INFP |
| FE·ReactJS       | 김경문 | 🔗 [GitHub::rudans987](https://github.com/rudans987)     | INFJ |
| 부리더·BE·Spring | 박상욱 | 🔗 [GitHub::ParkRio](https://github.com/ParkRio/ParkRio) | ENFP |
| BE·Spring        | 김성호 | 🔗 [GitHub::kimsoungho](https://github.com/kimsoungho)   | INFP |
| BE·Spring        | 전태훈 | 🔗 [GitHub::JeonTaehun](https://github.com/JeonTaehun)   | INFJ |
| UX/UI            | 강예진 |                                                          | ENFP |

---

## 사용한 패키지

- 스타일 적용 : styled-components
- router : yarn add react-router-dom
- 리덕스 설치 : yarn add react-redux
- 툴킷 (리덕스) 설치 : yarn add @reduxjs/toolkit
- thunk (미들웨어) 설치 : yarn add redux-thunk
- axios(통신) 설치 : yarn add axios
- logger (개발 편하게 도와줌) 설치 : yarn add redux-logger
- image resizing : yarn add browser-image-compression
- kakao login : yarn add react-kakao-login
- 이미지 drop 업로드 : yarn add react-dropzone
- 이미지 crop : yarn add react-image-crop
- tag 기능 : yarn add @yaireo/tagify

---

## Package 선택 이유

---

## 개발 타임라인

|    일자    | 진행목록                                                                                                                                                                                       |
| :--------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2022.08.26 | - 서비스 기획 <br> - 와이어프레임 작성 <br> - 서비스명 정하기                                                                                                                                  |
| 2022.08.27 | - 노션 작성                                                                                                                                                                                    |
| 2022.08.29 | - 컨포넌트 설계<br> - 초기 깃&깃허브 설정 <br> - createPotal 구현 <br> - 디자이너 첫 미팅                                                                                                      |
| 2022.08.30 | - gitHub Action을 이용한 http CI/CD 설정 <br> - 만능버튼, 만능인풋 설계 <br> - 전역 스타일 지정 <br> - 소셜로그인(카카오) 기능 구현 <br> - 게시글 등록 레이아웃 설정 <br> - 이미지 드롭존 구현 |
| 2022.08.31 | - 소셜로그인(네이버) 기능 구현 <br> - 이미지 크롭편집 기능 구현 <br> - 메인페이지 좋아요 기능 구현 <br> - 메소리니 레이아웃 구현                                                               |
| 2022.09.01 | - 헤더 검색창 뷰 작업 <br> - 헤더 토글 기능 구현 <br> - 다크&라이트 모드 기능구현 <br> - 게시글 상세 모달 구현 및 게시글 좋아요 버튼                                                           |
| 2022.09.02 | - HTTPS CI/CD 설정( `GitHub Actions`, `S3`, `Cloud Front`, `SSL`)                                                                                                                              |
| 2022.09.04 | - 태그 등록시 추가 삭제 기능 구현 <br> - 채팅 기능 구현 <br> - 게시글 등록 이미지 유효성 검사 방식 수정                                                                                        |
| 2022.09.05 | - 채팅 기능 구현 <br> - 최근검색어 기능 구현(로컬스토리지 이용)                                                                                                                                |
| 2022.09.06 | - 소셜로그인(카카오) 로컬서버통신 완료 <br> - 디테일 기획 진행(with 백엔드, 디자이너) <br> - gitHub secrets key 파일 적용완료(yml파일 내 env설정)                                              |
| 2022.09.07 | - 모집방개설 페이지 구현중(카테고리, 달력, 지역선택 완료) <br> - 최근검색리스트 기능 에러해결완료                                                                                              |

---

## 트러블슈팅

### 1. 최근검색기록 메인페이지에서 태그 상세 페이지로 이동되었을 때 작동안하는 문제

#### 문제 발생

- 최근 태그 검색 기록을 구현하는 중 `useNavigate`를 사용하여 페이지 이동시 해당 태그가 입력이 안되는 상황이 발생
- 컨포넌트 내에서 `useState`를 이용해서 상태를 관리하고, 변경이 있을 때마다 `localStorage`에 저장하는 방식을 구현 진행
- 추가, 삭제, 중복 방지, 최대 개수 제한 하는 부분까지 다 구현을 하고, 마지막에 상세태그 리스트 페이지로 이동할 때, 해당 태그만 데이터 `localStorage`에 저장이 안되는 상황이 발생함

#### 문제 해결을 위해 시도한 과정

- `useEffect`, `useState`를 사용해서 데이터를 저장 하는 방법을 시도
- `useLocation`을 사용하여 `useNavigate`에 있는 정보를 받아오는 방법을 시도
- 콘솔을 찍어보며 값이 코드가 실행되지 않은 부분을 확인 => `useNavigate`가 실행되면서 그 뒤에 일어나는 비동기 함수가 전혀 실행되지 않았음

#### 문제 해결

- 페이지가 이동되면서 컨포넌트 내에서 함께 상태관리 했던 데이터들이 유지되지 않았음
- 이에 `redux-toolkit`을 활용한 전역데이터 관리가 필요할 거라고 판단하여 상태관리 방법을 수정진행함
- 컨포넌트 내에서는 전역 데이터를 불러오고 보내는 방향으로 변경
- 리덕스(searchSlice.js) 내에서 데이터 수정(추가, 삭제, 중복확인, 최대개수제한 등)을 진행하고 `localStorage`에 데이터를 저장하고 불러오는 방향으로 변경

```
// ::: SearchContainer.jsx 컨포넌트 내 전역데이터 불러오고 보내는 부분
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
```

```
// ::: searchSlice.js 내 중 reducer 부분
reducers: {
  getRecentSearch: (state, action) => {
    const initRecentSearches = localStorage.getItem("recentSearches");
    initRecentSearches
      ? state.recentSearch = JSON.parse(localStorage.getItem("recentSearches"))
      : state.recentSearch = [];
  },
  addRecentSearch: (state, action) => {
    let count = 0;
    const maxCount = 4;
    const resultRecentSearch = state.recentSearch.filter((tag) => {
      if (tag === action.payload || count >= maxCount) {
        return false;
      }
      count += 1;
      return true;
    });
    state.recentSearch = [action.payload, ...resultRecentSearch];
    localStorage.setItem(
      "recentSearches",
      JSON.stringify(state.recentSearch)
    );
  },
  deleteRecentSearch: (state, action) => {
    state.recentSearch = [...state.recentSearch.filter((tag) => tag !== action.payload)];
  }
},

```
