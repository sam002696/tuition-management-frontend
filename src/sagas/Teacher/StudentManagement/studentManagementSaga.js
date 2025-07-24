import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchConnectionRequestsStart,
  fetchConnectionRequestsSuccess,
  fetchConnectionRequestsFailure,
} from "../../../slices/Teacher/StudentManagement/studentManagementSlice";
import { setToastAlert } from "../../../slices/error/errorSlice";

import { STUDENT_MANAGEMENT_API } from "../../../utils/api";
import fetcher from "../../../services/fetcher";

// Worker Saga with dynamic filtering
function* fetchConnectionRequestsSaga(action) {
  try {
    yield put(fetchConnectionRequestsStart());

    const { filters = {} } = action.payload || {};

    const queryParams = new URLSearchParams(filters).toString();

    const response = yield call(() =>
      fetcher(`${STUDENT_MANAGEMENT_API.CONNECTIONS}?${queryParams}`, {
        method: "GET",
      })
    );

    const { requests, pagination } = response.data;

    yield put(fetchConnectionRequestsSuccess({ requests, pagination }));
  } catch (error) {
    const message = error.message || "Something went wrong.";
    yield put(fetchConnectionRequestsFailure(message));
    yield put(setToastAlert({ type: "error", message }));
  }
}

// Watcher Saga
export default function* studentManagementSaga() {
  yield takeLatest("FETCH_CONNECTION_REQUESTS", fetchConnectionRequestsSaga);
}
