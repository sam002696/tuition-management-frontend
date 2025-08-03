import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Suspense, useEffect } from "react";
import Loader from "./components/common/Loader";
import AppRoutes from "./routes";
import { AuthUser } from "./helpers/AuthUser";
import echo from "./echo/echo";

const renderRoutes = (routes) =>
  routes.map(({ path, element, children }, index) => (
    <Route key={index} path={path} element={element}>
      {children && renderRoutes(children)}
    </Route>
  ));

const App = () => {
  useEffect(() => {
    const userId = AuthUser.getUser().id;

    echo.private(`App.Models.User.${userId}`).notification((notification) => {
      console.log(" New Notification:", notification);
    });

    return () => {
      echo.leave(`App.Models.User.${userId}`);
    };
  }, []);

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>{renderRoutes(AppRoutes)}</Routes>
      </Suspense>
    </Router>
  );
};

export default App;
