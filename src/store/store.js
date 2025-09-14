import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

// import toastAlertReducer from "./slices/errorSlice";
import rootSaga from "../sagas/rootSaga";
import authReducer from "../slices/Auth/authSlice";
import toastAlertReducer from "../slices/error/errorSlice";

import studentManagementReducer from "../slices/Teacher/StudentManagement/studentManagementSlice";
import connectStudentsReducer from "../slices/Teacher/ConnectStudents/connectStudentSlice";
import connectTeachersReducer from "../slices/Student/ConnectTeachers/connectTeacherSlice";
import scheduleTuitionEventsReducer from "../slices/Teacher/Schedule/scheduleTuitionEventsSlice";
import scheduleTuitionEventsTeacherReducer from "../slices/Student/Schedule/scheduleTuitionEventsTeacherSlice";
import notificationsReducer from "../slices/Notification/notificationSlice";
import teacherHomeReducer from "../slices/Teacher/TeacherHome/teacherHomeSlice";

const sagaMiddleware = createSagaMiddleware();

// Creating the Redux store
export const store = configureStore({
  reducer: {
    toastAlert: toastAlertReducer,
    auth: authReducer,
    studentManagement: studentManagementReducer,
    connectStudents: connectStudentsReducer,
    scheduleTuitionEvents: scheduleTuitionEventsReducer,
    notifications: notificationsReducer,
    connectTeachers: connectTeachersReducer,
    scheduleTuitionEventsTeacher: scheduleTuitionEventsTeacherReducer,
    teacherHome: teacherHomeReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
