import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  activeConnections: [],
  error: null,

  submitting: false,
  submitError: null,
  submitSuccess: false,

  specificStudentEvents: [],
  specificStudentEventsLoading: false,
  specificStudentEventsError: null,
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

    // Submitting tuition events
    submitTuitionEventsStart(state) {
      state.submitting = true;
      state.submitError = null;
      state.submitSuccess = false;
    },
    submitTuitionEventsSuccess(state) {
      state.submitting = false;
      state.submitSuccess = true;
    },
    submitTuitionEventsFailure(state, action) {
      state.submitting = false;
      state.submitError = action.payload;
    },

    fetchSpecificStudentEventsStart(state) {
      state.specificStudentEventsLoading = true;
      state.specificStudentEventsError = null;
      state.specificStudentEvents = null;
    },
    fetchSpecificStudentEventsSuccess(state, action) {
      state.specificStudentEventsLoading = false;
      state.specificStudentEvents = action.payload;
    },
    fetchSpecificStudentEventsFailure(state, action) {
      state.specificStudentEventsLoading = false;
      state.specificStudentEventsError = action.payload;
      state.specificStudentEvents = null;
    },
  },
});

export const {
  fetchActiveConnectionsStudentsStart,
  fetchActiveConnectionsStudentsSuccess,
  fetchActiveConnectionsStudentsFailure,

  submitTuitionEventsStart,
  submitTuitionEventsSuccess,
  submitTuitionEventsFailure,

  fetchSpecificStudentEventsStart,
  fetchSpecificStudentEventsSuccess,
  fetchSpecificStudentEventsFailure,
} = scheduleTuitionEventsSlice.actions;

export default scheduleTuitionEventsSlice.reducer;
