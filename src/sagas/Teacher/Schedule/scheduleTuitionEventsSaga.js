import { call, put, takeLatest } from "redux-saga/effects";

import { setToastAlert } from "../../../slices/error/errorSlice";

import { SCHEDULE_API } from "../../../utils/api";
import fetcher from "../../../services/fetcher";
import {
  fetchActiveConnectionsStudentsFailure,
  fetchActiveConnectionsStudentsStart,
  fetchActiveConnectionsStudentsSuccess,
} from "../../../slices/Teacher/Schedule/scheduleTuitionEventsSlice";

// Worker Saga with dynamic filtering
function* fetchActiveConnectionsStudentSaga() {
  try {
    yield put(fetchActiveConnectionsStudentsStart());

    const response = yield call(() =>
      fetcher(SCHEDULE_API.ACTIVE_CONNECTED_STUDENTS, {
        method: "GET",
      })
    );

    yield put(fetchActiveConnectionsStudentsSuccess(response.data.requests));
  } catch (error) {
    const message = error.message || "Failed to disconnect student.";
    yield put(fetchActiveConnectionsStudentsFailure(message));
    yield put(setToastAlert({ type: "error", message }));
  }
}

// Watcher Saga
export default function* scheduleTuitionEventsSaga() {
  yield takeLatest(
    "FETCH_ACTIVE_CONNECTION_STUDENTS",
    fetchActiveConnectionsStudentSaga
  );
}
