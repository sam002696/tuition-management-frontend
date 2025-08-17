// sagas/Student/ConnectTeachers/connectTeacherSaga.js
import { call, put, takeLatest } from "redux-saga/effects";
import { CONNECT_TEACHER_API } from "../../../utils/api/Student/ConnectTeachers";
import fetcher from "../../../services/fetcher";
import { setToastAlert } from "../../../slices/error/errorSlice";

import {
  fetchRequestsStart,
  fetchRequestsSuccess,
  fetchRequestsFailure,
  acceptRequestStart,
  acceptRequestSuccess,
  acceptRequestFailure,
  declineRequestStart,
  declineRequestSuccess,
  declineRequestFailure,
  clearRequests,
  //   clearError,
} from "../../../slices/Student/ConnectTeachers/connectTeacherSlice";

// Worker Saga: fetch teacher connection requests
function* fetchRequestsSaga() {
  try {
    yield put(fetchRequestsStart());

    const response = yield call(() =>
      fetcher(CONNECT_TEACHER_API.FETCH_TEACHER_REQUESTS, {
        method: "GET",
      })
    );

    yield put(fetchRequestsSuccess(response?.data?.requests || []));
    yield put(
      setToastAlert({
        type: "success",
        message: response?.message || "Requests fetched successfully.",
      })
    );
  } catch (error) {
    const message = error?.message || "Failed to fetch teacher requests.";
    yield put(fetchRequestsFailure(message));
    yield put(clearRequests());
    yield put(setToastAlert({ type: "error", message }));
  }
}

// Worker Saga: accept teacher request
function* acceptRequestSaga(action) {
  try {
    const { requestId } = action.payload;
    yield put(acceptRequestStart());

    const response = yield call(() =>
      fetcher(CONNECT_TEACHER_API.ACCEPT_REQUEST(requestId), {
        method: "POST",
      })
    );

    yield put(acceptRequestSuccess(requestId));
    yield put(
      setToastAlert({
        type: "success",
        message: response?.message || "Request accepted successfully.",
      })
    );
  } catch (error) {
    const message = error?.message || "Failed to accept request.";
    yield put(acceptRequestFailure(message));
    yield put(setToastAlert({ type: "error", message }));
  }
}

// Worker Saga: decline teacher request
function* declineRequestSaga(action) {
  try {
    const { requestId } = action.payload;
    yield put(declineRequestStart());

    const response = yield call(() =>
      fetcher(CONNECT_TEACHER_API.DECLINE_REQUEST(requestId), {
        method: "POST",
      })
    );

    yield put(declineRequestSuccess(requestId));
    yield put(
      setToastAlert({
        type: "success",
        message: response?.message || "Request declined successfully.",
      })
    );
  } catch (error) {
    const message = error?.message || "Failed to decline request.";
    yield put(declineRequestFailure(message));
    yield put(setToastAlert({ type: "error", message }));
  }
}

// Watcher Saga
export default function* watchConnectTeachers() {
  yield takeLatest("FETCH_TEACHER_REQUESTS", fetchRequestsSaga);
  yield takeLatest("ACCEPT_TEACHER_REQUEST", acceptRequestSaga);
  yield takeLatest("DECLINE_TEACHER_REQUEST", declineRequestSaga);
}
