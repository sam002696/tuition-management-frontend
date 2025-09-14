// store/apiSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,

  // reset password flags
  resetLoading: false,
  resetError: null,
  resetSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.user = payload.user;
      state.token = payload.token;
      state.isAuthenticated = true;
    },
    loginFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, { payload }) => {
      state.loading = false;
      state.user = payload.user;
      state.token = payload.token;
      state.isAuthenticated = true;
    },
    registerFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // --- Reset password
    resetPasswordStart: (state) => {
      state.resetLoading = true;
      state.resetError = null;
      state.resetSuccess = false;
    },
    resetPasswordSuccess: (state) => {
      state.resetLoading = false;
      state.resetError = null;
      state.resetSuccess = true;
    },
    resetPasswordFailure: (state, { payload }) => {
      state.resetLoading = false;
      state.resetError = payload;
      state.resetSuccess = false;
    },
    resetPasswordClear: (state) => {
      state.resetLoading = false;
      state.resetError = null;
      state.resetSuccess = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerStart,
  registerSuccess,
  registerFailure,

  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
  resetPasswordClear,
} = authSlice.actions;

export default authSlice.reducer;
