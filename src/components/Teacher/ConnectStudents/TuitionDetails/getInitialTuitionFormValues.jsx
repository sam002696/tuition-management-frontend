const getInitialFormValues = (teacherId, studentId, details = {}) => ({
  teacher_id: teacherId || "",
  student_id: studentId || "",
  tuition_type: details.tuition_type || "monthly_based",
  class_level: details.class_level || "",
  subject_list: Array.isArray(details.subject_list)
    ? details.subject_list.join(", ")
    : "",
  medium: details.medium || "",
  institute_name: details.institute_name || "",
  address_line: details.address_line || "",
  district: details.district || "",
  thana: details.thana || "",
  study_purpose: details.study_purpose || "",

  tuition_days_per_week: details.tuition_days_per_week || "",
  hours_per_day: details.hours_per_day || "",
  days_name: Array.isArray(details.days_name)
    ? details.days_name.join(", ")
    : "",
  salary_per_month: details.salary_per_month || "",
  starting_month: details.starting_month || "",

  total_classes_per_course: details.total_classes_per_course || "",
  hours_per_class: details.hours_per_class || "",
  salary_per_subject: details.salary_per_subject || "",
  total_course_completion_salary: details.total_course_completion_salary || "",
  duration: details.duration || "",
});

export default getInitialFormValues;
