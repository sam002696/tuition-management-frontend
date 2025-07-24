import { API_BASE_URL } from "../base";

export const STUDENT_MANAGEMENT_API = {
  CONNECTIONS: `${API_BASE_URL}/connections`,
  ACTIVE_CONNECTED_STUDENTS: `${API_BASE_URL}/connection/my-accepted-requests`,
  PENDING_STUDENTS: `${API_BASE_URL}/connection/my-pending-requests`,
};
