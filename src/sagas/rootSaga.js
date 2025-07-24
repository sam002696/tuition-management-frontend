import { all } from "redux-saga/effects";

import authSaga from "./Auth/authSaga";
import studentManagementSaga from "./Teacher/StudentManagement/StudentManagementSaga";

//  Combining all sagas
export default function* rootSaga() {
  yield all([authSaga(), studentManagementSaga()]);
}
