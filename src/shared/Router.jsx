import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import MainPage from "../pages/MainPage";
import PostDetailPage from "../pages/PostDetailPage";
import MyProfilePage from "../pages/MyProfilePage";
import CreatePostPage from "../pages/CreatePostPage";
import UpdatePostPage from "../pages/UpdatePostPage";
import SearchTagPage from "../pages/SearchTagPage";
import CreateMeetingPage from "../pages/CreateMeetingPage";
import MeetingListPage from "../pages/MeetingListPage";
import ChattingPage from "../pages/ChattingPage";
import KakaoLogin from "../components/login/KakaoLogin";
import NaverLogin from "../components/login/NaverLogin";

const Routers = () => {
  const themeList = useSelector((state) => state.themeSlice.themeList);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/postDetail/:id" element={<PostDetailPage />} />
        <Route path="/myProfile" element={<MyProfilePage />} />
        <Route path="/createPost" element={<CreatePostPage />} />
        <Route path="/updatePost/:postId" element={<UpdatePostPage />} />
        <Route path="/post/:tagName" element={<SearchTagPage />} />
        <Route path="/meeting/:tagName" element={<SearchTagPage />} />
        <Route path="/createMeeting" element={<CreateMeetingPage />} />
        <Route path="/meetingList" element={<MeetingListPage />} />
        {themeList.map((theme) => (
          <Route
            key={theme.themeName}
            path={`/meetingList/${theme.themePath}`}
            element={<MeetingListPage />}
          />
        ))}
        <Route path="/chatting" element={<ChattingPage />} />
        <Route path="/chatting/:id" element={<ChattingPage />} />
        <Route path="/login/oauth2/code/kakao" element={<KakaoLogin />} />
        <Route path="/oauth/naver" element={<NaverLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
