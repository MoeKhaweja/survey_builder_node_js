import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  userId: null,
  isAdmin: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    updateUserId(state, actions) {
      state.userId = actions.payload;
    },
    setAdmin(state) {
      state.isAdmin = true;
    },
    setUser(state) {
      state.isAdmin = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
