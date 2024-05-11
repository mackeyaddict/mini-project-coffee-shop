import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: {
    uid: "",
    email: "",
    fullName: "",
    role: "" 
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = {
        uid: action.payload.uid,
        email: action.payload.email,
        fullName: action.payload.fullName,
        role: action.payload.role
      };
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = {
        uid: "",
        email: "",
        displayName: "",
        role: ""
      };
    },
  },
});


export const { login, logout } = authSlice.actions;

export default authSlice.reducer;