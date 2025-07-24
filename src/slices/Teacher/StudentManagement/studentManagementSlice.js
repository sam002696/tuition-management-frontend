import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connectionRequests: [],
  pagination: null,
  loading: false,
  error: null,
};

const studentManagementSlice = createSlice({
  name: "studentManagement",
  initialState,
  reducers: {
    fetchConnectionRequestsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchConnectionRequestsSuccess: (state, { payload }) => {
      state.loading = false;
      state.connectionRequests = payload.requests;
      state.pagination = payload.pagination;
    },
    fetchConnectionRequestsFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {
  fetchConnectionRequestsStart,
  fetchConnectionRequestsSuccess,
  fetchConnectionRequestsFailure,
} = studentManagementSlice.actions;

export default studentManagementSlice.reducer;
