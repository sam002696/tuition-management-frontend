import React from "react";
import { useDispatch, useSelector } from "react-redux";

const getStatusBadge = (status) => {
  const base =
    "px-2 py-1 rounded-full text-xs font-semibold capitalize inline-block";
  switch (status) {
    case "accepted":
      return base + " bg-green-100 text-green-700";
    case "pending":
      return base + " bg-yellow-100 text-yellow-700";
    case "rejected":
      return base + " bg-red-100 text-red-700";
    case "scheduled":
      return base + " bg-gray-900 text-white";
    default:
      return base + " bg-gray-100 text-gray-800";
  }
};

const EventDetailsCard = ({ selectedEvent }) => {
  const dispatch = useDispatch();

  const {
    specificTeacherEvents,
    specificTeacherEventsLoading,
    specificTeacherEventsError,
    specificTeacherEventAcceptLoading,
    specificTeacherEventDeclineLoading,
  } = useSelector((state) => state.scheduleTuitionEventsTeacher);

  console.log(
    specificTeacherEvents,
    specificTeacherEventsLoading,
    specificTeacherEventsError
  );

  console.log("selectedEvent", selectedEvent);
  if (!selectedEvent) return null;

  const teacher = selectedEvent.selectedTeacher?.teacher || {};
  const tuition = selectedEvent.selectedTeacher?.tuition_details || {};

  const handleAccept = (id) => {
    dispatch({
      type: "SPECIFIC_EVENT_ACCEPT_REQUEST",
      payload: { requestId: id, status: "accepted" },
    });
  };

  const handleDecline = (id) => {
    dispatch({
      type: "SPECIFIC_EVENT_DECLINE_REQUEST",
      payload: { requestId: id },
    });
  };

  return (
    <div className="max-w-full rounded-xl bg-white p-6 shadow-md ring-1 ring-gray-200 space-y-4 text-sm text-gray-700">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {selectedEvent.name}
          </h2>
          <p className="text-sm text-gray-500">Tuition Session Details</p>
        </div>
        <span className={getStatusBadge(selectedEvent.status)}>
          {selectedEvent.status}
        </span>
      </div>

      <div className="flex items-center gap-4 pt-2 border-t border-gray-200">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-800 font-semibold">
          {teacher.name
            ?.split(" ")
            .filter((word) => word.length > 0)
            .map((word) => word[0])
            .join("")
            .toUpperCase() || "NA"}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{teacher.name}</p>
          <p className="text-xs text-gray-500">
            {tuition.class_level || "N/A"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-2 pt-2 border-t border-gray-200 text-sm">
        <p>
          <strong className="block text-gray-500">Date</strong>
          {new Date(selectedEvent.datetime).toLocaleDateString()}
        </p>
        <p>
          <strong className="block text-gray-500">Time</strong>
          {selectedEvent.time}
        </p>
        <p>
          <strong className="block text-gray-500">Duration</strong>1 hour
        </p>
        <p>
          <strong className="block text-gray-500">Fee</strong>$
          {selectedEvent.fee || 0}
        </p>
        <p className="col-span-2">
          <strong className="block text-gray-500">Subject</strong>
          {selectedEvent.subject || "N/A"}
        </p>
        <p className="col-span-2">
          <strong className="block text-gray-500">Notes</strong>
          {selectedEvent.notes ||
            "No additional notes provided for this session."}
        </p>
      </div>

      {selectedEvent.status === "pending" && (
        // Action Buttons
        <div className="flex justify-end gap-3 mt-6">
          <button
            disabled={specificTeacherEventAcceptLoading}
            onClick={() => handleAccept(selectedEvent.id)}
            className={`px-4 py-2 text-sm rounded-md shadow-md transition ${
              specificTeacherEventAcceptLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-gray-900 to-black text-white hover:opacity-90"
            }`}
          >
            ✓ {specificTeacherEventAcceptLoading ? "Accepting..." : "Accept"}
          </button>
          <button
            disabled={specificTeacherEventDeclineLoading}
            onClick={() => handleDecline(selectedEvent.id)}
            className={`px-4 py-2 text-sm rounded-md shadow-md transition ${
              specificTeacherEventDeclineLoading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-gray-200 to-white text-black hover:opacity-90"
            }`}
          >
            ✕ {specificTeacherEventDeclineLoading ? "Declining..." : "Decline"}
          </button>
        </div>
      )}
    </div>
  );
};

export default EventDetailsCard;
