# Project "Raidho ::: 라이도"

## 프로젝트 소개

- 📌 여행하고 싶은 사람들이 이용하는 공간으로, 함께 여행하고 싶은 사람을 모집하고, 경험을 공유하는 웹 서비스
- 📌 자전거, 오토바이 등 같은 취미를 가지고 있는 사람을 구하기 어려운 여행을 쉽게 모집할 수 있도록 도와주는 서비스

---

## 개발 진행상황 체크

| 완료 여부 | 페이지              | 기능                                                           | 서버 연결 여부 |
| --------- | ------------------- | -------------------------------------------------------------- | -------------- |
| &#9744;   | 로그인              | 카카오로그인, 로그아웃                                         | &#9744;        |
| &#9744;   | 마이페이지          | 유저정보수정, 유저 작성한 게시글 조회                          | &#9744;        |
| &#9744;   | 여행후기 리스트     | 실시간&추천순 필터기능, 메소리니 레이아웃, 좋아요, 무한스크롤  | &#9744;        |
| &#9744;   | 여행후기 등록       | 이미지 편집 및 등록, 태그 등록, 태그 삭제, 태그 중복방지       | &#9744;        |
| &#9744;   | 여행후기 상세       | 여행후기 삭제                                                  | &#9744;        |
| &#9744;   | 여행후기 수정       | 여행후기 수정                                                  | &#9744;        |
| &#9744;   | 여행친구찾기 리스트 | 여행친구 찾기 조회                                             | &#9744;        |
| &#9744;   | 여행친구찾기 등록   | 달력, 카카오맵 주소검색, 태그                                  | &#9744;        |
| &#9744;   | 여행친구찾기 상세   | 여행친구찾기 삭제                                              | &#9744;        |
| &#9744;   | 여행친구찾기 수정   | 여행친구찾기 수정                                              | &#9744;        |
| &#9744;   | 검색 조회           | 최근검색기록 조회\*삭제, 실시간 검색                           | &#9744;        |
| &#9744;   | 검색 상세 리스트    | 여행후기 및 여행친구찾기에 관한 해당 태그에 관련한 게시글 조회 | &#9744;        |
| &#9744;   | 채팅                | 채팅 참여, 나가기, 실시간 대화                                 | &#9744;        |

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
- 이미지 drop 업로드 : yarn add react-dropzone
- 이미지 crop : yarn add react-image-crop

---

## 라이브러리 등 기술 사용 이유

|          기술           | 사용 이유                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :---------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     **Typescript**      | - 타입스크립트 사용 고려 <br> - 개발 시 타입을 지정해서 (깨끗한 코드) 코드를 보다 읽기 쉽게 만들어주고 코드를 작성하는 중에 에러를 발견할 수 있고 에러에 대한 대응을 빠르게 해주어 개발자의 실수를 줄여줄 수 있다는 점에서 사용고려 중 :: 추석 연휴기간에 도전해보고 진행이 어렵다고 판단되면 뒤로 미룰 예정                                                                                                                                                                            |
|    **redux-toolkit**    | - 컨포넌트 내에서 상태관리 함에 있어서 페이지 이동 하면서 데이터를 유지하기 어려워 전역으로 데이터 저장하는 방법으로 리덕스 툴킷을 선택 <br> -리덕스 툴킷은 리덕스보다 action을 정의하지 않고 작성할 수 있어 코드가 간결해지고 immer부분이 내장되어 있어 편하게 사용할 수 있기에 선택하게 됨 <br> - 또한 비동기를 수월하게 할 수 있는 thunk도 함께 사용할 수 있어서 선택하게 됨                                                                                                         |
|        **axios**        | - API를 연동하기 위해서 fetch나 axios 등으로 활용할 수 있는데 axios를 사용하게 된 이유는 자동으로 JSON 데이터 형식으로 변환이 가능하고 XSRF의 보호를 받는다는 점에서 fetch대신 axios를 선택함 <br> - 또한 data가 object 형식이 포함되고, 사용하는 법도 편리하여 사용하게 됨                                                                                                                                                                                                             |
|   **react-dropzone**    | - [이미지 drop 업로드] 이미지 업로드 시 기본 파일 선택으로 업로드 하는 것 뿐아니라 해당 영역에 파일을 가져다 두면 바로 업로드 되게 하는 편의성을 주고 싶어서 사용 <br> - 해당 패키지의 경우 현재 버전이 14.2.2으로로 주기적으로 업데이트 되는 부분이 확인 되고, 이미지 드롭 업로드 위주의 기능만 있어서 이 패키지를 사용하게 됨                                                                                                                                                         |
|  **react-image-crop**   | - [이미지 crop 기능] 사용자가 이미지를 업로드 하고 원하는 부분만 업로드 할 수 있도록 편집기능을 추가하고자 사용함 <br> - 해당 패키지의 경우 간단한 이미지 편집 기능만 들어있고, 패키지 사이즈가 77KB로 다른 패키지와 비교해서 가볍다고 생각했기에 사용 <br> - 패키지를 사용함에 있어서도 문서화 및 예제가 잘 나와있어서 선택하게 됨                                                                                                                                                     |
|  **react-date-range**   | - 여행 기간을 입력할 수 있고 인풋과 함께 사용가능하고 다양한 레이아웃으로 커스터마이징도 가능해서 선택                                                                                                                                                                                                                                                                                                                                                                                  |
| **react-daum-postcode** | - 카카오 지도에 보낼 상세 주소가 필요했고 상세 주소를 찾을수 있도록 도와주는 상세 주소검색창을 띄워주기 때문에 선택                                                                                                                                                                                                                                                                                                                                                                     |
|   **카카오 지도 api**   | - 카카오 로그인을 구현해놔서 카카오 앱 키가 있기때문에 재사용 할수 있다는 점에서 이 api를 선택                                                                                                                                                                                                                                                                                                                                                                                          |
|    **stomp, sockjs**    | - 백엔드가 spring이기 때문에 spring과 양방향 통신을 통해 채팅 기능을 구현하고자 stomp와 sockjs를 선택                                                                                                                                                                                                                                                                                                                                                                                   |
|   **gitHub Actions**    | - 프로젝트를 개발함에 있어 실제 배포후 환경에서 오류가 많이 발생한다는 점을 이전 프로젝트에서 느껴볼 수 있었음 ⇒ CI/CD가 필요하다고 느껴 프로젝트 초기부터 세팅해서 진행하기로 함 <br> - vercel, jenkis 등 ci/cd 종류가 여러개 있지만, gitHub Actions를 사용한 이유는 github에 올리면 바로바로 배포 내용을 확인할 수 있다는 점이 가장 큼 <br> - 사전에 세팅만 잘 해두면 해당 브랜치만 올려도 배포가 된다는 점, 그리고 github내에서 작업하는 거라 프로젝트 관리가 용이하다는 점에서 선택 |

---

## 개발 타임라인

|    일자    | 진행목록                                                                                                                                                                                                                                                                                                               |
| :--------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2022.08.26 | - 서비스 기획 <br> - 와이어프레임 작성 <br> - 서비스명 정하기                                                                                                                                                                                                                                                          |
| 2022.08.27 | - 노션 작성                                                                                                                                                                                                                                                                                                            |
| 2022.08.29 | - 컨포넌트 설계<br> - 초기 깃&깃허브 설정 <br> - createPotal 구현 <br> - 디자이너 첫 미팅                                                                                                                                                                                                                              |
| 2022.08.30 | - gitHub Action을 이용한 http CI/CD 설정 <br> - 만능버튼, 만능인풋 설계 <br> - 전역 스타일 지정 <br> - 소셜로그인(카카오) 기능 구현 <br> - 게시글 등록 레이아웃 설정 <br> - 이미지 드롭존 구현                                                                                                                         |
| 2022.08.31 | - 소셜로그인(네이버) 기능 구현 <br> - 이미지 크롭편집 기능 구현 <br> - 메인페이지 좋아요 기능 구현 <br> - 메소리니 레이아웃 구현                                                                                                                                                                                       |
| 2022.09.01 | - 헤더 검색창 뷰 작업 <br> - 헤더 토글 기능 구현 <br> - 다크&라이트 모드 기능구현 <br> - 게시글 상세 모달 구현 및 게시글 좋아요 버튼                                                                                                                                                                                   |
| 2022.09.02 | - HTTPS CI/CD 설정( `GitHub Actions`, `S3`, `Cloud Front`, `SSL`)                                                                                                                                                                                                                                                      |
| 2022.09.04 | - 태그 등록시 추가 삭제 기능 구현 <br> - 채팅 기능 구현 <br> - 게시글 등록 이미지 유효성 검사 방식 수정                                                                                                                                                                                                                |
| 2022.09.05 | - 채팅 기능 구현 <br> - 최근검색어 기능 구현(로컬스토리지 이용)                                                                                                                                                                                                                                                        |
| 2022.09.06 | - 소셜로그인(카카오) 로컬서버통신 완료 <br> - 디테일 기획 진행(with 백엔드, 디자이너) <br> - gitHub secrets key 파일 적용완료(yml파일 내 env설정)                                                                                                                                                                      |
| 2022.09.07 | - 모집방개설 페이지 구현중(카테고리, 달력, 지역선택 완료) <br> - 최근검색리스트 기능 에러해결완료                                                                                                                                                                                                                      |
| 2022.09.08 | - 모집방개설 페이지 구현중(지도) <br> - 헤더 스크롤 이벤트 및 마이페이지 토글 이벤트 적용                                                                                                                                                                                                                              |
| 2022.09.09 | - 모집방개설 페이지 날짜 형식 및 테마 변환 <br> - 모집방 리스트 페이지 작업 완료 <br> - 헤더 메뉴 추가 및 토글 이벤트 추가, 스크롤 이벤트 오류 수정 <br> - 여행후기 등록 페이지 이미지 업로드 형식(blob) 변환 <br> - 타입스크립트 변환 도전으로 공부 <br> - 유저 프로필 수정하기 이미지 리사이징 및 서버통신 세팅 완료 |
| 2022.09.10 | - 작업파일 타입스크립트 변환                                                                                                                                                                                                                                                                                           |
| 2022.09.11 | - 작업파일 타입스크립트 변환                                                                                                                                                                                                                                                                                           |

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

---

## 반응형 세팅

- 데스크탑 퍼스트로 break point 높은 순서부터 작성 : 데스크탑 기준의 서비스 제작

```
  @media (max-width: 1023px) {

  }
  @media (max-width: 767px) {

  }
  @media (max-width: 639px) {

  }
```

---
