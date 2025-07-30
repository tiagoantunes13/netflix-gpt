import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import favoritesReducer from "./favoritesSlice";
export default configureStore({
  reducer: {
    user: userReducer,
    favorites: favoritesReducer,
  },
});
