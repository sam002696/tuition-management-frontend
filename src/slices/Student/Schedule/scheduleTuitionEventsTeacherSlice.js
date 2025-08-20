import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  activeConnections: [],
  pagination: {},
  error: null,

  submitting: false,
  submitError: null,
  submitSuccess: false,

  specificTeacherEvents: [],
  specificTeacherEventsLoading: false,
  specificTeacherEventsError: null,
};

const scheduleTuitionEventsTeacherSlice = createSlice({
  name: "scheduleTuitionEventsTeacher",
  initialState,
  reducers: {
    fetchActiveConnectionsTeachersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchActiveConnectionsTeachersSuccess(state, action) {
      state.loading = false;
      state.activeConnections = action.payload?.requests;
      state.pagination = action.payload?.pagination;
    },
    fetchActiveConnectionsTeachersFailure(state, action) {
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

    fetchSpecificTeacherEventsStart(state) {
      state.specificTeacherEvents = [];
      state.specificTeacherEventsLoading = true;
      state.specificTeacherEventsError = null;
    },
    fetchSpecificTeacherEventsSuccess(state, action) {
      state.specificTeacherEventsLoading = false;
      state.specificTeacherEvents = action.payload;
    },
    fetchSpecificTeacherEventsFailure(state, action) {
      state.specificTeacherEvents = [];
      state.specificTeacherEventsLoading = false;
      state.specificTeacherEventsError = action.payload;
    },
  },
});

export const {
  fetchActiveConnectionsTeachersStart,
  fetchActiveConnectionsTeachersSuccess,
  fetchActiveConnectionsTeachersFailure,

  submitTuitionEventsStart,
  submitTuitionEventsSuccess,
  submitTuitionEventsFailure,

  fetchSpecificTeacherEventsStart,
  fetchSpecificTeacherEventsSuccess,
  fetchSpecificTeacherEventsFailure,
} = scheduleTuitionEventsTeacherSlice.actions;

export default scheduleTuitionEventsTeacherSlice.reducer;
