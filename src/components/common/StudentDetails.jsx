const StudentDetails = ({ data }) => {
  const { student, tuition_details } = data;

  // Pairs of student info
  const studentInfo = [
    ["Full Name", student.name],
    ["Email", student.email],
    ["Phone", student.phone],
    ["Student ID", student.custom_id],
    ["Status", data.status],
  ];

  // Pairs of tuition details
  const tuitionInfo = [
    ["Tuition Type", tuition_details.tuition_type],
    ["Class Level", tuition_details.class_level],
    ["Subjects", tuition_details.subject_list?.join(", ")],
    ["Medium", tuition_details.medium],
    ["Institute", tuition_details.institute_name],
    [
      "Address",
      `${tuition_details.address_line}, ${tuition_details.thana}, ${tuition_details.district}`,
    ],
    ["Study Purpose", tuition_details.study_purpose],
    ["Tuition Days/Week", tuition_details.tuition_days_per_week],
    ["Hours/Day", tuition_details.hours_per_day],
    ["Day Names", tuition_details.days_name?.join(", ")],
    ["Starting Month", tuition_details.starting_month],
    ["Monthly Salary", `${tuition_details.salary_per_month} BDT`],
  ];

  // Utility to split array into chunks of 2
  const chunkInPairs = (arr) =>
    arr.reduce((acc, _, i) => {
      if (i % 5 === 0) acc.push(arr.slice(i, i + 5));
      return acc;
    }, []);

  return (
    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
      <div className="px-4 py-6 sm:px-6">
        <h3 className="text-base font-semibold text-gray-900">
          Student Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Details and tuition information.
        </p>
      </div>

      <div className="border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {/* Student Info in pairs */}
          {chunkInPairs(studentInfo).map((pair, idx) => (
            <div
              key={idx}
              className="grid sm:grid-cols-6 gap-4 px-4 py-6 sm:px-6"
            >
              {pair.map(([label, value]) => (
                <div key={label} className="sm:col-span-3">
                  <dt className="text-sm font-medium text-gray-900">{label}</dt>
                  <dd className="mt-1 text-sm text-gray-700">{value}</dd>
                </div>
              ))}
              {/* If only one item in last row */}
              {pair.length === 1 && <div className="sm:col-span-3" />}
            </div>
          ))}

          {/* Tuition Info in pairs */}
          {chunkInPairs(tuitionInfo).map((pair, idx) => (
            <div
              key={idx}
              className="grid sm:grid-cols-6 gap-4 px-4 py-6 sm:px-6"
            >
              {pair.map(([label, value]) => (
                <div key={label} className="sm:col-span-3">
                  <dt className="text-sm font-medium text-gray-900">{label}</dt>
                  <dd className="mt-1 text-sm text-gray-700">{value || "—"}</dd>
                </div>
              ))}
              {/* If only one item in last row */}
              {pair.length === 1 && <div className="sm:col-span-3" />}
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default StudentDetails;
