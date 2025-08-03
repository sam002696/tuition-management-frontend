// components/notifications/NotificationListener.jsx
import { useEffect } from "react";

import { AuthUser } from "../helpers/AuthUser";
import echo from "./echo";
// import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setToastAlert } from "../slices/error/errorSlice";
// import { toast } from "react-toastify"; // or your own component

const NotificationListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = AuthUser.getUser();
    if (!user?.id) return;

    const channel = echo.private(`App.Models.User.${user.id}`);

    channel.notification((notification) => {
      console.log("New Notification:", notification);

      // dispatching toast alert
      dispatch(setToastAlert({ type: "info", message: notification?.body }));
    });

    return () => {
      echo.leave(`App.Models.User.${user.id}`);
    };
  }, [dispatch]);

  return null;
};

export default NotificationListener;
