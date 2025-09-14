import AuthRoutes from "./AuthRoutes";
import TeacherRoutes from "./TeacherRoutes";
import StudentRoutes from "./StudentRoutes";
import Homeroutes from "./HomeRoute";
import SystemRoutes from "./SystemRoutes";

const AppRoutes = [
  ...Homeroutes,
  ...AuthRoutes,
  ...TeacherRoutes,
  ...StudentRoutes,
  ...SystemRoutes,
];

export default AppRoutes;
