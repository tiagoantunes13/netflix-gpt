import { createSlice } from "@reduxjs/toolkit";

export const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    library: null,
    lastFetched: null,
    featuredMovie: null,
    libraryArray: [],
  },
  reducers: {
    setLibrary: (state, action) => {
      state.library = action.payload;
      state.lastFetched = Date.now();
    },
    setFeaturedMovie: (state, action) => {
      state.featuredMovie = action.payload;
    },
    setLibraryArray: (state, action) => {
      state.libraryArray = action.payload;
    },
  },
});

export const { setLibrary, setFeaturedMovie, setLibraryArray } = moviesSlice.actions;

export default moviesSlice.reducer;
