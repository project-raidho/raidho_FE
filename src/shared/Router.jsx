import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import MyProfilePage from '../pages/MyProfilePage';
import CreatePostPage from '../pages/CreatePostPage';
import UpdatePostPage from '../pages/UpdatePostPage';
import SearchTagPage from '../pages/SearchTagPage';
import CreateMeetingPage from '../pages/CreateMeetingPage';
import MeetingListPage from '../pages/MeetingListPage';
import ChattingPage from '../pages/ChattingPage';
import KakaoLogin from '../components/login/KakaoLogin';
import NaverLogin from '../components/login/NaverLogin';

const Routers = () => {
  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<MainPage />} /> 
        <Route path='/myProfile' element={<MyProfilePage />} />
        <Route path='/createPost' element={<CreatePostPage />} />
        <Route path='/updatePost/:postId' element={<UpdatePostPage />} />
        <Route path="/tag" element={<SearchTagPage />} />
        <Route path='/createMeeting' element={<CreateMeetingPage />} />
        <Route path='/meetingList' element={<MeetingListPage />} />
        <Route path='/chatting' element={<ChattingPage />} />
        <Route path="/user/kakao/callback" element={<KakaoLogin/>} />
        <Route path='/oauth/naver' element={<NaverLogin/>} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
