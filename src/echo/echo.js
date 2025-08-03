// src/echo.js
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { AuthUser } from "../helpers/AuthUser";
import { UrlBuilder } from "../helpers/UrlBuilder";

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: "pusher",
  key: "74ea762aea46c2f81ccf",
  cluster: "ap2",
  forceTLS: true,
  encrypted: true,
  authEndpoint: `${UrlBuilder.tuitionManagementBroadcastingApi()}`,
  auth: {
    headers: {
      Authorization: `Bearer ${AuthUser.getToken()}`,
    },
  },
});

export default echo;
