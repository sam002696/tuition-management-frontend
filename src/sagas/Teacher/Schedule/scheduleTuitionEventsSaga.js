import { call, put, takeLatest } from "redux-saga/effects";

import { setToastAlert } from "../../../slices/error/errorSlice";

import { SCHEDULE_API } from "../../../utils/api";
import fetcher from "../../../services/fetcher";
import {
  fetchActiveConnectionsStudentsFailure,
  fetchActiveConnectionsStudentsStart,
  fetchActiveConnectionsStudentsSuccess,
  fetchSpecificStudentEventsFailure,
  fetchSpecificStudentEventsStart,
  fetchSpecificStudentEventsSuccess,
  submitTuitionEventsFailure,
  submitTuitionEventsStart,
  submitTuitionEventsSuccess,
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

// worker Saga for submitting tuition events
function* submitTuitionEventsSaga(action) {
  try {
    yield put(submitTuitionEventsStart());

    const response = yield call(() =>
      fetcher(SCHEDULE_API.CREATE_TUITION_EVENT, {
        method: "POST",
        body: action.payload,
      })
    );

    yield put(submitTuitionEventsSuccess());
    yield put(
      setToastAlert({
        type: "success",
        message: response.message || "Tuition events submitted successfully.",
      })
    );
  } catch (error) {
    const message = error.message || "Failed to submit tuition details.";
    yield put(submitTuitionEventsFailure(message));
    yield put(setToastAlert({ type: "error", message }));
  }
}

// worker saga for fetching events for specific student teacher

function* fetchSpecificStudentEventsSaga(action) {
  try {
    yield put(fetchSpecificStudentEventsStart());

    const response = yield call(() =>
      fetcher(
        SCHEDULE_API.FETCH_SPECIFIC_TEACHER_STUDENT_EVENTS(
          action.payload.student_id
        ),
        {
          method: "GET",
        }
      )
    );

    yield put(fetchSpecificStudentEventsSuccess(response.data.events));
  } catch (error) {
    const message = error.message || "Failed to fetch events.";
    yield put(fetchSpecificStudentEventsFailure(message));
    yield put(setToastAlert({ type: "error", message }));
  }
}

// Watcher Saga
export default function* scheduleTuitionEventsSaga() {
  yield takeLatest(
    "FETCH_ACTIVE_CONNECTION_STUDENTS",
    fetchActiveConnectionsStudentSaga
  );
  yield takeLatest("SUBMIT_TUITION_EVENTS", submitTuitionEventsSaga);
  yield takeLatest(
    "FETCH_SPECIFIC_STUDENT_EVENTS",
    fetchSpecificStudentEventsSaga
  );
}
