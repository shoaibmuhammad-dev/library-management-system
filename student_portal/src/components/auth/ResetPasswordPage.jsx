import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Button from "../common/Button";
import { enqueueSnackbar } from "notistack";
import { useResetPasswordMutation } from "../../services/authApi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { BiCheck, BiX } from "react-icons/bi";

const ResetPasswordForm = ({ email, resetToken }) => {
  const navigate = useNavigate();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordRules = [
    {
      label: "At least 8 characters",
      test: (password) => password.length >= 8,
    },
    {
      label: "One uppercase letter",
      test: (password) => /[A-Z]/.test(password),
    },
    {
      label: "One lowercase letter",
      test: (password) => /[a-z]/.test(password),
    },
    {
      label: "One number",
      test: (password) => /\d/.test(password),
    },
    {
      label: "One special character",
      test: (password) =>
        /[!@#$%^&*(),.?":{}|<>_\-\\[\]/`~;'=+]/.test(password),
    },
  ];

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      password: Yup.string()
        .required("Enter your new password")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(
          /[!@#$%^&*(),.?":{}|<>_\-\\[\]/`~;'=+]/,
          "Password must contain at least one special character",
        ),

      confirmPassword: Yup.string()
        .required("Confirm your new password")
        .oneOf([Yup.ref("password")], "Passwords do not match"),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        if (!email) {
          enqueueSnackbar(
            "Your password reset session has expired. Please start again.",
            {
              variant: "error",
            },
          );

          navigate("/forgot-password");
          return;
        }

        if (!resetToken) {
          enqueueSnackbar(
            "Invalid or expired password reset session. Please request a new code.",
            {
              variant: "error",
            },
          );

          navigate("/forgot-password");
          return;
        }

        const res = await resetPassword({
          email,
          resetToken,
          password: values.password,
        }).unwrap();

        if (res?.success) {
          enqueueSnackbar(
            res?.message || "Your password has been reset successfully.",
            {
              variant: "success",
            },
          );

          resetForm();

          navigate("/login");
        }
      } catch (error) {
        console.log("reset password error >>> ", error);
      }
    },
  });

  const password = formik.values.password;

  const isPasswordStrong = passwordRules.every((rule) => rule.test(password));

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full lg:w-[80%] max-w-[600px] flex flex-col items-start justify-center gap-6 py-20"
    >
      <img src={"/logo.png"} width={172} height={32} alt="logo" />

      <h1 className="text-[28px] font-semibold leading-8 m-0">
        Reset Password
      </h1>

      <p className="text-lg leading-6 secondary-text">
        Create a new password for your account. Make sure it is strong and
        secure.
      </p>

      {/* Password */}
      <div className="w-full flex flex-col items-start gap-1 mt-3">
        <label htmlFor="password" className="secondary-text">
          New Password
        </label>

        <div className="relative w-full">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="new-password"
            placeholder="Enter your new password"
            className="bg-[#232839] py-3 px-4 pr-12 secondary-text w-full outline-none rounded-md"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 secondary-text"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
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

      {/* Password requirements */}
      {password.length > 0 && (
        <div className="w-full flex flex-col gap-2 -mt-3">
          <p className="text-sm secondary-text">Password requirements:</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {passwordRules.map((rule) => {
              const valid = rule.test(password);

              return (
                <div
                  key={rule.label}
                  className="flex items-center gap-2 text-sm"
                >
                  {valid ? (
                    <BiCheck size={16} className="text-green-500 shrink-0" />
                  ) : (
                    <BiX size={16} className="text-red-500 shrink-0" />
                  )}

                  <span className={valid ? "text-green-500" : "secondary-text"}>
                    {rule.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Confirm password */}
      <div className="w-full flex flex-col items-start gap-1">
        <label htmlFor="confirmPassword" className="secondary-text">
          Confirm Password
        </label>

        <div className="relative w-full">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="new-password"
            placeholder="Confirm your new password"
            className="bg-[#232839] py-3 px-4 pr-12 secondary-text w-full outline-none rounded-md"
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 secondary-text"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? (
              <FaRegEye className="secondary-text text-base" />
            ) : (
              <FaRegEyeSlash className="secondary-text text-base" />
            )}
          </button>
        </div>

        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <p className="text-sm text-red-600">
            {formik.errors.confirmPassword}
          </p>
        ) : null}

        {/* Live password match indicator */}
        {formik.values.confirmPassword.length > 0 &&
          !formik.errors.confirmPassword && (
            <p className="text-sm text-green-500 flex items-center gap-1">
              <BiCheck size={15} />
              Passwords match
            </p>
          )}
      </div>

      {/* Submit */}
      <div className="w-full">
        <Button
          text="Reset Password"
          type="submit"
          loading={isLoading}
          disabled={
            isLoading ||
            !isPasswordStrong ||
            formik.values.password !== formik.values.confirmPassword
          }
        />
      </div>

      <p className="secondary-text font-medium text-center mt-2 mx-auto">
        Remember your password?{" "}
        <Link to="/login" className="orangeText">
          Login here
        </Link>
      </p>
    </form>
  );
};

export default ResetPasswordForm;
