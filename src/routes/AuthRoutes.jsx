import { lazy } from "react";
import { Navigate, Route } from "react-router";
// import PublicOnlyRoute from "./PublicOnlyRoute";

const Login = lazy(() => import("../pages/Auth/Login/Login"));
// const Register = lazy(() => import("../pages/Auth/Register/Register"));

// Defining routes
const Authroutes = [
  // { path: "/", element: <Navigate to="/login" replace /> },
  {
    path: "/login",
    element: <Login />,
  },
  // {
  //   path: "/register",
  //   element: (
  //     <PublicOnlyRoute>
  //       <Register />
  //     </PublicOnlyRoute>
  //   ),
  // },
  //   {
  //     path: "*",
  //     element: <NotFound />,
  //   },
];

export default Authroutes;
