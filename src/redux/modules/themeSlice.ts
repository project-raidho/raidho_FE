import { createSlice } from "@reduxjs/toolkit";

// ::: 초기값
const initialState = {
  isLoading: false,
  error: null,
  themeList: [
    {
      themeName: "국내",
      themeImage:
        "https://www.outsideonline.com/wp-content/uploads/2020/05/15/29er-trend-2020_h.jpg?crop=16:9&width=960&enable=upscale&quality=100",
    },
    {
      themeName: "유럽",
      themeImage:
        "https://cdn.incheontoday.com/news/photo/201803/38626_32816_3621.jpg",
    },
    {
      themeName: "아메리카",
      themeImage:
        "https://img.etoday.co.kr/pto_db/2020/07/600/20200724101818_1488853_1199_796.jpg",
    },
    {
      themeName: "아시아",
      themeImage:
        "https://scontent-ssn1-1.xx.fbcdn.net/v/t1.6435-9/53932247_826285544383664_3053291739625291776_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=1Hd45M8Uz6wAX9gh658&_nc_ht=scontent-ssn1-1.xx&oh=00_AT-2gRhK6AVu7k-3DkpxbIWwCicb5x78BXN-MREC-IufjQ&oe=633521FA",
    },
    {
      themeName: "오세아니아",
      themeImage:
        "https://scontent-ssn1-1.xx.fbcdn.net/v/t1.6435-9/53932247_826285544383664_3053291739625291776_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=1Hd45M8Uz6wAX9gh658&_nc_ht=scontent-ssn1-1.xx&oh=00_AT-2gRhK6AVu7k-3DkpxbIWwCicb5x78BXN-MREC-IufjQ&oe=633521FA",
    },
    {
      themeName: "아프리카",
      themeImage:
        "https://scontent-ssn1-1.xx.fbcdn.net/v/t1.6435-9/53932247_826285544383664_3053291739625291776_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=1Hd45M8Uz6wAX9gh658&_nc_ht=scontent-ssn1-1.xx&oh=00_AT-2gRhK6AVu7k-3DkpxbIWwCicb5x78BXN-MREC-IufjQ&oe=633521FA",
    },
  ],

  locationList: ["전국", "서울특별시", "인천광역시", "대전광역시", "광주광역시", "대구광역시", "울산광역시", "부산광역시", "경기도", "강원도", "충청북도", "충청남도", "전라북도", "전라남도", "경상북도", "경상남도", "제주도"],
}

const themeSlice = createSlice({
  name: "themeSlice",
  initialState,
  reducers: {
    getTheme: (state, action) => {
      state.themeList = initialState.themeList;
      console.log(state.themeList);
    },
  },
  extraReducers: {},
});


export const { getTheme } = themeSlice.actions;
export default themeSlice.reducer;