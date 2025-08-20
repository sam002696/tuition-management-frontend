// slices/Student/ConnectTeachers/connectTeacherSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requests: [],
  fetchLoading: false,
  fetchError: null,

  acceptLoading: false,
  acceptError: null,

  declineLoading: false,
  declineError: null,
};

const connectTeacherSlice = createSlice({
  name: "connectTeachers",
  initialState,
  reducers: {
    // Fetch requests
    fetchRequestsStart: (state) => {
      state.fetchLoading = true;
      state.fetchError = null;
    },
    fetchRequestsSuccess: (state, { payload }) => {
      state.fetchLoading = false;
      state.requests = payload;
    },
    fetchRequestsFailure: (state, { payload }) => {
      state.fetchLoading = false;
      state.fetchError = payload;
    },

    // Accept request
    acceptRequestStart: (state) => {
      state.acceptLoading = true;
      state.acceptError = null;
    },
    acceptRequestSuccess: (state, { payload }) => {
      state.acceptLoading = false;
      state.requests = state.requests.filter((req) => req.id !== payload);
    },
    acceptRequestFailure: (state, { payload }) => {
      state.acceptLoading = false;
      state.acceptError = payload;
    },

    // Decline request
    declineRequestStart: (state) => {
      state.declineLoading = true;
      state.declineError = null;
    },
    declineRequestSuccess: (state, { payload }) => {
      state.declineLoading = false;
      state.requests = state.requests.filter((req) => req.id !== payload);
    },
    declineRequestFailure: (state, { payload }) => {
      state.declineLoading = false;
      state.declineError = payload;
    },

    // Clear all requests
    clearRequests: (state) => {
      state.requests = [];
      state.fetchLoading = false;
      state.fetchError = null;
      state.acceptLoading = false;
      state.acceptError = null;
      state.declineLoading = false;
      state.declineError = null;
    },

    // Clear all errors
    clearError: (state) => {
      state.fetchError = null;
      state.acceptError = null;
      state.declineError = null;
    },
  },
});

export const {
  fetchRequestsStart,
  fetchRequestsSuccess,
  fetchRequestsFailure,
  acceptRequestStart,
  acceptRequestSuccess,
  acceptRequestFailure,
  declineRequestStart,
  declineRequestSuccess,
  declineRequestFailure,
  clearRequests,
  clearError,
} = connectTeacherSlice.actions;

export default connectTeacherSlice.reducer;
