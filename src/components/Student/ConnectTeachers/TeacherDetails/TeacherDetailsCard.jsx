// import {
//   EnvelopeIcon,
//   PhoneIcon,
//   IdentificationIcon,
// } from "@heroicons/react/20/solid";
// import { useDispatch, useSelector } from "react-redux";
// import { setToastAlert } from "../../../../slices/error/errorSlice";
// import { useEffect } from "react";
// import { getConnectionButtonState } from "../../../../utils/connectionStatusUtils";
// import TeacherDetailsCardSkeleton from "./TeacherDetailsCardSkeleton";

// export default function TeacherDetailsCard({ studentDetails }) {
//   const { tuitionDetails, connectionStatus, loading, connectionStatusLoading } =
//     useSelector((state) => state.connectStudents);

//   const {
//     label,
//     disabled,
//     className: buttonClass,
//     icon: Icon,
//   } = getConnectionButtonState(connectionStatus);
//   const dispatch = useDispatch();

//   // check connection status with a student regarding teacher

//   useEffect(() => {
//     if (studentDetails?.id) {
//       dispatch({
//         type: "CHECK_CONNECTION_STATUS",
//         payload: {
//           student_id: studentDetails.id,
//         },
//       });
//     }
//   }, [dispatch, studentDetails?.id]);

//   const handleConnect = () => {
//     // Dispatch an action to connect with the student
//     if (!tuitionDetails) {
//       dispatch(
//         setToastAlert({
//           type: "error",
//           message: "Please submit tuition details first.",
//         })
//       );
//       return;
//     }
//     dispatch({
//       type: "SEND_CONNECTION_REQUEST",
//       payload: {
//         student_id: studentDetails?.id,
//         custom_id: studentDetails?.custom_id,
//         tuition_details_id: tuitionDetails?.id,
//       },
//     });
//   };

//   return (
//     <>
//       {loading ? (
//         <>
//           <TeacherDetailsCardSkeleton />
//         </>
//       ) : (
//         <>
//           <div className="lg:col-start-3 lg:row-end-1 max-w-xs mr-auto mt-5">
//             <h2 className="sr-only">Student Summary</h2>
//             <div className="rounded-lg bg-white shadow-xs  outline-1 outline-gray-900/5">
//               <dl className="flex flex-wrap">
//                 <div className="flex-auto pt-6 pl-6">
//                   <dt className="text-sm/6 font-semibold text-gray-900">
//                     Full Name
//                   </dt>
//                   <dd className="mt-1 text-base font-semibold text-indigo-500">
//                     {studentDetails?.name}
//                   </dd>
//                 </div>
//                 <div className="flex-none self-end px-6 pt-4">
//                   <dt className="sr-only">Role</dt>
//                   <dd className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
//                     Student
//                   </dd>
//                 </div>

//                 <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
//                   <dt className="flex-none">
//                     <EnvelopeIcon
//                       className="h-6 w-5 text-red-400"
//                       aria-hidden="true"
//                     />
//                   </dt>
//                   <dd className="text-sm/6 font-medium text-gray-900">
//                     {studentDetails?.email}
//                   </dd>
//                 </div>

//                 <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
//                   <dt className="flex-none">
//                     <PhoneIcon
//                       className="h-6 w-5 text-green-400"
//                       aria-hidden="true"
//                     />
//                   </dt>
//                   <dd className="text-sm/6 text-gray-500">
//                     {studentDetails?.phone}
//                   </dd>
//                 </div>

//                 <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
//                   <dt className="flex-none">
//                     <IdentificationIcon
//                       className="h-6 w-5 text-blue-400"
//                       aria-hidden="true"
//                     />
//                   </dt>
//                   <dd className="text-sm/6 text-gray-500">
//                     {studentDetails?.custom_id}
//                   </dd>
//                 </div>
//               </dl>

//               <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
//                 <button
//                   type="button"
//                   onClick={handleConnect}
//                   disabled={disabled || loading || connectionStatusLoading}
//                   className={`inline-flex items-center gap-x-1.5 rounded-md px-2.5 py-1.5 text-sm font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 ${buttonClass}`}
//                 >
//                   <Icon
//                     aria-hidden="true"
//                     className={`-ml-0.5 size-5 ${
//                       connectionStatusLoading && "hidden"
//                     }`}
//                   />
//                   {loading
//                     ? "Sending request..."
//                     : connectionStatusLoading
//                     ? "Loading..."
//                     : label}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// }

// import React, { useState } from "react";

// const requestsData = [
//   {
//     id: 1,
//     name: "Dr. Mohammad Rahman",
//     tuitionType: "Monthly Based",
//     tuitionTypeColor: "bg-blue-100 text-blue-600",
//     subjects: ["Physics", "Mathematics"],
//     level: "HSC Level",
//     medium: "English Version",
//     summary: "4 days/week",
//     details: {
//       classLevel: "HSC (Class 11-12)",
//       subjects: "Physics, Mathematics",
//       medium: "English Version",
//       institute: "Dhaka College",
//       studyPurpose: "Board Exam Preparation",
//       location: "House 45, Road 12, Dhanmondi, Dhaka-1205",
//       schedule: {
//         daysPerWeek: "4 days",
//         hoursPerDay: "2 hours",
//         daysName: "Sun, Tue, Thu, Sat",
//         monthlySalary: "18,000",
//         startingMonth: "February 2024",
//       },
//     },
//   },
//   {
//     id: 2,
//     name: "Ms. Fatina Khatun",
//     tuitionType: "Course Based",
//     tuitionTypeColor: "bg-purple-100 text-purple-600",
//     subjects: ["Chemistry"],
//     level: "HSC Level",
//     medium: "Bangla Version",
//     summary: "3 months duration",
//     details: {
//       classLevel: "HSC (Class 11-12)",
//       subjects: "Physics, Mathematics",
//       medium: "English Version",
//       institute: "Dhaka College",
//       studyPurpose: "Board Exam Preparation",
//       location: "House 45, Road 12, Dhanmondi, Dhaka-1205",
//       schedule: {
//         daysPerWeek: "4 days",
//         hoursPerDay: "2 hours",
//         daysName: "Sun, Tue, Thu, Sat",
//         monthlySalary: "18,000",
//         startingMonth: "February 2024",
//       },
//     },
//   },
//   {
//     id: 3,
//     name: "Mr. Karim Ahmed",
//     tuitionType: "Monthly Based",
//     tuitionTypeColor: "bg-blue-100 text-blue-600",
//     subjects: ["English", "ICT"],
//     level: "HSC Level",
//     medium: "English Version",
//     summary: "5 days/week",
//     details: {
//       classLevel: "HSC (Class 11-12)",
//       subjects: "Physics, Mathematics",
//       medium: "English Version",
//       institute: "Dhaka College",
//       studyPurpose: "Board Exam Preparation",
//       location: "House 45, Road 12, Dhanmondi, Dhaka-1205",
//       schedule: {
//         daysPerWeek: "4 days",
//         hoursPerDay: "2 hours",
//         daysName: "Sun, Tue, Thu, Sat",
//         monthlySalary: "18,000",
//         startingMonth: "February 2024",
//       },
//     },
//   },
// ];

// export default function TeacherDetailsCard() {
//   const [expandedId, setExpandedId] = useState(null);

//   const toggleExpand = (id) => {
//     setExpandedId(expandedId === id ? null : id);
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <div className="space-y-4">
//         {requestsData.map((req) => (
//           <div
//             key={req.id}
//             className="bg-white shadow rounded-lg border border-gray-200"
//           >
//             {/* Card Header */}
//             <div className="flex items-center justify-between p-4">
//               <div className="flex items-center gap-4">
//                 <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
//                 <div>
//                   <h2 className="font-semibold">{req.name}</h2>
//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <span
//                       className={`px-2 py-0.5 rounded-full text-xs font-medium ${req.tuitionTypeColor}`}
//                     >
//                       {req.tuitionType}
//                     </span>
//                     <span>{req.subjects.join(", ")}</span>
//                   </div>
//                   <div className="text-sm text-gray-500">
//                     {req.level} • {req.medium} • {req.summary}
//                   </div>
//                 </div>
//               </div>
//               <button
//                 className={`px-4 py-2 rounded-md text-sm font-medium ${
//                   expandedId === req.id
//                     ? "bg-gray-200 text-gray-800"
//                     : "bg-indigo-600 text-white hover:bg-indigo-500"
//                 }`}
//                 onClick={() => toggleExpand(req.id)}
//               >
//                 {expandedId === req.id ? "Hide Details" : "View Details"}
//               </button>
//             </div>

//             {/* Expanded Content */}
//             {/* Expanded Content */}
//             {expandedId === req.id && req.details && (
//               <div className="px-6 pb-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl shadow-inner">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
//                   {/* Tuition Details */}
//                   <div className="bg-white p-4 rounded-xl shadow-sm border">
//                     <h3 className="text-lg font-semibold text-indigo-600 mb-3">
//                       Tuition Details
//                     </h3>
//                     <ul className="space-y-2 text-sm text-gray-700">
//                       <li>
//                         <strong>Class Level:</strong> {req.details.classLevel}
//                       </li>
//                       <li>
//                         <strong>Subjects:</strong> {req.details.subjects}
//                       </li>
//                       <li>
//                         <strong>Medium:</strong> {req.details.medium}
//                       </li>
//                       <li>
//                         <strong>Institute:</strong> {req.details.institute}
//                       </li>
//                       <li>
//                         <strong>Study Purpose:</strong>{" "}
//                         {req.details.studyPurpose}
//                       </li>
//                     </ul>
//                   </div>

//                   {/* Schedule & Payment */}
//                   <div className="bg-white p-4 rounded-xl shadow-sm border">
//                     <h3 className="text-lg font-semibold text-indigo-600 mb-3">
//                       Schedule & Payment
//                     </h3>
//                     <ul className="space-y-2 text-sm text-gray-700">
//                       <li>
//                         <strong>Days/Week:</strong>{" "}
//                         {req.details.schedule.daysPerWeek}
//                       </li>
//                       <li>
//                         <strong>Hours/Day:</strong>{" "}
//                         {req.details.schedule.hoursPerDay}
//                       </li>
//                       <li>
//                         <strong>Days:</strong> {req.details.schedule.daysName}
//                       </li>
//                       <li>
//                         <strong>Monthly Salary:</strong>{" "}
//                         {req.details.schedule.monthlySalary}
//                       </li>
//                       <li>
//                         <strong>Starting Month:</strong>{" "}
//                         {req.details.schedule.startingMonth}
//                       </li>
//                     </ul>
//                   </div>

//                   {/* Location */}
//                   <div className="bg-white p-4 rounded-xl shadow-sm border">
//                     <h3 className="text-lg font-semibold text-indigo-600 mb-3">
//                       Location
//                     </h3>
//                     <p className="text-sm text-gray-700">
//                       {req.details.location}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex flex-col sm:flex-row gap-4 mt-4">
//                   <button className="flex-1 bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-500 transition">
//                     ✓ Accept Request
//                   </button>
//                   <button className="flex-1 bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-500 transition">
//                     ✕ Decline Request
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";

const requestsData = [
  {
    id: 1,
    name: "Dr. Mohammad Rahman",
    tuitionType: "Monthly Based",
    tuitionTypeColor: "bg-blue-100 text-blue-600",
    subjects: ["Physics", "Mathematics"],
    level: "HSC Level",
    medium: "English Version",
    summary: "4 days/week",
    details: {
      classLevel: "HSC (Class 11-12)",
      subjects: "Physics, Mathematics",
      medium: "English Version",
      institute: "Dhaka College",
      studyPurpose: "Board Exam Preparation",
      location: "House 45, Road 12, Dhanmondi, Dhaka-1205",
      schedule: {
        daysPerWeek: "4 days",
        hoursPerDay: "2 hours",
        daysName: "Sun, Tue, Thu, Sat",
        monthlySalary: "18,000",
        startingMonth: "February 2024",
      },
    },
  },
  {
    id: 2,
    name: "Ms. Fatina Khatun",
    tuitionType: "Course Based",
    tuitionTypeColor: "bg-purple-100 text-purple-600",
    subjects: ["Chemistry"],
    level: "HSC Level",
    medium: "Bangla Version",
    summary: "3 months duration",
    details: {
      classLevel: "HSC (Class 11-12)",
      subjects: "Chemistry",
      medium: "Bangla Version",
      institute: "Eden Mohila College",
      studyPurpose: "Board Exam Preparation",
      location: "House 33, Road 5, Mirpur, Dhaka",
      schedule: {
        daysPerWeek: "3 days",
        hoursPerDay: "1.5 hours",
        daysName: "Mon, Wed, Fri",
        monthlySalary: "12,000",
        startingMonth: "March 2024",
      },
    },
  },
  {
    id: 3,
    name: "Mr. Karim Ahmed",
    tuitionType: "Monthly Based",
    tuitionTypeColor: "bg-blue-100 text-blue-600",
    subjects: ["English", "ICT"],
    level: "HSC Level",
    medium: "English Version",
    summary: "5 days/week",
    details: {
      classLevel: "HSC (Class 11-12)",
      subjects: "English, ICT",
      medium: "English Version",
      institute: "Notre Dame College",
      studyPurpose: "Skill Development",
      location: "House 12, Block C, Banani, Dhaka",
      schedule: {
        daysPerWeek: "5 days",
        hoursPerDay: "2 hours",
        daysName: "Sat-Wed",
        monthlySalary: "20,000",
        startingMonth: "April 2024",
      },
    },
  },
];

export default function TeacherDetailsCard() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="space-y-6">
        {requestsData.map((req) => (
          <div
            key={req.id}
            className="relative rounded-2xl overflow-hidden 
              bg-white/20 backdrop-blur-xl border border-white/30
              shadow-[0_8px_30px_rgb(0,0,0,0.12)]
              hover:shadow-[0_8px_40px_rgba(0,0,0,0.2)]
              transition-all duration-300"
          >
            {/* Gradient floating shadow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-100/40 via-transparent to-purple-100/40 pointer-events-none"></div>

            {/* Card Header */}
            <div className="relative flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-tr from-indigo-200 to-purple-200 rounded-full flex items-center justify-center text-gray-700 font-bold">
                  {req.name.charAt(0)}
                </div>
                <div>
                  <h2 className="font-semibold text-lg text-gray-900">
                    {req.name}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${req.tuitionTypeColor}`}
                    >
                      {req.tuitionType}
                    </span>
                    <span>{req.subjects.join(", ")}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {req.level} • {req.medium} • {req.summary}
                  </div>
                </div>
              </div>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${
                    expandedId === req.id
                      ? "bg-gray-200 text-gray-800 shadow-inner"
                      : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90 shadow-md"
                  }`}
                onClick={() => toggleExpand(req.id)}
              >
                {expandedId === req.id ? "Hide Details" : "View Details"}
              </button>
            </div>

            {/* Expanded Content */}
            {expandedId === req.id && req.details && (
              <div className="relative px-6 pb-6 border-t border-white/40 bg-white/40 backdrop-blur-xl rounded-b-2xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
                  {/* Tuition Details */}
                  <div className="bg-white/50 backdrop-blur-lg p-4 rounded-xl shadow-md border border-white/40">
                    <h3 className="text-lg font-semibold text-indigo-600 mb-3">
                      Tuition Details
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-800">
                      <li>
                        <strong>Class Level:</strong> {req.details.classLevel}
                      </li>
                      <li>
                        <strong>Subjects:</strong> {req.details.subjects}
                      </li>
                      <li>
                        <strong>Medium:</strong> {req.details.medium}
                      </li>
                      <li>
                        <strong>Institute:</strong> {req.details.institute}
                      </li>
                      <li>
                        <strong>Study Purpose:</strong>{" "}
                        {req.details.studyPurpose}
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
                        {req.details.schedule.daysPerWeek}
                      </li>
                      <li>
                        <strong>Hours/Day:</strong>{" "}
                        {req.details.schedule.hoursPerDay}
                      </li>
                      <li>
                        <strong>Days:</strong> {req.details.schedule.daysName}
                      </li>
                      <li>
                        <strong>Monthly Salary:</strong>{" "}
                        {req.details.schedule.monthlySalary}
                      </li>
                      <li>
                        <strong>Starting Month:</strong>{" "}
                        {req.details.schedule.startingMonth}
                      </li>
                    </ul>
                  </div>

                  {/* Location */}
                  <div className="bg-white/50 backdrop-blur-lg p-4 rounded-xl shadow-md border border-white/40">
                    <h3 className="text-lg font-semibold text-indigo-600 mb-3">
                      Location
                    </h3>
                    <p className="text-sm text-gray-800">
                      {req.details.location}
                    </p>
                  </div>
                </div>

                {/* Action Buttons - bottom right */}
                <div className="flex justify-end gap-3 mt-6">
                  <button className="px-4 py-2 text-sm rounded-md bg-gradient-to-r from-gray-900 to-black text-white shadow-md hover:opacity-90 transition">
                    ✓ Accept
                  </button>
                  <button className="px-4 py-2 text-sm rounded-md bg-gradient-to-r from-gray-200 to-white text-black shadow-md hover:opacity-90 transition">
                    ✕ Decline
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
