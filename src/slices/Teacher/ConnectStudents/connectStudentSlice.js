import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentDetails: null,
  loading: false,
  error: null,
};

const connectStudentSlice = createSlice({
  name: "findStudent",
  initialState,
  reducers: {
    findStudentStart: (state) => {
      state.loading = true;
      state.error = null;
      state.studentDetails = null;
    },
    findStudentSuccess: (state, { payload }) => {
      state.loading = false;
      state.studentDetails = payload;
    },
    findStudentFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    clearFoundStudent: (state) => {
      state.studentDetails = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  findStudentStart,
  findStudentSuccess,
  findStudentFailure,
  clearFoundStudent,
} = connectStudentSlice.actions;

export default connectStudentSlice.reducer;
