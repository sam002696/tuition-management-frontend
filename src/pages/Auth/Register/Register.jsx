import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import InputSelect from "../../../components/common/InputSelect";

const Register = () => {
  const isLoading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      mobile: "",
      email: "",
      password: "",
      role: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      mobile: Yup.string()
        .matches(/^01[0-9]{9}$/, "Enter a valid Bangladeshi mobile number")
        .required("Mobile number is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      role: Yup.string()
        .oneOf(["student", "teacher"], "Select a valid role")
        .required("Role is required"),
    }),
    onSubmit: (values) => {
      const formattedData = {
        name: `${values.first_name.trim()} ${values.last_name.trim()}`,
        email: values.email,
        phone: values.mobile,
        password: values.password,
        role: values.role,
      };
      dispatch({
        type: "REGISTER",
        payload: {
          registerData: formattedData,
          navigate,
        },
      });
    },
  });

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          alt="Logo"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-16 w-auto"
        />
        <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already registered?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                name="first_name"
                placeholder="Enter your first name"
                value={formik.values.first_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.first_name && formik.errors.first_name
                    ? formik.errors.first_name
                    : ""
                }
              />
              <Input
                label="Last Name"
                name="last_name"
                placeholder="Enter your last name"
                value={formik.values.last_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.last_name && formik.errors.last_name
                    ? formik.errors.last_name
                    : ""
                }
              />
            </div>

            <Input
              label="Mobile Number"
              type="text"
              name="mobile"
              placeholder="e.g. 017XXXXXXXX"
              value={formik.values.mobile}
              onChange={(e) => {
                const onlyDigits = e.target.value.replace(/\D/g, "");
                formik.setFieldValue("mobile", onlyDigits);
              }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.mobile && formik.errors.mobile
                  ? formik.errors.mobile
                  : ""
              }
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : ""
              }
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : ""
              }
            />

            <InputSelect
              label="Registering as"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.role && formik.errors.role
                  ? formik.errors.role
                  : ""
              }
              options={[
                { value: "", label: "Select your role" },
                { value: "student", label: "Student" },
                { value: "teacher", label: "Teacher" },
              ]}
            />

            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              Get started today
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
