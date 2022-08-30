import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const URL = {
  BASE: process.env.REACT_APP_BASE_URL,
};

// ::: 초기값
const initialState = {
  isLoading: false,
  error: null,
}

// // ::: 상세 게시글 출력
// export const __getPostDetail = createAsyncThunk(
//   "detail/__getPostDetail",
//   async (payload, thunkAPI) => {
//     try {
//       const response = await axios.get(`${URL.BASE}api/post/${payload}`, {
//         headers: {
//           Authorization: `${USER.AUTHORIZATION}`
//         }
//       });
//       return thunkAPI.fulfillWithValue(response.data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: {
    // :: 유저 정보 불러오기
    // [__getUserDetail.pending]: (state, action) => {
    //   state.isLoading = true;
    // },
    // [__getUserDetail.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.userDetail = action.payload;
    // },
    // [__getUserDetail.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },

  }
});




export default userSlice.reducer;

