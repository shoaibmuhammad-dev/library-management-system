import { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Button from "../Global/Button";
import { useLoginMutation } from "../../services/users/authApi";
import Cookies from "js-cookie";
import { enqueueSnackbar } from "notistack";

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Email address is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password address is required";
  }

  return errors;
};

const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);
  const router = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [login, { isLoading, error }] = useLoginMutation();

  const togglePassword = () => {
    setShowPass((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await login({
          email: values.email,
          password: values.password,
          user_type: "admin",
        }).unwrap();

        if (response?.success) {
          Cookies.set("adminToken", response?.token);
          Cookies.set("adminData", JSON.stringify(response?.data));
          resetForm();
          router("/");
        }
      } catch (error) {
        console.log("login error >>> ", error);
        setErrorMessage(
          error?.data?.message ||
            error?.response?.data?.message ||
            error?.message
        );
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full lg:w-[80%] max-w-[420px] flex flex-col items-start justify-center gap-4 py-20"
    >
      <img src={"/logo.png"} className="max-w-[80px]" alt="logo" />
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-[28px] font-semibold leading-[1] m-0">
          Welcome Back to the BookWise
        </h1>
        <p className="text-lg leading-[1.2] secondary-text">
          Access the vast collection of resources, and stay updated
        </p>
        {/* {errorMessage && (
          <p className="bg-red-50 text-red-500 px-4 py-3 rounded-lg text-sm mt-3">
            {errorMessage}
          </p>
        )} */}
      </div>

      <div className="w-full flex flex-col items-start gap-1 mt-1">
        <label htmlFor="email" className="text-gray-800 font-medium">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg outline-none block w-full px-5 h-[56px]"
          placeholder="adrian@jsmastery.pro"
        />
        {formik.touched.email && formik.errors.email ? (
          <p className="text-sm text-red-600">{formik.errors.email}</p>
        ) : null}
      </div>
      <div className="w-full flex flex-col items-start gap-1">
        <label htmlFor="password" className="text-gray-800 font-medium">
          Password
        </label>
        <div className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg outline-none w-full px-5 h-[56px] flex items-center justify-between">
          <input
            type={showPass ? "text" : "password"}
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="secondary-text w-full outline-none bg-transparent text-gray-900"
            placeholder="Atleast 8 characters long"
          />
          <button type="button" onClick={() => togglePassword()}>
            {showPass ? (
              <FaRegEye className="secondary-text text-base" />
            ) : (
              <FaRegEyeSlash className="secondary-text text-base" />
            )}
          </button>
        </div>
        {formik.touched.password && formik.errors.password ? (
          <p className="text-sm text-red-600">{formik.errors.password}</p>
        ) : null}
      </div>

      <div className="w-full mt-3">
        <Button text={"Login"} type={"submit"} loading={isLoading} />
      </div>
    </form>
  );
};

export default LoginForm;
