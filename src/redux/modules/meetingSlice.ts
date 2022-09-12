import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface meetingState {
  isLoading: boolean;
  error: null | string;
  meetingList: [
    {
      id: number;
      memberName: string;
      memberImage: string;
      meetingTitle: string;
      meetingTheme: string;
      locationTag: string;
      meetingTags: string[];
      meetingAddress: string;
      meetingPeople: number;
      meetingParticipant: number;
      meetingStatus: number;
      meetingPeriod: string;
    },
  ];
}

const URL = process.env.REACT_APP_BASE_URL;

// ::: 초기값
const initialState = {
  isLoading: false,
  error: null,
  meetingList: [
    {
      id: 1,
      memberName: 'yoojin',
      memberImage: 'https://avatars.githubusercontent.com/u/99028253?v=4',
      meetingTitle: '함께가요! 등산!',
      meetingTheme: '등산',
      locationTag: '서울',
      meetingTags: ['서울등산', '등린이', '환영'],
      meetingAddress: '서울 서초구 강남대로000',
      meetingPeople: 5,
      meetingParticipant: 1,
      meetingStatus: 1, // 1 모집중, 2 모집완료, 3진행완료
      meetingPeriod: '2022.09.30-2022.10.02',
    },
  ],
} as meetingState;

// ::: 게시글 리스트 출력
export const getMeetingList = createAsyncThunk('meeting/getMeetingList', async (payload, thunkAPI) => {
  try {
    const response = await axios.get(`${URL}/api/meeting`);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const meetingSlice = createSlice({
  name: 'meetingSlice',
  initialState,
  reducers: {},
  extraReducers: {
    // ::: 미팅리스트 전체 불러오기
    [getMeetingList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getMeetingList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.meetingList = action.payload;
    },
    [getMeetingList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default meetingSlice.reducer;
