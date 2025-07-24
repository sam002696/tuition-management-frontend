import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  acceptedRequests: [],
  loading: false,
  error: null,
};

const studentManagementSlice = createSlice({
  name: "studentManagement",
  initialState,
  reducers: {
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
  },
});

export const {
  fetchAcceptedRequestsStart,
  fetchAcceptedRequestsSuccess,
  fetchAcceptedRequestsFailure,
} = studentManagementSlice.actions;

export default studentManagementSlice.reducer;
