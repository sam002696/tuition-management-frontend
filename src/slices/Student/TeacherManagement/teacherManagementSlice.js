import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connectionRequests: [],
  pagination: null,
  loading: false,
  error: null,

  connectionCount: null,
};

const teacherManagementSlice = createSlice({
  name: "teacherManagement",
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

    // Action to disconnect a teacher
    disconnectTeacherStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    disconnectTeacherSuccess: (state, { payload }) => {
      state.loading = false;
      // Optionally remove the teacher from the state list
      state.connectionRequests = state.connectionRequests.filter(
        (req) => req.id !== payload.id
      );
    },
    disconnectTeacherFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // connection count

    countConnectionsSuccess: (state, { payload }) => {
      state.connectionCount = payload;
    },
  },
});

export const {
  fetchConnectionRequestsStart,
  fetchConnectionRequestsSuccess,
  fetchConnectionRequestsFailure,

  disconnectTeacherStart,
  disconnectTeacherSuccess,
  disconnectTeacherFailure,

  countConnectionsSuccess,
} = teacherManagementSlice.actions;

export default teacherManagementSlice.reducer;
