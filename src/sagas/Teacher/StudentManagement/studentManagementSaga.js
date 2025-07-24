import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchAcceptedRequestsStart,
  fetchAcceptedRequestsSuccess,
  fetchAcceptedRequestsFailure,
  fetchPendingRequestsStart,
  fetchPendingRequestsSuccess,
  fetchPendingRequestsFailure,
} from "../../../slices/Teacher/StudentManagement/studentManagementSlice";
import { setToastAlert } from "../../../slices/error/errorSlice";

import { STUDENT_MANAGEMENT_API } from "../../../utils/api";
import fetcher from "../../../services/fetcher";

// Worker Saga for fetching accepted requests
function* fetchAcceptedRequestsSaga() {
  try {
    yield put(fetchAcceptedRequestsStart());

    const response = yield call(() =>
      fetcher(STUDENT_MANAGEMENT_API.ACTIVE_CONNECTED_STUDENTS, {
        method: "GET",
      })
    );

    const requests = response.data.requests;

    yield put(fetchAcceptedRequestsSuccess(requests));
  } catch (error) {
    const message = error.message || "Something went wrong.";
    yield put(fetchAcceptedRequestsFailure(message));
    yield put(setToastAlert({ type: "error", message }));
  }
}

// Worker Saga for fetching pending requests
function* fetchPendingRequestsSaga() {
  try {
    yield put(fetchPendingRequestsStart());
    const response = yield call(() =>
      fetcher(STUDENT_MANAGEMENT_API.PENDING_STUDENTS, {
        method: "GET",
      })
    );
    const requests = response.data.requests;
    yield put(fetchPendingRequestsSuccess(requests));
  } catch (error) {
    const message = error.message || "Something went wrong.";
    yield put(fetchPendingRequestsFailure(message));
    yield put(setToastAlert({ type: "error", message }));
  }
}

// Watcher Saga
export default function* studentManagementSaga() {
  yield takeLatest("FETCH_ACCEPTED_REQUESTS", fetchAcceptedRequestsSaga);
  yield takeLatest("FETCH_PENDING_REQUESTS", fetchPendingRequestsSaga);
}
