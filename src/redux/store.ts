import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import postSlice from './modules/postSlice';
import userSlice from './modules/userSlice';
import meetingSlice from './modules/meetingSlice';
import searchSlice from './modules/searchSlice';
import themeSlice from './modules/themeSlice';
import Chat from './modules/chat';

// ::: 여러개의 reducer 통합
const reducer = combineReducers({
  postSlice,
  userSlice,
  meetingSlice,
  searchSlice,
  themeSlice,
  chat: Chat,
});

// ::: 스토어 생성, 미들웨어 설정
export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof reducer>;
