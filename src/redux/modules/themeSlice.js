import { createSlice } from "@reduxjs/toolkit";

// ::: 초기값
const initialState = {
  isLoading: false,
  error: null,
  themeList: [
    {
      themeName: "전체",
      themeImage:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dHJhdmVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      themePath: "all"
    },
    {
      themeName: "국내",
      themeImage:
        "https://images.unsplash.com/photo-1616738227115-954748f35c61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      themePath: "korea"
    },
    {
      themeName: "유럽",
      themeImage:
        "https://images.unsplash.com/photo-1493707553966-283afac8c358?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      themePath: "europe"
    },
    {
      themeName: "아메리카",
      themeImage:
        "https://images.unsplash.com/photo-1536277885040-c57f00adb449?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
      themePath: "america"
    },
    {
      themeName: "아시아",
      themeImage:
        "https://images.unsplash.com/photo-1532236395709-7d70320fec2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1202&q=80",
      themePath: "asia"
    },
    {
      themeName: "오세아니아",
      themeImage:
        "https://images.unsplash.com/photo-1509259305526-037fbbf698fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
      themePath: "oseania"
    },
    {
      themeName: "아프리카",
      themeImage:
        "https://images.unsplash.com/photo-1523805009345-7448845a9e53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80",
      themePath: "africa"
    },
  ],

  recommendTagList: [
    {
      recommendTagName: "바다",
      recommendTagImage:
        "https://images.unsplash.com/photo-1625822458130-2c679681e28b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80",
    },
    {
      recommendTagName: "제주",
      recommendTagImage:
        "https://images.unsplash.com/photo-1612977512598-3b8d6a498bbb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    },
    {
      recommendTagName: "미국",
      recommendTagImage:
        "https://images.unsplash.com/photo-1511055882449-bef7ffcedac0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80",
    },
    {
      recommendTagName: "해외여행추천",
      recommendTagImage:
        "https://images.unsplash.com/photo-1500835556837-99ac94a94552?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
      recommendTagName: "프랑스",
      recommendTagImage:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
    },
    {
      recommendTagName: "여행스타그램",
      recommendTagImage:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1121&q=80",
    },
    {
      recommendTagName: "하와이",
      recommendTagImage:
        "https://images.unsplash.com/photo-1542259009477-d625272157b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    },
    {
      recommendTagName: "동남아",
      recommendTagImage:
        "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    },
  ],
}

const themeSlice = createSlice({
  name: "themeSlice",
  initialState,
  reducers: {
    getTheme: (state, action) => {
      state.themeList = initialState.themeList;
      // console.log(state.themeList);
    },
    getRecommandTag: (state, action) => {
      state.recommendTagList = initialState.recommendTagList;
      // console.log(state.recommendTagList);
    },
  },
  extraReducers: {},
});


export const { getTheme, getRecommandTag } = themeSlice.actions;
export default themeSlice.reducer;