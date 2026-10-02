import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import Button from "../common/Button";
import { useForgotPasswordMutation } from "../../services/authApi";
import { enqueueSnackbar } from "notistack";
import Cookies from "js-cookie";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      role: "student",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Enter your email address"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await forgotPassword(values).unwrap();

        if (res?.success) {
          enqueueSnackbar(
            res?.message ||
              "We've sent a verification code on your email address.",
            { variant: "success" },
          );
          Cookies.set("verification-email", values.email);
          resetForm();
          navigate("/verify-email");
        }
      } catch (error) {
        console.log(
          "sned verification code (forgot-password) error >>> ",
          error,
        );
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full lg:w-[80%] max-w-[600px] flex flex-col items-start justify-center gap-6 py-20"
    >
      <img src={"/logo.png"} width={172} height={32} className="" alt="logo" />
      <h1 className="text-[28px] font-semibold leading-8 m-0">
        Forgot Password
      </h1>
      <p className="text-lg leading-6 secondary-text">
        Enter your registered email address, we'll send you a verification code.
      </p>

      <div className="w-full flex flex-col items-start gap-1 mt-3">
        <label htmlFor="email" className="secondary-text">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="bg-[#232839] py-3 px-4 secondary-text w-full outline-none rounded-md"
          placeholder="student@mail.com"
        />
        {formik.touched.email && formik.errors.email ? (
          <p className="text-sm text-red-600">{formik.errors.email}</p>
        ) : null}
      </div>

      <div className="w-full">
        <Button text={"Send"} type={"submit"} loading={isLoading} />
      </div>

      <p className="secondary-text font-medium text-center mt-2 mx-auto">
        Remember your password?{" "}
        <Link to={"/login"} className="orangeText">
          Login here
        </Link>
      </p>
    </form>
  );
};

export default ForgotPasswordForm;
