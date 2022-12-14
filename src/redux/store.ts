import { combineReducers, configureStore } from "@reduxjs/toolkit";
import searchSlice from "./modules/searchSlice";
import themeSlice from "./modules/themeSlice";

// ::: 여러개의 reducer 통합
const reducer = combineReducers({
  searchSlice,
  themeSlice,
});

// ::: 스토어 생성, 미들웨어 설정
export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof reducer>;
