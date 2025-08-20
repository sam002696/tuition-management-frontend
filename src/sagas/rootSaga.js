import { all } from "redux-saga/effects";

import authSaga from "./Auth/authSaga";
import studentManagementSaga from "./Teacher/StudentManagement/studentManagementSaga";
import teacherManagementSaga from "./Student/TeacherManagement/teacherManagementSaga";
import connectStudentSaga from "./Teacher/ConnectStudents/connectStudentSaga";
import connectTeacherSaga from "./Student/ConnectTeachers/connectTeacherSaga";
import scheduleTuitionEventsSaga from "./Teacher/Schedule/scheduleTuitionEventsSaga";
import scheduleTuitionEventsTeacherSaga from "./Student/Schedule/scheduleTuitionEventsTeacherSaga";
import notificationSaga from "./Notification/notificationSaga";

//  Combining all sagas
export default function* rootSaga() {
  yield all([
    authSaga(),
    studentManagementSaga(),
    connectStudentSaga(),
    scheduleTuitionEventsSaga(),
    notificationSaga(),
    connectTeacherSaga(),
    teacherManagementSaga(),
    scheduleTuitionEventsTeacherSaga(),
  ]);
}
