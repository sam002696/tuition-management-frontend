// sagas/Teacher/Schedule/scheduleTuitionEventsSaga.js
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

import { setToastAlert } from "../../../slices/error/errorSlice";
import { SCHEDULE_TEACHER_API } from "../../../utils/api";
import fetcher from "../../../services/fetcher";

import {
  fetchActiveConnectionsTeachersFailure,
  fetchActiveConnectionsTeachersStart,
  fetchActiveConnectionsTeachersSuccess,
  fetchSpecificTeacherEventsFailure,
  fetchSpecificTeacherEventsStart,
  fetchSpecificTeacherEventsSuccess,
  submitTuitionEventsFailure,
  submitTuitionEventsStart,
  submitTuitionEventsSuccess,
  specificTeacherEventAcceptRequestStart,
  specificTeacherEventAcceptRequestSuccess,
  specificTeacherEventAcceptRequestFailure,
  specificTeacherEventDeclineRequestStart,
  specificTeacherEventDeclineRequestSuccess,
  specificTeacherEventDeclineRequestFailure,
} from "../../../slices/Student/Schedule/scheduleTuitionEventsTeacherSlice";
import { AuthUser } from "../../../helpers/AuthUser";

// Active connections (supports per_page, page, search)
function* fetchActiveConnectionsTeacherSaga(action) {
  try {
    yield put(fetchActiveConnectionsTeachersStart());

    const { filters = {} } = action.payload || {};
    const per_page = filters.per_page ?? 5;
    const page = filters.page ?? 1;
    const search = (filters.search ?? "").toString().trim();

    const params = new URLSearchParams({
      per_page: String(per_page),
      page: String(page),
    });
    if (search) params.set("search", search);

    const url = `${
      SCHEDULE_TEACHER_API.ACTIVE_CONNECTED_TEACHERS
    }?${params.toString()}`;

    const response = yield call(() => fetcher(url, { method: "GET" }));

    const { requests, pagination } = response.data;

    yield put(fetchActiveConnectionsTeachersSuccess({ requests, pagination }));
  } catch (error) {
    const message = error?.message || "Failed to fetch active teachers.";
    yield put(fetchActiveConnectionsTeachersFailure(message));
    yield put(setToastAlert({ type: "error", message }));
  }
}

/**
 * Debounced (and cancellable) search watcher for active teachers.
 * - Debounces FETCH_ACTIVE_CONNECTION_TEACHERS_SEARCH by 400ms
 * - Cancels pending debounce when CANCEL_ACTIVE_TEACHERS_SEARCH arrives
 */
function* debouncedActiveTeachersSearchWatcher() {
  let task;
  while (true) {
    const action = yield take([
      "FETCH_ACTIVE_CONNECTION_TEACHERS_SEARCH",
      "CANCEL_ACTIVE_TEACHERS_SEARCH",
    ]);

    // cancel any pending debounce task
    if (task) {
      yield cancel(task);
      task = null;
    }

    if (action.type === "FETCH_ACTIVE_CONNECTION_TEACHERS_SEARCH") {
      task = yield fork(function* () {
        yield delay(400);
        yield call(fetchActiveConnectionsTeacherSaga, action);
      });
    }
  }
}

// ---- Submit tuition events
function* submitTuitionEventsSaga(action) {
  try {
    yield put(submitTuitionEventsStart());

    const { setIsModalOpen, ...submitPayload } = action.payload;

    const response = yield call(() =>
      fetcher(SCHEDULE_TEACHER_API.CREATE_TUITION_EVENT, {
        method: "POST",
        body: submitPayload,
      })
    );

    yield put(submitTuitionEventsSuccess());
    yield put(
      setToastAlert({
        type: "success",
        message: response?.message || "Tuition events submitted successfully.",
      })
    );

    // refresh events list for that teacher
    yield put({
      type: "FETCH_SPECIFIC_TEACHER_EVENTS",
      payload: { teacher_id: action.payload.teacher_id },
    });

    if (typeof setIsModalOpen === "function") {
      yield call(setIsModalOpen, false);
    }
  } catch (error) {
    const message = error?.message || "Failed to submit tuition details.";
    yield put(submitTuitionEventsFailure(message));
    yield put(setToastAlert({ type: "error", message }));
  }
}

// ---- Fetch events for a specific teacher
function* fetchSpecificTeacherEventsSaga(action) {
  try {
    yield put(fetchSpecificTeacherEventsStart());

    const response = yield call(() =>
      fetcher(
        SCHEDULE_TEACHER_API.FETCH_SPECIFIC_TEACHER_STUDENT_EVENTS(
          action.payload.teacher_id
        ),
        { method: "GET" }
      )
    );

    yield put(fetchSpecificTeacherEventsSuccess(response.data.events));
  } catch (error) {
    const message = error?.message || "Failed to fetch events.";
    yield put(fetchSpecificTeacherEventsFailure(message));
    yield put(setToastAlert({ type: "error", message }));
  }
}

// Worker Saga: accept teacher request
function* specificTeacherEventAcceptRequestSaga(action) {
  try {
    const { requestId, status } = action.payload;
    yield put(specificTeacherEventAcceptRequestStart());

    const response = yield call(() =>
      fetcher(SCHEDULE_TEACHER_API.EVENT_ACCEPT_REQUEST(requestId), {
        method: "POST",
        body: { status: status },
      })
    );

    yield put(specificTeacherEventAcceptRequestSuccess(requestId));
    yield put(
      setToastAlert({
        type: "success",
        message: response?.message || "Request accepted successfully.",
      })
    );
  } catch (error) {
    const message = error?.message || "Failed to accept request.";
    yield put(specificTeacherEventAcceptRequestFailure(message));
    yield put(setToastAlert({ type: "error", message }));
  }
}

// Worker Saga: decline teacher request
function* specificTeacherEventDeclineRequestSaga(action) {
  try {
    const { requestId } = action.payload;
    yield put(specificTeacherEventDeclineRequestStart());

    const response = yield call(() =>
      fetcher(SCHEDULE_TEACHER_API.EVENT_DECLINE_REQUEST(requestId), {
        method: "POST",
      })
    );

    yield put(specificTeacherEventDeclineRequestSuccess(requestId));
    yield put(
      setToastAlert({
        type: "success",
        message: response?.message || "Request declined successfully.",
      })
    );
  } catch (error) {
    const message = error?.message || "Failed to decline request.";
    yield put(specificTeacherEventDeclineRequestFailure(message));
    yield put(setToastAlert({ type: "error", message }));
  }
}

//  Root saga: running all watchers concurrently
export default function* scheduleTuitionEventsSaga() {
  yield all([
    // Instant loads (initial, pagination)
    takeLatest(
      "FETCH_ACTIVE_CONNECTION_TEACHERS",
      fetchActiveConnectionsTeacherSaga
    ),

    // Debounced search (cancellable)
    debouncedActiveTeachersSearchWatcher(),

    // Other flows
    takeLatest("SUBMIT_TUITION_EVENTS", submitTuitionEventsSaga),
    takeLatest("FETCH_SPECIFIC_TEACHER_EVENTS", fetchSpecificTeacherEventsSaga),

    // Event Accept Decline Flow
    takeLatest(
      "SPECIFIC_EVENT_ACCEPT_REQUEST",
      specificTeacherEventAcceptRequestSaga
    ),
    takeLatest(
      "SPECIFIC_EVENT_DECLINE_REQUEST",
      specificTeacherEventDeclineRequestSaga
    ),
  ]);
}
