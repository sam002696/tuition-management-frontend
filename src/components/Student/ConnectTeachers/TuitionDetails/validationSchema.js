import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  tuition_type: Yup.string().required("Required"),
  class_level: Yup.string().required("Required"),
  subject_list: Yup.string()
    .required("Required")
    .test("is-array", "Enter at least one subject", (val) => {
      return val && val.split(",").filter(Boolean).length > 0;
    }),
  medium: Yup.string().required("Required"),
  institute_name: Yup.string().required("Required"),
  address_line: Yup.string().required("Required"),
  district: Yup.string().required("Required"),
  thana: Yup.string().required("Required"),
  study_purpose: Yup.string().required("Required"),

  // Monthly Based
  tuition_days_per_week: Yup.number().when("tuition_type", {
    is: "monthly_based",
    then: (schema) => schema.required("Required"),
  }),
  hours_per_day: Yup.number().when("tuition_type", {
    is: "monthly_based",
    then: (schema) => schema.required("Required"),
  }),
  days_name: Yup.string().when("tuition_type", {
    is: "monthly_based",
    then: (schema) =>
      schema
        .required("Required")
        .test("is-array", "Enter at least one day", (val) => {
          return val && val.split(",").filter(Boolean).length > 0;
        }),
  }),
  salary_per_month: Yup.number().when("tuition_type", {
    is: "monthly_based",
    then: (schema) => schema.required("Required"),
  }),
  starting_month: Yup.string().when("tuition_type", {
    is: "monthly_based",
    then: (schema) => schema.required("Required"),
  }),

  // Course Based
  total_classes_per_course: Yup.number().when("tuition_type", {
    is: "course_based",
    then: (schema) => schema.required("Required"),
  }),
  hours_per_class: Yup.number().when("tuition_type", {
    is: "course_based",
    then: (schema) => schema.required("Required"),
  }),
  salary_per_subject: Yup.number().when("tuition_type", {
    is: "course_based",
    then: (schema) => schema.required("Required"),
  }),
  total_course_completion_salary: Yup.number().when("tuition_type", {
    is: "course_based",
    then: (schema) => schema.required("Required"),
  }),
  duration: Yup.string().when("tuition_type", {
    is: "course_based",
    then: (schema) => schema.required("Required"),
  }),
});

export default validationSchema;
