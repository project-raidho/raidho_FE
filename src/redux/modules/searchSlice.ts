import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SearchProps {
  isLoading: boolean;
  error: null;
  recentSearch: string[];
  darkMode: boolean;
}

// ::: 초기값
const initialState = {
  isLoading: false,
  error: null,
  recentSearch: [],
  darkMode: localStorage.getItem("bgMode") === "dark" ? true : false,
};

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    getRecentSearch: (state, action) => {
      let initRecentSearches = localStorage.getItem("recentSearches");
      if (initRecentSearches === null) {
        initRecentSearches = "";
      }
      initRecentSearches
        ? (state.recentSearch = JSON.parse(initRecentSearches))
        : (state.recentSearch = []);
    },
    addRecentSearch: (state, action: PayloadAction<SearchProps>) => {
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
      state.recentSearch = [
        ...state.recentSearch.filter((tag) => tag !== action.payload),
      ];
      localStorage.setItem(
        "recentSearches",
        JSON.stringify(state.recentSearch)
      );
    },
    getDarkMode: (state, action) => {
      const initDarkMode = localStorage.getItem("bgMode");
      initDarkMode === "dark"
        ? (state.darkMode = true)
        : (state.darkMode = false);
    },
    updateDarkMode: (state, action) => {
      state.darkMode = action.payload;
      state.darkMode === true
        ? localStorage.setItem("bgMode", "dark")
        : localStorage.setItem("bgMode", "light");
    },
  },
});

export const {
  getRecentSearch,
  addRecentSearch,
  deleteRecentSearch,
  getDarkMode,
  updateDarkMode,
} = searchSlice.actions;
export default searchSlice.reducer;
