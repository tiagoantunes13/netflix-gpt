import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: null,
  },
  reducers: {
    removeUser: (state) => {
      state.value = null;
    },
    addUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { removeUser, addUser } = userSlice.actions;

export default userSlice.reducer;
