import { createSlice } from "@reduxjs/toolkit";

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    value: [],
  },
  reducers: {
    removeFavorite: (state, action) => {
      state.value = state.value.filter(
        (movie) => movie.id !== action.payload.id
      );
    },
    addFavorite: (state, action) => {
      const hasMovie = state.value.find(
        (movie) => movie.id === action.payload.id
      );
      if (!hasMovie) {
        state.value.push(action.payload);
      }
    },
  },
});

export const { removeFavorite, addFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
