import { combineReducers, configureStore } from "@reduxjs/toolkit";
import postSlice from "./modules/postSlice";
import userSlice from "./modules/userSlice";
import Chat from './modules/chat';
import logger from "redux-logger";

// ::: 여러개의 reducer 통합
const reducer = combineReducers({
  postSlice,
  userSlice,
  chat: Chat
});

// ::: 스토어 생성, 미들웨어 설정
export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});