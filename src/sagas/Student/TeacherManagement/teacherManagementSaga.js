// sagas/teacherManagementSaga.js
import {
  call,
  put,
  takeLatest,
  all,
  take,
  fork,
  cancel,
  delay,
} from "redux-saga/effects";
import {
  fetchConnectionRequestsStart,
  fetchConnectionRequestsSuccess,
  fetchConnectionRequestsFailure,
  disconnectTeacherStart,
  disconnectTeacherSuccess,
  disconnectTeacherFailure,
  countConnectionsSuccess,
} from "../../../slices/Student/TeacherManagement/teacherManagementSlice.js";
import { setToastAlert } from "../../../slices/error/errorSlice";
import { TEACHER_MANAGEMENT_API } from "../../../utils/api";
import fetcher from "../../../services/fetcher";

// Worker Saga with dynamic filtering
function* fetchConnectionRequestsSaga(action) {
  try {
    yield put(fetchConnectionRequestsStart());

    const { filters = {} } = action.payload || {};
    const queryParams = new URLSearchParams(filters).toString();

    const response = yield call(() =>
      fetcher(`${TEACHER_MANAGEMENT_API.CONNECTIONS}?${queryParams}`, {
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

// Worker saga to disconnect a teacher
function* disconnectTeacherSaga(action) {
  try {
    yield put(disconnectTeacherStart());

    const response = yield call(() =>
      fetcher(TEACHER_MANAGEMENT_API.DISCONNECT_TEACHER(action.payload.id), {
        method: "PATCH",
      })
    );

    yield put(disconnectTeacherSuccess({ id: action.payload.id }));
    yield put(
      setToastAlert({
        type: "success",
        message: response.message || "Teacher disconnected successfully.",
      })
    );
  } catch (error) {
    const message = error.message || "Failed to disconnect teacher.";
    yield put(disconnectTeacherFailure(message));
    yield put(setToastAlert({ type: "error", message }));
  }
}

// worker saga to count the connections
function* countConnectionsSaga() {
  try {
    const response = yield call(() =>
      fetcher(TEACHER_MANAGEMENT_API.COUNT_CONNECTIONS, {
        method: "GET",
      })
    );

    yield put(countConnectionsSuccess(response?.data?.connection_count));
  } catch (error) {
    const message = error?.message || "Failed to check connection status.";
    yield put(setToastAlert({ type: "error", message }));
  }
}

/**
 * Cancellable debounced search watcher.
 * - Debounces FETCH_CONNECTION_REQUESTS_SEARCH by 400ms
 * - Cancels the pending debounce if CANCEL_SEARCH is dispatched
 */
function* debouncedSearchWatcher() {
  let task;
  while (true) {
    const action = yield take([
      "FETCH_CONNECTION_REQUESTS_SEARCH",
      "CANCEL_SEARCH",
    ]);

    // Cancel any pending debounce task
    if (task) {
      yield cancel(task);
      task = null;
    }

    // Start a new debounce only for SEARCH actions
    if (action.type === "FETCH_CONNECTION_REQUESTS_SEARCH") {
      task = yield fork(function* () {
        yield delay(400);
        yield call(fetchConnectionRequestsSaga, action);
      });
    }
  }
}

// Root watcher — starting ALL watchers concurrently
export default function* teacherManagementSaga() {
  yield all([
    // Instant fetches (tab change, pagination, initial load)
    takeLatest("FETCH_CONNECTION_REQUESTS", fetchConnectionRequestsSaga),

    // Debounced + cancellable search
    debouncedSearchWatcher(),

    // Other flows
    takeLatest("DISCONNECT_TEACHER", disconnectTeacherSaga),
    takeLatest("CONNECTION_COUNT", countConnectionsSaga),
  ]);
}
