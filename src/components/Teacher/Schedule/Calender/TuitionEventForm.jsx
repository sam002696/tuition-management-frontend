import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../../../common/Input";
import { useDispatch, useSelector } from "react-redux";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  scheduled_at: Yup.string().required("Scheduled time is required"),
  // .matches(
  //   /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
  //   "Format must be YYYY-MM-DD HH:mm:ss"
  // ),
});

const TuitionEventForm = ({ selectedStudent, setIsModalOpen }) => {
  const { submitting } = useSelector((state) => state.scheduleTuitionEvents);
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    // console.log("New Event Submitted:", values);
    dispatch({
      type: "SUBMIT_TUITION_EVENTS",
      payload: {
        ...values,
        setIsModalOpen,
      },
    });
    // resetForm();
  };

  return (
    <Formik
      initialValues={{
        student_id: selectedStudent?.student?.id || "",
        title: "",
        description: "",
        scheduled_at: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, handleBlur, errors, touched }) => (
        <Form className="space-y-4">
          <Input
            label="Title"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && errors.title}
            placeholder="Enter event title"
          />

          <Input
            label="Description"
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.description && errors.description}
            placeholder="Enter event description"
          />

          <Input
            label="Scheduled At"
            type="datetime-local"
            name="scheduled_at"
            value={values.scheduled_at}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.scheduled_at && errors.scheduled_at}
            placeholder="2025-07-20 18:00:00"
          />

          <div className="pt-2">
            <button
              disabled={submitting}
              type="submit"
              className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm 
              font-semibold text-white hover:bg-indigo-500 disabled:bg-gray-600 disabled:hover:bg-gray-500"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TuitionEventForm;
