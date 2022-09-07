import { createSlice } from "@reduxjs/toolkit";

// ::: 초기값
const initialState = {
  isLoading: false,
  error: null,
  recentSearch: [],
}

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    getRecentSearch: (state, action) => {
      const initRecentSearches = localStorage.getItem("recentSearches");
      initRecentSearches
        ? state.recentSearch = JSON.parse(localStorage.getItem("recentSearches"))
        : state.recentSearch = [];
    },
    addRecentSearch: (state, action) => {
      let count = 0;
      const maxCount = 4;
      const resultRecentSearch = state.recentSearch.filter((tag) => {
        if (tag === action.payload || count >= maxCount) {
          return false;
        }
        count += 1;
        return true;
      });
      state.recentSearch = [action.payload, ...resultRecentSearch];
      localStorage.setItem(
        "recentSearches",
        JSON.stringify(state.recentSearch)
      );
    },
    deleteRecentSearch: (state, action) => {
      state.recentSearch = [...state.recentSearch.filter((tag) => tag !== action.payload)];
    }
  },
});

export const { getRecentSearch, addRecentSearch, deleteRecentSearch } = searchSlice.actions;
export default searchSlice.reducer;

