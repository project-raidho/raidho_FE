<img src="https://github.com/project-raidho/raidho_FE/blob/yoojin/src/assets/banner/raidhoIntro.png?raw=true" width="900">

## 프로젝트 소개

- 📌 전 세계 어디든 다양한 여행, 만남의 중심 라이도
- 📌 여행하고 싶은 사람들, 여행을 좋아하는 사람들이 이용하는 공간으로, 함께 여행하고 싶은 사람을 모집하고, 여행 경험을 공유하는 웹 커뮤니티 서비스
- 📌 일반적인 여행 뿐 아니라 태그 기능을 이용하여 자전거, 오토바이 등 특정 여행을 갈 사람들만 모집해 볼수있는 서비스

---

## 주요 기능

- 소셜로그인(카카오)을 통한 간편한 회원가입
- 원하는 비율과 원하는 사이즈로 이미지를 편집하는 기능을 이용한 여행후기 등록
- 좋아요, 찜하기, 댓글 기능
- 태그를 통한 검색 기능(+최근검색기록)
- 날짜 및 장소 등을 통한 여행 모집 등록
- 날짜 및 카테고리 필터를 통한 모집 리스트
- 카카오 맵 API를 이용한 지도서비스(도로명검색&키워드검색)
- 실시간 소통을 할 수 있는 채팅 기능
- 화면 다크 & 라이트 모드
- 크롬 웹 & 모바일 최적화(반응형)

---

## 기술정보

<p>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=black">
  <img src="https://img.shields.io/badge/Create React App-09D3AC?style=for-the-badge&logo=Create React App&logoColor=black">
  <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white">
  <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=React Query&logoColor=white">
  <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white">
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white">
  <img src="https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=Yarn&logoColor=white">
  <img src="https://img.shields.io/badge/styled-components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white">
  <img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=for-the-badge&logo=GitHub Actions&logoColor=white">
  <img src="https://img.shields.io/badge/Amazon S3-569A31?style=for-the-badge&logo=Amazon S3&logoColor=white">
</p>

---

## 아키텍처

<img src="https://github.com/project-raidho/raidho_FE/blob/yoojin/docs/tech.png?raw=true" width="900">

---

## 개발 진행상황 체크

| 완료 여부 | 페이지              | 기능                                                                                       | 서버 연결 여부 |
| :-------: | ------------------- | ------------------------------------------------------------------------------------------ | :------------: |
|    ✅     | 로그인              | ✅ 카카오로그인<br /> ✅ 로그아웃                                                          |       ✅       |
|    ✅     | 마이페이지          | ✅ 유저정보수정 <br/> ✅ 유저 작성한 게시글 조회                                           |       ✅       |
|    ✅     | 여행후기 리스트     | ✅ 실시간, 추천순 필터기능 <br /> ✅ 메소리니 레이아웃<br /> ✅ 좋아요<br /> ✅ 무한스크롤 |       ✅       |
|    ✅     | 여행후기 등록       | ✅ 이미지 편집 및 등록 <br /> ✅ 태그 등록, 태그 삭제, 태그 중복방지                       |       ✅       |
|    ✅     | 여행후기 상세       | ✅ 여행후기 삭제 <br /> ✅ 댓글 CRUD <br /> ✅ 연관 게시글 조회                            |       ✅       |
|    ✅     | 여행후기 수정       | ✅ 여행후기 수정                                                                           |       ✅       |
|    ✅     | 여행친구찾기 리스트 | ✅ 여행친구 찾기 조회 <br /> ✅ 찜기능                                                     |       ✅       |
|    ✅     | 여행친구찾기 등록   | ✅ 달력 <br/> ✅ 카카오맵 주소검색, 태그                                                   |       ✅       |
|    ✅     | 여행친구찾기 상세   | ✅ 여행친구찾기 삭제                                                                       |       ✅       |
|    ✅     | 여행친구찾기 수정   | ✅ 여행친구찾기 수정                                                                       |       ✅       |
|    ✅     | 검색 조회           | ✅ 최근검색기록 조회, 삭제                                                                 |       ✅       |
|    ✅     | 검색 상세 리스트    | ✅ 여행후기 태그 조회 <br> ✅ 여행친구찾기 태그 조회                                       |       ✅       |
|    ✅     | 채팅                | ✅ 채팅 참여 <br> ✅ 나가기 <br> ✅ 실시간 대화                                            |       ✅       |

- 체크박스 작성방법 : 완료시 `✅` / 미완료시 `&#9744;`

---

## 사용한 패키지

- 스타일 적용 : `styled-components`
- router : `react-router-dom`
- 툴킷 (리덕스) 설치 : `@reduxjs/toolkit`
- axios(통신) 설치 : `axios`
- 실시간 서버 통신 : `react-query`
- 무한스크롤 : `react-query`, `react-intersection-observer`
- image resizing : `browser-image-compression`
- 이미지 drop 업로드 : `react-dropzone`
- 이미지 crop : `react-image-crop`
- 달력 : `react-date-range`, `react-datepicker`
- swiper : `react-slick`

---

## 라이브러리 등 기술 사용 이유

|             기술              | 사용 이유                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :---------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|        **Typescript**         | - 개발 시 타입을 지정해서 (깨끗한 코드) 코드를 보다 읽기 쉽게 만들어주고 코드를 작성하는 중에 에러를 발견할 수 있고 에러에 대한 대응을 빠르게 해주어 개발자의 실수를 줄여줄 수 있다는 점에 도입하기로 결정                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|       **redux-toolkit**       | - 컨포넌트 내에서 상태관리 함에 있어서 페이지 이동 하면서 데이터를 유지하기 어려워 전역으로 데이터 저장하는 방법으로 리덕스 툴킷을 선택 <br> -리덕스 툴킷은 리덕스보다 action을 정의하지 않고 작성할 수 있어 코드가 간결해지고 immer부분이 내장되어 있어 편하게 사용할 수 있기에 선택하게 됨 <br> - 또한 비동기를 수월하게 할 수 있는 thunk도 함께 사용할 수 있어서 선택하게 됨                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|        **react-query**        | - 게시글을 삭제했을 때 화면에 실시간으로 반영되지 않아 도입을 고려하게 됨 <br> - 화면 전환할 때마다 서버데이터를 가져오기 때문에 useEffect와 useState의 사용을 줄일 수 있고 실시간 반영이 가능해서 선택하게 됨 <br> - 무한스크롤 구현이 서비스 특성상 필요한데, 이용해서 구현이 가능해서 사용하기로 결정함                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|      **axios(instance)**      | - API를 연동하기 위해서 fetch나 axios 등으로 활용할 수 있는데 axios를 사용하게 된 이유는 자동으로 JSON 데이터 형식으로 변환이 가능하고 XSRF의 보호를 받는다는 점에서 fetch대신 axios를 선택함 <br> - 또한 data가 object 형식이 포함되고, 사용하는 법도 편리하여 사용하게 됨 <br> - axios 사용을 할 때마다 URL과 token을 중복사용하게 되어 인스턴스화 시켜서 사용하는 것으로 수정함                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|      **react-dropzone**       | - [이미지 drop 업로드] 이미지 업로드 시 기본 파일 선택으로 업로드 하는 것 뿐아니라 해당 영역에 파일을 가져다 두면 바로 업로드 되게 하는 편의성을 주고 싶어서 사용 <br> - 해당 패키지의 경우 현재 버전이 14.2.2으로로 주기적으로 업데이트 되는 부분이 확인 되고, 이미지 드롭 업로드 위주의 기능만 있어서 이 패키지를 사용하게 됨                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|     **react-image-crop**      | - [이미지 crop 기능] 사용자가 이미지를 업로드 하고 원하는 부분만 업로드 할 수 있도록 편집기능을 추가하고자 사용함 <br> - 해당 패키지의 경우 간단한 이미지 편집 기능만 들어있고, 패키지 사이즈가 77KB로 다른 패키지와 비교해서 가볍다고 생각했기에 사용 <br> - 패키지를 사용함에 있어서도 문서화 및 예제가 잘 나와있어서 선택하게 됨                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **browser-image-compression** | - [이미지(파일) 용량 조절] 상황에 맞게 이미지 사이즈를 조절해서 데이터를 저장하기 위해서 사용함 <br> - 이미지 압축하는 용으로만 구성되어 있고 파일도 451kB로 가볍고, 주간 누적 다운로드 수도 약 89,000회로 사용자가 많음 <br> - 자바스크립트 기반 이미지 압축 라이브러리며, API 사용법이 간결 <br> - 이미지를 조절하는 다양한 속성 값들을 제공해 줌(최대사이즈, 가로세로 길이, 파일 타입지정 등) <br> - 게시글 이미지 등록과 마이페이지 프로필 이미지 수정 부분에서 사용해서 사이즈에 맞는 이미지를 저장함                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|     **react-date-range**      | - 여행 기간을 입력할 수 있고 인풋과 함께 사용가능하고 다양한 레이아웃으로 커스터마이징도 가능해서 선택                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|    **react-daum-postcode**    | - 카카오 지도에 보낼 상세 주소가 필요했고 상세 주소를 찾을수 있도록 도와주는 상세 주소검색창을 띄워주기 때문에 선택                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|      **카카오 지도 api**      | - 카카오 로그인을 구현해놔서 카카오 앱 키가 있기때문에 재사용 할수 있다는 점에서 이 api를 선택                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|       **stomp, sockjs**       | - 백엔드가 spring이기 때문에 spring과 양방향 통신을 통해 채팅 기능을 구현하고자 stomp와 sockjs를 선택                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|      **gitHub Actions**       | - 프로젝트를 개발함에 있어 실제 배포후 환경에서 오류가 많이 발생한다는 점을 이전 프로젝트에서 느껴볼 수 있었음 ⇒ CI/CD가 필요하다고 느껴 프로젝트 초기부터 세팅해서 진행하기로 함 <br> - vercel, jenkis 등 ci/cd 종류가 여러개 있지만, gitHub Actions를 사용한 이유는 github에 올리면 바로바로 배포 내용을 확인할 수 있다는 점이 가장 큼 <br> - 사전에 세팅만 잘 해두면 해당 브랜치만 올려도 배포가 된다는 점, 그리고 github내에서 작업하는 거라 프로젝트 관리가 용이하다는 점에서 선택                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
|     **styled-components**     | # 도입이유 <br> - 프로젝트를 개발할 때 CSS In JS 방식을 활용해서 생산적으로 개발을 진행하기 위해 도입함 <br> - 동적 스타일링이 더욱 편리하고 현재까지 소규모의 프로젝트 이기에 빠르게 작성하고 빠르게 테스트 하는 것이 중요하다고 판단했기에 도입하게 됨 <br> # 장점 <br> - 자유로운 CSS 커스텀 컴포넌트를 만들 수 있음 <br> - 스스로 유니크한 className을 생성 --> className의 중복이나 오타로 인한 버그를 줄여줌 <br> - 모든 스타일 속성이 특정 컴포넌트와 연결되어 있기 때문에 만약 컴포넌트를 더 이상 사용하지 않아 삭제할 경우 이에 대한 스타일 속성도 함께 삭제됨 <br> - className을 일일이 수동으로 관리할 필요 없이 React의 props나 전역 속성을 기반으로 컴포넌트에 스타일 속성을 부여하기 때문에 간단하고 직관적 <br> - 컴포넌트에 스타일을 상속하는 속성을 찾아 다른 CSS 파일들을 검색하지 않아도 되기 때문에 코드의 크기가 커지더라도 유지보수가 어렵지 않음 <br> # 단점 <br> - 동적인 이벤트가 많은 사이트라면 컴포넌트가 자주 렌더링 될 때 그만큼 스타일 정보도 다시 읽어와야 되기 빠른 페이지 로드에 불리 <br> # 결정이유 <br> - 위의 단점은 작은 규모의 프로젝트에는 크게 영향이 없을 것이라 판단 |

---

## 개발 타임라인

|         일자          | 진행목록                                                                                                                                                                                                                                                                                                                                                   |
| :-------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      2022.08.26       | - 서비스 기획 <br> - 와이어프레임 작성 <br> - 서비스명 정하기                                                                                                                                                                                                                                                                                              |
|      2022.08.27       | - 노션 작성                                                                                                                                                                                                                                                                                                                                                |
|      2022.08.29       | - 컨포넌트 설계<br> - 초기 깃&깃허브 설정 <br> - createPotal 구현 <br> - 디자이너 첫 미팅                                                                                                                                                                                                                                                                  |
|      2022.08.30       | - gitHub Action을 이용한 http CI/CD 설정 <br> - 만능버튼, 만능인풋 설계 <br> - 전역 스타일 지정 <br> - 소셜로그인(카카오) 기능 구현 <br> - 게시글 등록 레이아웃 설정 <br> - 이미지 드롭존 구현                                                                                                                                                             |
|      2022.08.31       | - 소셜로그인(네이버) 기능 구현 <br> - 이미지 크롭편집 기능 구현 <br> - 메인페이지 좋아요 기능 구현 <br> - 메소리니 레이아웃 구현                                                                                                                                                                                                                           |
|      2022.09.01       | - 헤더 검색창 뷰 작업 <br> - 헤더 토글 기능 구현 <br> - 다크&라이트 모드 기능구현 <br> - 게시글 상세 모달 구현 및 게시글 좋아요 버튼                                                                                                                                                                                                                       |
|      2022.09.02       | - HTTPS CI/CD 설정( `GitHub Actions`, `S3`, `Cloud Front`, `SSL`)                                                                                                                                                                                                                                                                                          |
|      2022.09.04       | - 태그 등록시 추가 삭제 기능 구현 <br> - 채팅 기능 구현 <br> - 게시글 등록 이미지 유효성 검사 방식 수정                                                                                                                                                                                                                                                    |
|      2022.09.05       | - 채팅 기능 구현 <br> - 최근검색어 기능 구현(로컬스토리지 이용)                                                                                                                                                                                                                                                                                            |
|      2022.09.06       | - 소셜로그인(카카오) 로컬서버통신 완료 <br> - 디테일 기획 진행(with 백엔드, 디자이너) <br> - gitHub secrets key 파일 적용완료(yml파일 내 env설정)                                                                                                                                                                                                          |
|      2022.09.07       | - 모집방개설 페이지 구현중(카테고리, 달력, 지역선택 완료) <br> - 최근검색리스트 기능 에러해결완료                                                                                                                                                                                                                                                          |
|      2022.09.08       | - 모집방개설 페이지 구현중(지도) <br> - 헤더 스크롤 이벤트 및 마이페이지 토글 이벤트 적용                                                                                                                                                                                                                                                                  |
|      2022.09.09       | - 모집방개설 페이지 날짜 형식 및 테마 변환 <br> - 모집방 리스트 페이지 작업 완료 <br> - 헤더 메뉴 추가 및 토글 이벤트 추가, 스크롤 이벤트 오류 수정 <br> - 여행후기 등록 페이지 이미지 업로드 형식(blob) 변환 <br> - 타입스크립트 변환 도전으로 공부 <br> - 유저 프로필 수정하기 이미지 리사이징 및 서버통신 세팅 완료                                     |
|      2022.09.10       | - 작업파일 타입스크립트 변환                                                                                                                                                                                                                                                                                                                               |
|      2022.09.11       | - 작업파일 타입스크립트 변환                                                                                                                                                                                                                                                                                                                               |
| 2022.09.12-2022.09.17 | - 게시글 CRUD, 모집글 CRUD, 검색 서버 연동 및 기타 <br /> - react-query 변환 에러처리                                                                                                                                                                                                                                                                      |
|      2022.09.19       | - 반응형 적용 ::: 메인페이지, 게시글 등록, 마이페이지, 검색상세페이지, 헤더 <br> - 검색 상세 페이지 react-query 적용                                                                                                                                                                                                                                       |
|      2022.09.20       | - 반응형 적용 ::: 모집글 작성 <br> - 모집글 수정 페이지 유효성 검사 <br> - 모집글 수정페이지 react query 변환 <br> - 메인 페이지 무한스크롤(실시간, 추천순 모두 적용 완료) <br> - 이미지 리사이징 방법 고민                                                                                                                                                |
|      2022.09.21       | - 게시글 등록 이미지 리사이징 기능구현 <br> - 메인페이지 무한스크롤 오류 해결(추천순, 실시간순) <br> - 채팅 기능 구현(방만들기, 메시지 보내기)                                                                                                                                                                                                             |
|      2022.09.22       | - 채팅 기능 구현(메시지 실시간 전달) <br> - 마이페이지 프로필 수정 기능구현 및 유효성검사 <br> - 게시글 등록, 수정 유효성 검사                                                                                                                                                                                                                             |
|      2022.09.23       | - 채팅 세부정보 불러오기(토글)<br> - 채팅 나가기 기능 구현 <br> - 채팅 리스트와 채팅 제목 실시간 반영(react-query) <br> - 모달 모듈화 <br> - 검색 기능 에러 수정(페이지 이동시 검색 기능 그대로 보이는 경우 발생) <br> - 디자이너 일정 회의 <br>                                                                                                           |
|      2022.09.24       | - 채팅방 단건 조회 및 삭제기능 추가<br> - 검색 내역에 따른 안내 멘트 작성<br> - 상세페이지 연관검색어 조회기능<br> - 메인 무한스크롤 해결 <br> - 태그 검색 상세 무한스크롤 적용 <br> - 마이페이지 내가 쓴 모집글 조회                                                                                                                                      |
|      2022.09.25       | - 모듈화 : 슬라이드, 모달 <br> - 모집글 생성 및 수정 유효성검사 <br> - 메인 배너 기본 설정 <br> - 스타일 : 로그인 모달, 메인 배너                                                                                                                                                                                                                          |
|      2022.09.26       | - 모집글 페이지 태그검색 연결 <br> - 헤더 데스크탑 버전 스타일 적용(토글 메뉴) <br> - 자랑글 상세페이지 스타일 변경 <br> - 메인페이지 top버튼 추가 <br> - 웹폰트 적용                                                                                                                                                                                      |
|      2022.09.27       | - 게시글 등록 스타일 수정 <br> - 모집리스트 스타일 수정 <br> - NotFound 페이지 작업 <br> - 채팅 오류 해결 : DB에서 채팅내역 못 받음 <br> - 마이페이지 스타일 적용 <br> - 여행후기 상세페이지 스타일 수정 <br> - 다크모드 오류 해결 : 다크모드 초기 미적용 <br> - 반응형 스타일 : 헤더, 메인, 검색상세, 마이페이지                                          |
|      2022.09.28       | - 스타일 적용(반응형) : 마이페이지 모집글 리스트, 채팅, 모집글 작성페이지, 댓글, 모집글 작성, 게시글 등록, 미팅리스트 달력, 모집글수정, 채팅, 자랑글 상세 <br> - 푸터 세팅 <br> - 여행상세페이지 댓글 기능 추가 <br> - 미팅 리스트 날짜 조회 필터 기능 구현 <br> - 배너 적용방식 변경 <br> - 메인 탑버튼 수정 <br> - 마이페이지 프로필 수정 기능 오류 해결 |
|      2022.09.29       | - 스타일 수정(반응형, 다크모드) : 오류팝업, 헤더, 채팅, 모집글 작성페이지 <br> - textarea, tag 공통 컨포넌트 수정<br> - 가이드 팝업 구현 <br> - 모집글 찜기능 구현<br> - 마이페이지 내가쓴 댓글, 좋아요 조회 기능 구현 <br> - 그 외 배포 전 오류 처리                                                                                                      |
|      2022.10.01       | - 상세페이지 댓글&모집글 삭제 시 모달처리 <br> - 마이페이지 슬라이드 적용 <br> - 프로필 수정 유효성 검사 <br> - 검색버튼 기능 구현 추가 <br> - 라우터 아이디 구체화 작업 <br> - 태그 많은 경우 화면깨지는 현상 해결 & 태그 입력 개수 제한                                                                                                                  |
|      2022.10.02       | - 타입스크립트 변환(세팅, 메인, 공통컨포넌트(리덕스, 라우터), 로그인, 모집글, 여행후기, 검색 상세 등) <br> - 주소 입력시 튕기는 오류 해결 <br> - 아이폰 날짜 계산 오류 해결 <br> - 내용 내려쓰기 출력 처리                                                                                                                                                 |
|      2022.10.03       | - 타입스크립트 변환(마이페이지) <br> - 브로셔 작성 <br> - 트러블 슈팅, 아키텍처 등 문서 작성 <br> - 피드백 선물 전달                                                                                                                                                                                                                                       |

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

### 2. 아이폰에서 이미지 업로드 시 4MB 이상이면 HTML 5 canvas 가 작동안하는 현상

#### 문제 발생

- 기종 별 게시글 등록 테스트 중 아이폰에서 이미지를 업로드 했을 때, 편집기능이 작동이 안하는 현상 발생(canvas)
- 작은 크기의 이미지를 업로드를 했을 때는 잘 올라간다는 점을 보아 원본 이미지 크기 문제라고 생각하게 됨
- Mac os safari의 아이폰 메모리 이슈로 4MB가 넘어가면 캔버스 최대 크기를 연산할 수가 없다고 함

#### 문제 해결을 위해 시도한 과정

- 업로드한 원본 파일의 크기가 4MB 이상이라면 2MB로 리사이징을 먼저 진행하고 편집할 수 있도록 시도
- `원본이미지 파일 업로드 -> 이미지 용량 감소 -> 이미지 편집(크롭기능) -> 원본 이미지 가로 사이즈에 따라서 이미지 크기 감소(가로 1,500픽셀 기준) -> 데이터 전송` 순으로 이미지가 등록될 수 있도록 시도

#### 문제 해결

##### 1. 파일 업로드 시 이미지를 일정 크기로 사이즈 조절 : `browser-image-compression` 라이브러리 사용하여 이미지 용량 감소 `최대 1.5MB` 사이즈로 설정

- 이미지 사이즈를 너무 줄이면 깨져보이는 현상 발생, 여행 다녀온 이미지를 올려서 커뮤니티하는 서비스이기에 이미지가 중요해서 적정용량을 맞추는 게 필요(너무 작으면 안됨)

##### 2. 이미지 편집 시 원본이미지의 가로 사이즈에 따라 사이즈 조절 진행

- 가로사이즈 기준을 `1500 픽셀`로 맞춰서 진행

```
  // ::: 원본 이미지 사이즈에 따라서 비율조절 : 가로 사이즈 1,500픽셀로 맞춤
  const caculatePixelRatio = (originWidth, deviceRatio) => {
    if (originWidth >= 4000) {
      return deviceRatio * 0.37;
    } else if (originWidth >= 3000) {
      return deviceRatio * 0.5;
    } else if (originWidth >= 2000) {
      return deviceRatio * 0.75;
    } else {
      return deviceRatio;
    }
  };
  const pixelRatio = caculatePixelRatio(imageRef.current.naturalWidth, 1);
```

##### 3. 디바이스별 이미지 업로드 테스트 진행

- 이미지 기준을 맞출 때, 모바일로 촬영해서 이미지를 업로드를 할 거 같아서, 모바일 사진 촬영후 카카오톡 고화질로 이미지를 다운 받은 후 데스크탑에서 테스트 진행

  - 여행이미지를 올리는 서비스이기에 휴대폰으로 촬영한 사진을 올리는 경우가 많을거라 예상함
    <img src="https://github.com/project-raidho/raidho_FE/blob/yoojin/docs/imageResizingSample.png?raw=true" width="900">

- 아이폰 사파리 브라우저를 통해 업로드 테스트 진행
  - 최대로 편집을 진행해도 잘 업로드 되는 점을 확인 할 수 있었음
  - 원본 화질과 업로드된 이미지 화질 차이가 많이 나지 않는다는 점을 육안으로 확인할 수 있었음
    <img src="https://github.com/project-raidho/raidho_FE/blob/yoojin/docs/imageResizingSampleMobile2.png?raw=true" width="900">

---

## 이미지 성능최적화

- 여행후기를 등록하면서 이미지를 메인으로 게시글을 작성하는 웹 서비스이기에, 게시글이 많아지면 서비스 성능적인 부분이 우려가 됨
- 게시글을 업로드 했을 때 로딩속도가 느리는 현상 발생

### 1. 파일 형식 결정 ::: png vs jpeg vs webp

### 2. 기준 사이즈를 정해서 이미지 용량 압축 ::: 이미지 압축 라이브러리 활용

### 3. HTML5 canvas 태그 활용해서 필요한 부분만 편집해서 사용할 수 있도록 구현 진행 및 최대 사이즈 조절

### 4. HTML img 태그 속성중 loading 속성 활용

---

## 반응형 세팅

- 데스크탑 퍼스트로 break point 높은 순서부터 작성 : 데스크탑 기준의 서비스 제작(theme 파일 적용)

```
  mobile: `(max-width: 639px)`,
  tablet: `(max-width: 767px)`,
  desktop: `(min-width: 1025px)`,
```

---

## 추가하고 싶은 기능

- 라이도 여행 모집글로 만난 사람들끼리 여행종료 후 라이도에서 모집후기를 쓰도록 유도하는 기능
  - 모집글 때의 데이터를 바탕으로 모집 후기글 작성시 기본디폴트 데이터로 넣어 줄 수 있음

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
