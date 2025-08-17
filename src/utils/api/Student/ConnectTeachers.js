// utils/api/connectTeachers.js
import { API_BASE_URL } from "../base";

export const CONNECT_TEACHER_API = {
  FETCH_TEACHER_REQUESTS: `${API_BASE_URL}/connection/my-pending-requests`,
  ACCEPT_REQUEST: (requestId) =>
    `${API_BASE_URL}/connection/respond/${requestId}`,
  DECLINE_REQUEST: (requestId) =>
    `${API_BASE_URL}/connection/respond/${requestId}`,
};
