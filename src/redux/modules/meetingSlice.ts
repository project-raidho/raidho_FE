import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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
    {
      id: 2,
      memberName: 'kyungmoon',
      memberImage: 'https://avatars.githubusercontent.com/u/97393364?v=4',
      meetingTitle: '국토대장정',
      meetingTheme: '배낭여행',
      locationTag: '부산',
      meetingTags: ['국토대장정', '우리나라한바퀴', '힘들면 빠꾸'],
      meetingAddress: '경기도 용인시 구갈로0000',
      meetingPeople: 3,
      meetingParticipant: 1,
      meetingStatus: 1,
      meetingPeriod: '2022.09.30-2022.10.02',
    },
    {
      id: 3,
      memberName: 'yoojin',
      memberImage: 'https://avatars.githubusercontent.com/u/99028253?v=4',
      meetingTitle: '어디갈까나',
      meetingTheme: '등산',
      locationTag: '서울',
      meetingTags: ['서울등산', '등린이', '환영'],
      meetingAddress: '서울 서초구 강남대로000',
      meetingPeople: 5,
      meetingParticipant: 1,
      meetingStatus: 2, // 1 모집중, 2 모집완료, 3진행완료
      meetingPeriod: '2022.09.30-2022.10.02',
    },
    {
      id: 4,
      memberName: 'kyungmoon',
      memberImage: 'https://avatars.githubusercontent.com/u/97393364?v=4',
      meetingTitle: '카페는 안될까',
      meetingTheme: '배낭여행',
      locationTag: '부산',
      meetingTags: ['국토대장정', '우리나라한바퀴', '힘들면 빠꾸'],
      meetingAddress: '경기도 용인시 구갈로0000',
      meetingPeople: 3,
      meetingParticipant: 1,
      meetingStatus: 3,
      meetingPeriod: '2022.09.30-2022.10.02',
    },
    {
      id: 5,
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
    {
      id: 6,
      memberName: 'kyungmoon',
      memberImage: 'https://avatars.githubusercontent.com/u/97393364?v=4',
      meetingTitle: '국토대장정',
      meetingTheme: '배낭여행',
      locationTag: '부산',
      meetingTags: ['국토대장정', '우리나라한바퀴', '힘들면 빠꾸'],
      meetingAddress: '경기도 용인시 구갈로0000',
      meetingPeople: 3,
      meetingParticipant: 1,
      meetingStatus: 1,
      meetingPeriod: '2022.09.30-2022.10.02',
    },
    {
      id: 7,
      memberName: 'yoojin',
      memberImage: 'https://avatars.githubusercontent.com/u/99028253?v=4',
      meetingTitle: '어디갈까나',
      meetingTheme: '등산',
      locationTag: '서울',
      meetingTags: ['서울등산', '등린이', '환영'],
      meetingAddress: '서울 서초구 강남대로000',
      meetingPeople: 5,
      meetingParticipant: 1,
      meetingStatus: 2, // 1 모집중, 2 모집완료, 3진행완료
      meetingPeriod: '2022.09.30-2022.10.02',
    },
    {
      id: 8,
      memberName: 'kyungmoon',
      memberImage: 'https://avatars.githubusercontent.com/u/97393364?v=4',
      meetingTitle: '카페는 안될까',
      meetingTheme: '배낭여행',
      locationTag: '부산',
      meetingTags: ['국토대장정', '우리나라한바퀴', '힘들면 빠꾸'],
      meetingAddress: '경기도 용인시 구갈로0000',
      meetingPeople: 3,
      meetingParticipant: 1,
      meetingStatus: 3,
      meetingPeriod: '2022.09.30-2022.10.02',
    },
  ],
};

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
