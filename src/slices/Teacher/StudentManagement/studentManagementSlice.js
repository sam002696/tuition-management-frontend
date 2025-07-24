import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  acceptedRequests: [],
  pendingRequests: [],
  loading: false,
  error: null,
};

const studentManagementSlice = createSlice({
  name: "studentManagement",
  initialState,
  reducers: {
    // Actions for accepted requests

    fetchAcceptedRequestsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAcceptedRequestsSuccess: (state, { payload }) => {
      state.loading = false;
      state.acceptedRequests = payload;
    },
    fetchAcceptedRequestsFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // Actions for pending requests

    fetchPendingRequestsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPendingRequestsSuccess: (state, { payload }) => {
      state.loading = false;
      state.pendingRequests = payload;
    },
    fetchPendingRequestsFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {
  fetchAcceptedRequestsStart,
  fetchAcceptedRequestsSuccess,
  fetchAcceptedRequestsFailure,

  fetchPendingRequestsStart,
  fetchPendingRequestsSuccess,
  fetchPendingRequestsFailure,
} = studentManagementSlice.actions;

export default studentManagementSlice.reducer;
