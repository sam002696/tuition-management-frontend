import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  activeConnections: [],
  error: null,
};

const scheduleTuitionEventsSlice = createSlice({
  name: "scheduleTuitionEvents",
  initialState,
  reducers: {
    fetchActiveConnectionsStudentsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchActiveConnectionsStudentsSuccess(state, action) {
      state.loading = false;
      state.activeConnections = action.payload;
    },
    fetchActiveConnectionsStudentsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchActiveConnectionsStudentsStart,
  fetchActiveConnectionsStudentsSuccess,
  fetchActiveConnectionsStudentsFailure,
} = scheduleTuitionEventsSlice.actions;

export default scheduleTuitionEventsSlice.reducer;
