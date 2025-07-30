import { createSlice } from "@reduxjs/toolkit";

export const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    library: null,
    lastFetched: null,
  },
  reducers: {
    setLibrary: (state, action) => {
      state.library = action.payload;
      state.lastFetched = Date.now();
    },
  },
});

export const { setLibrary } = moviesSlice.actions;

export default moviesSlice.reducer;
