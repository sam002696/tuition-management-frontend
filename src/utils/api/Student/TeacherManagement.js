import { API_BASE_URL } from "../base";

export const TEACHER_MANAGEMENT_API = {
  CONNECTIONS: `${API_BASE_URL}/connections`,
  COUNT_CONNECTIONS: `${API_BASE_URL}/connections/count`,
  ACTIVE_CONNECTED_TEACHERS: `${API_BASE_URL}/connection/my-accepted-requests`,
  PENDING_TEACHERS: `${API_BASE_URL}/connection/my-pending-requests`,
  DISCONNECT_TEACHER: (id) => `${API_BASE_URL}/connections/${id}/disconnect`,
};
