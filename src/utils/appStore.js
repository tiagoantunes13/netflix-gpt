import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import favoritesReducer from "./favoritesSlice";
import moviesReducer from "./moviesSlice";
export default configureStore({
  reducer: {
    user: userReducer,
    favorites: favoritesReducer,
    movies: moviesReducer,
  },
});
