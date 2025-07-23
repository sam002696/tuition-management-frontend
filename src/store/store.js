import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

// import toastAlertReducer from "./slices/errorSlice";
import rootSaga from "../sagas/rootSaga";
import authReducer from "../slices/Auth/authSlice";
import toastAlertReducer from "../slices/error/errorSlice";

const sagaMiddleware = createSagaMiddleware();

// Creating the Redux store
export const store = configureStore({
  reducer: {
    toastAlert: toastAlertReducer,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
