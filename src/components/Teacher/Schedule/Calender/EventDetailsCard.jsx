import React from "react";

const getStatusBadge = (status) => {
  const base =
    "px-2 py-1 rounded-full text-xs font-semibold capitalize inline-block ";
  switch (status) {
    case "accepted":
      return base + "bg-green-100 text-green-800";
    case "pending":
      return base + "bg-yellow-100 text-yellow-800";
    case "rejected":
      return base + "bg-red-100 text-red-800";
    default:
      return base + "bg-gray-100 text-gray-800";
  }
};

const EventDetailsCard = ({ selectedEvent }) => {
  if (!selectedEvent) return null;

  const student = selectedEvent.selectedStudent?.student || {};

  return (
    <div className="space-y-3 text-sm text-gray-700">
      <h2 className="text-xl font-bold text-gray-900">{selectedEvent.name}</h2>

      <p>
        <strong>Date:</strong>{" "}
        {new Date(selectedEvent.datetime).toLocaleDateString()}
      </p>

      <p>
        <strong>Time:</strong> {selectedEvent.time}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        <span className={getStatusBadge(selectedEvent.status)}>
          {selectedEvent.status}
        </span>
      </p>

      <div className="pt-2 border-t">
        <h3 className="font-semibold text-gray-900">Student Information</h3>
        <p>
          <strong>Name:</strong> {student.name || "N/A"}
        </p>
        <p>
          <strong>Phone:</strong> {student.phone || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {student.email || "N/A"}
        </p>
        <p>
          <strong>Address:</strong> {student.address || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default EventDetailsCard;
