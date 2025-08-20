// components/Student/ConnectTeachers/TeacherDetails/TeacherDetailsCard.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TeacherDetailsCard() {
  const dispatch = useDispatch();

  const { requests, fetchLoading, fetchError, acceptLoading, declineLoading } =
    useSelector((state) => state.connectTeachers);

  console.log("requests", requests);

  const [expandedId, setExpandedId] = useState(null);

  // Fetch teacher requests via saga when component mounts
  useEffect(() => {
    dispatch({ type: "FETCH_TEACHER_REQUESTS" });
  }, [dispatch]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleAccept = (id) => {
    dispatch({
      type: "ACCEPT_TEACHER_REQUEST",
      payload: { requestId: id, status: "accepted" },
    });
  };

  const handleDecline = (id) => {
    dispatch({ type: "DECLINE_TEACHER_REQUEST", payload: { requestId: id } });
  };

  // Loading & error states
  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-indigo-600">
        Loading requests...
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        {fetchError}
      </div>
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        No pending requests found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="space-y-6">
        {requests.map((req) => {
          const teacher = req.teacher || {};
          const tuition = req.tuition_details || {};
          const tuitionType =
            tuition.tuition_type === "monthly_based"
              ? "Monthly Based"
              : tuition.tuition_type;
          return (
            <div
              key={req.id}
              className="relative rounded-2xl overflow-hidden 
            bg-white/20 backdrop-blur-xl border border-white/30
            shadow-[0_8px_30px_rgb(0,0,0,0.12)]
            hover:shadow-[0_8px_40px_rgba(0,0,0,0.2)]
            transition-all duration-300"
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-100/40 via-transparent to-purple-100/40 pointer-events-none"></div>

              {/* Card Header */}
              <div className="relative flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-tr from-indigo-200 to-purple-200 rounded-full flex items-center justify-center text-gray-700 font-bold">
                    {teacher.name?.charAt(0)}
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg text-gray-900">
                      {teacher.name}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          tuitionType === "Monthly Based"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-purple-100 text-purple-600"
                        }`}
                      >
                        {tuitionType}
                      </span>
                      <span>{(tuition.subject_list || []).join(", ")}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Class {tuition.class_level} • {tuition.medium} •{" "}
                      {tuition.study_purpose}
                    </div>
                  </div>
                </div>

                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    expandedId === req.id
                      ? "bg-gray-200 text-gray-800 shadow-inner"
                      : "bg-indigo-600 text-white hover:opacity-90 shadow-md"
                  }`}
                  onClick={() => toggleExpand(req.id)}
                >
                  {expandedId === req.id ? "Hide Details" : "View Details"}
                </button>
              </div>

              {/* Expanded Content */}
              {expandedId === req.id && tuition && (
                <div className="relative px-6 pb-6 border-t border-white/40 bg-white/40 backdrop-blur-xl rounded-b-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
                    {/* Tuition Details */}
                    <div className="bg-white/50 backdrop-blur-lg p-4 rounded-xl shadow-md border border-white/40">
                      <h3 className="text-lg font-semibold text-indigo-600 mb-3">
                        Tuition Details
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-800">
                        <li>
                          <strong>Class Level:</strong> {tuition.class_level}
                        </li>
                        <li>
                          <strong>Subjects:</strong>{" "}
                          {(tuition.subject_list || []).join(", ")}
                        </li>
                        <li>
                          <strong>Medium:</strong> {tuition.medium}
                        </li>
                        <li>
                          <strong>Institute:</strong> {tuition.institute_name}
                        </li>
                        <li>
                          <strong>Study Purpose:</strong>{" "}
                          {tuition.study_purpose}
                        </li>
                      </ul>
                    </div>

                    {/* Schedule & Payment */}
                    <div className="bg-white/50 backdrop-blur-lg p-4 rounded-xl shadow-md border border-white/40">
                      <h3 className="text-lg font-semibold text-indigo-600 mb-3">
                        Schedule & Payment
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-800">
                        <li>
                          <strong>Days/Week:</strong>{" "}
                          {tuition.tuition_days_per_week}
                        </li>
                        <li>
                          <strong>Hours/Day:</strong> {tuition.hours_per_day}
                        </li>
                        <li>
                          <strong>Days:</strong>{" "}
                          {(tuition.days_name || []).join(", ")}
                        </li>
                        <li>
                          <strong>Monthly Salary:</strong>{" "}
                          {tuition.salary_per_month}
                        </li>
                        <li>
                          <strong>Starting Month:</strong>{" "}
                          {tuition.starting_month}
                        </li>
                      </ul>
                    </div>

                    {/* Location */}
                    <div className="bg-white/50 backdrop-blur-lg p-4 rounded-xl shadow-md border border-white/40">
                      <h3 className="text-lg font-semibold text-indigo-600 mb-3">
                        Location
                      </h3>
                      <p className="text-sm text-gray-800">
                        {tuition.address_line}, {tuition.thana},{" "}
                        {tuition.district}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      disabled={acceptLoading}
                      onClick={() => handleAccept(req.id)}
                      className={`px-4 py-2 text-sm rounded-md shadow-md transition ${
                        acceptLoading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-gray-900 to-black text-white hover:opacity-90"
                      }`}
                    >
                      ✓ {acceptLoading ? "Accepting..." : "Accept"}
                    </button>
                    <button
                      disabled={declineLoading}
                      onClick={() => handleDecline(req.id)}
                      className={`px-4 py-2 text-sm rounded-md shadow-md transition ${
                        declineLoading
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-gradient-to-r from-gray-200 to-white text-black hover:opacity-90"
                      }`}
                    >
                      ✕ {declineLoading ? "Declining..." : "Decline"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
