import AuthRoutes from "./AuthRoutes";
import TeacherRoutes from "./TeacherRoutes";
import StudentRoutes from "./StudentRoutes";
import Homeroutes from "./HomeRoute";

const AppRoutes = [
  ...Homeroutes,
  ...AuthRoutes,
  ...TeacherRoutes,
  ...StudentRoutes,
];

export default AppRoutes;
