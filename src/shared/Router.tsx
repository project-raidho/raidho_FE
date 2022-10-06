import React, { useEffect, lazy, Suspense } from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getDarkMode } from "../redux/modules/searchSlice";
import HeaderContainer from "../components/header/HeaderContainer";
import Loading from "../elements/Loading";

const MainPage = lazy(() => import("../pages/MainPage"));
const PostDetailPage = lazy(() => import("../pages/PostDetailPage"));
const MyProfilePage = lazy(() => import("../pages/MyProfilePage"));
const CreatePostPage = lazy(() => import("../pages/CreatePostPage"));
const UpdatePostPage = lazy(() => import("../pages/UpdatePostPage"));
const SearchTagPage = lazy(() => import("../pages/SearchTagPage"));
const CreateMeetingPage = lazy(() => import("../pages/CreateMeetingPage"));
const UpdateMeetingPage = lazy(() => import("../pages/UpdateMeetingPage"));
const MeetingListPage = lazy(() => import("../pages/MeetingListPage"));
const ChattingPage = lazy(() => import("../pages/ChattingPage"));
const KakaoLogin = lazy(() => import("../components/login/KakaoLogin"));
const NotFound = lazy(() => import("../pages/NotFound"));
const GlobalLayout = lazy(() => import("../global/GlobalLayout"));
const GlobalFooter = lazy(() => import("../global/GlobalFooter"));

const Routers = () => {
  const dispatch = useDispatch();

  const themeList = useSelector(
    (state: RootState) => state.themeSlice.themeList
  );
  const checkDarkMode = useSelector(
    (state: RootState) => state.searchSlice.darkMode
  );

  // ::: Dark & Light 기능구현
  useEffect(() => {
    dispatch(getDarkMode());
    if (checkDarkMode) {
      document.getElementsByTagName("html")[0].classList.add("darkMode");
    }
  }, [dispatch, checkDarkMode]);

  return (
    <BrowserRouter>
      <StRouterWrapp>
        <HeaderContainer />
        <GlobalLayout>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/latest" element={<MainPage />} />
              <Route path="/likelist" element={<MainPage />} />
              <Route path="/postDetail/:postId" element={<PostDetailPage />} />
              <Route path="/myProfile" element={<MyProfilePage />} />
              <Route path="/createPost" element={<CreatePostPage />} />
              <Route path="/updatePost/:postId" element={<UpdatePostPage />} />
              <Route path="/post/:tagName" element={<SearchTagPage />} />
              <Route path="/meeting/:tagName" element={<SearchTagPage />} />
              <Route path="/createMeeting" element={<CreateMeetingPage />} />
              <Route
                path="/updateMeeting/:meetingId"
                element={<UpdateMeetingPage />}
              />
              {themeList.map((theme) => (
                <Route
                  key={theme.themeName}
                  path={`/meetingList/${theme.themePath}`}
                  element={<MeetingListPage />}
                />
              ))}
              {themeList.map((theme) => (
                <Route
                  key={theme.themeName}
                  path={`/meeting/${theme.themePath}/:tagName`}
                  element={<SearchTagPage />}
                />
              ))}
              <Route path="/chatting" element={<ChattingPage />} />
              <Route path="/chatting/:chattingId" element={<ChattingPage />} />
              <Route path="/login/oauth2/code/kakao" element={<KakaoLogin />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </GlobalLayout>
        <GlobalFooter />
      </StRouterWrapp>
    </BrowserRouter>
  );
};

export default Routers;

const StRouterWrapp = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: var(--bg-color);
`;
