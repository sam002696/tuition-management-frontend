import { useFormik } from "formik";
// import * as Yup from "yup";
import InputSelect from "../../../common/InputSelect";
import Input from "../../../common/Input";
import { AuthUser } from "../../../../helpers/AuthUser";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import getInitialFormValues from "./getInitialTuitionFormValues";
import validationSchema from "./validationSchema";
import TuitionDetailsSkeleton from "./TuitionDetailsSkeleton";

const tuitionTypeOptions = [
  { label: "Monthly Based", value: "monthly_based" },
  { label: "Course Based", value: "course" },
];

const TuitionDetails = ({ studentDetails }) => {
  const teacherId = useMemo(() => AuthUser.getUser().id, []);
  const { tuitionDetails, tuitionDetailsSubmitting, tuitionDetailsLoading } =
    useSelector((state) => state.connectStudents);

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: getInitialFormValues(teacherId, studentDetails?.id),
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload = {
        ...values,
        subject_list: values.subject_list
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean), // Removes empty strings
        days_name: values.days_name
          .split(",")
          .map((d) => d.trim())
          .filter(Boolean),
      };
      console.log("Form values:", values);
      // Dispatching action to submit tuition details
      dispatch({
        type: "SUBMIT_TUITION_DETAILS",
        payload,
      });
    },
  });

  const { values, handleChange, handleSubmit, errors, touched, handleBlur } =
    formik;

  const isMonthly = values.tuition_type === "monthly_based";

  useEffect(() => {
    if (studentDetails?.id && teacherId) {
      dispatch({
        type: "FETCH_TUITION_DETAILS",
        payload: {
          teacherId: teacherId,
          studentId: studentDetails.id,
        },
      });
    }
  }, [teacherId, studentDetails?.id, dispatch]);

  useEffect(() => {
    const shouldUpdateForm =
      tuitionDetails &&
      (formik.values.class_level !== tuitionDetails.class_level ||
        formik.values.medium !== tuitionDetails.medium);

    if (shouldUpdateForm) {
      formik.setValues(
        getInitialFormValues(teacherId, studentDetails?.id, tuitionDetails)
      );
    }

    if (!tuitionDetails) {
      formik.resetForm({
        values: getInitialFormValues(teacherId, studentDetails?.id),
      });
    }
  }, [tuitionDetails, studentDetails?.id, teacherId]);

  return (
    <>
      {tuitionDetailsLoading ? (
        <>
          <TuitionDetailsSkeleton />
        </>
      ) : (
        <>
          <form
            onSubmit={handleSubmit}
            className="max-w-2xl mt-6 space-y-6 bg-white shadow-sm sm:rounded-md sm:p-6"
          >
            <h3 className="text-base font-semibold text-gray-900 border-b border-gray-200 pb-3">
              Tuition Information
            </h3>

            <div className="grid grid-cols-6 gap-6 pt-5">
              <div className="col-span-6 sm:col-span-3">
                <InputSelect
                  label="Tuition Type"
                  name="tuition_type"
                  value={values.tuition_type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  options={tuitionTypeOptions}
                  error={touched.tuition_type && errors.tuition_type}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <Input
                  label="Class Level"
                  name="class_level"
                  placeholder={"e.g., Class 8, Class 9, Class 10"}
                  value={values.class_level}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.class_level && errors.class_level}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <Input
                  label="Subjects (comma separated)"
                  name="subject_list"
                  placeholder={"e.g., Math, Science, English"}
                  value={values.subject_list}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.subject_list && errors.subject_list}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <Input
                  label="Medium"
                  name="medium"
                  placeholder={"e.g., Bangla Version, English Version"}
                  value={values.medium}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.medium && errors.medium}
                />
              </div>
            </div>

            <Input
              label="Institute Name"
              name="institute_name"
              placeholder={"e.g., ABC Institute"}
              value={values.institute_name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.institute_name && errors.institute_name}
            />

            <Input
              label="Address Line"
              name="address_line"
              placeholder={"e.g., 123 Main St, City, Country"}
              value={values.address_line}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.address_line && errors.address_line}
            />

            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <Input
                  label="District"
                  name="district"
                  placeholder={"e.g., Dhaka"}
                  value={values.district}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.district && errors.district}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <Input
                  label="Thana"
                  name="thana"
                  placeholder={"e.g., Dhanmondi"}
                  value={values.thana}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.thana && errors.thana}
                />
              </div>
            </div>

            <Input
              label="Study Purpose"
              name="study_purpose"
              placeholder={"e.g., Exam Preparation, Skill Development"}
              value={values.study_purpose}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.study_purpose && errors.study_purpose}
            />

            {isMonthly ? (
              <>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <Input
                      label="Tuition Days Per Week"
                      name="tuition_days_per_week"
                      placeholder={"e.g., 5"}
                      type="number"
                      value={values.tuition_days_per_week}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        touched.tuition_days_per_week &&
                        errors.tuition_days_per_week
                      }
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <Input
                      label="Hours Per Day"
                      name="hours_per_day"
                      placeholder={"e.g., 2"}
                      type="number"
                      value={values.hours_per_day}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.hours_per_day && errors.hours_per_day}
                    />
                  </div>
                </div>

                <Input
                  label="Days Name (comma separated)"
                  name="days_name"
                  placeholder={"e.g., Saturday, Sunday, Monday"}
                  value={values.days_name}
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.days_name && errors.days_name}
                />

                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <Input
                      label="Salary Per Month"
                      name="salary_per_month"
                      type="number"
                      placeholder={"e.g., 20000"}
                      value={values.salary_per_month}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        touched.salary_per_month && errors.salary_per_month
                      }
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <Input
                      label="Starting Month"
                      name="starting_month"
                      placeholder={"e.g., January 2024"}
                      value={values.starting_month}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.starting_month && errors.starting_month}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <Input
                      label="Total Classes Per Course"
                      name="total_classes_per_course"
                      type="number"
                      placeholder={"e.g., 20"}
                      value={values.total_classes_per_course}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        touched.total_classes_per_course &&
                        errors.total_classes_per_course
                      }
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <Input
                      label="Hours Per Class"
                      name="hours_per_class"
                      type="number"
                      placeholder={"e.g., 1.5"}
                      value={values.hours_per_class}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.hours_per_class && errors.hours_per_class}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <Input
                      label="Salary Per Subject"
                      name="salary_per_subject"
                      type="number"
                      placeholder={"e.g., 500"}
                      value={values.salary_per_subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        touched.salary_per_subject && errors.salary_per_subject
                      }
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <Input
                      label="Total Course Completion Salary"
                      name="total_course_completion_salary"
                      type="number"
                      placeholder={"e.g., 5000"}
                      value={values.total_course_completion_salary}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        touched.total_course_completion_salary &&
                        errors.total_course_completion_salary
                      }
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <Input
                      label="Duration"
                      name="duration"
                      placeholder={"e.g., 3 months, 6 months"}
                      type="text"
                      value={values.duration}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.duration && errors.duration}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="pt-4">
              <button
                disabled={
                  formik.isSubmitting ||
                  formik.isValidating ||
                  tuitionDetails ||
                  tuitionDetailsSubmitting
                }
                type="submit"
                className="inline-flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                {tuitionDetails
                  ? "Already saved!"
                  : tuitionDetailsSubmitting
                  ? "Saving..."
                  : "Save and continue"}
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default TuitionDetails;
