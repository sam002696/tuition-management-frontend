import { API_BASE_URL } from "../base";

export const SCHEDULE_TEACHER_API = {
  ACTIVE_CONNECTED_TEACHERS: `${API_BASE_URL}/connection/my-accepted-requests`,
  CREATE_TUITION_EVENT: `${API_BASE_URL}/tuition-events`,
  FETCH_SPECIFIC_TEACHER_STUDENT_EVENTS: (teacherId) =>
    `${API_BASE_URL}/tuition-events/teacher?teacher_id=${teacherId}`,
  EVENT_ACCEPT_REQUEST: (requestId) =>
    `${API_BASE_URL}/tuition-events/respond/${requestId}`,
  EVENT_DECLINE_REQUEST: (requestId) =>
    `${API_BASE_URL}/tuition-events/respond/${requestId}`,
};
