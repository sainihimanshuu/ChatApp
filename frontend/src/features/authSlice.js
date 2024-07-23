import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loginStatus: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    storeLogin: (state, action) => {
      (state.user = action.payload), (state.loginStatus = true);
    },
    storeLogout: (state) => {
      (state.user = null), (state.loginStatus = false);
    },
  },
});

export const { storeLogin, storeLogout } = authSlice.actions;
export default authSlice.reducer;
