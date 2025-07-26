// sagas/Teacher/ConnectStudent/connectStudentSaga.js
import { call, put, takeLatest } from "redux-saga/effects";

import { CONNECT_STUDENT_API } from "../../../utils/api";

import {
  findStudentStart,
  findStudentSuccess,
  findStudentFailure,
  clearFoundStudent,
} from "../../../slices/Teacher/ConnectStudents/connectStudentSlice";
import fetcher from "../../../services/fetcher";
import { setToastAlert } from "../../../slices/error/errorSlice";

// Worker Saga
function* findStudentSaga(action) {
  try {
    yield put(findStudentStart());

    const response = yield call(() =>
      fetcher(CONNECT_STUDENT_API.FIND_STUDENT_DETAILS, {
        method: "POST",
        body: {
          custom_id: action.payload.custom_id,
        },
      })
    );

    yield put(findStudentSuccess(response.data.details));
    yield put(
      setToastAlert({
        type: "success",
        message: response.message || "Student found successfully.",
      })
    );
  } catch (error) {
    const message = error.message || "Failed to connect student.";
    yield put(clearFoundStudent());
    yield put(findStudentFailure(message));
    yield put(setToastAlert({ type: "error", message }));
  }
}

// Watcher Saga
export default function* watchConnectStudent() {
  yield takeLatest("FIND_STUDENT", findStudentSaga);
}
