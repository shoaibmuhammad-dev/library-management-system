import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRef } from "react";
import Button from "../common/Button";
import { enqueueSnackbar } from "notistack";
import { useVerifyOtpMutation } from "../../services/authApi";
import Cookies from "js-cookie";

const OTP_LENGTH = 5;

const OtpVerificationForm = () => {
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  const formik = useFormik({
    initialValues: {
      otp: Array(OTP_LENGTH).fill(""),
    },

    validationSchema: Yup.object({
      otp: Yup.array()
        .of(
          Yup.string()
            .matches(/^\d$/, "Only numbers are allowed")
            .required("Required"),
        )
        .length(OTP_LENGTH, "Enter the complete verification code"),
    }),

    onSubmit: async (values, { resetForm }) => {
      const otp = values.otp.join("");

      if (otp.length !== OTP_LENGTH) {
        enqueueSnackbar("Please enter the complete verification code.", {
          variant: "error",
        });
        return;
      }

      const email = Cookies.get("verification-email");

      try {
        const res = await verifyOtp({
          email,
          role: "student",
          otp,
        }).unwrap();

        if (res?.success) {
          enqueueSnackbar(res?.message || "OTP verified successfully.", {
            variant: "success",
          });

          resetForm();

          navigate("/reset-password");
        }
      } catch (error) {
        console.log("verify OTP error >>> ", error);

        enqueueSnackbar(
          error?.data?.message || "Invalid or expired verification code.",
          {
            variant: "error",
          },
        );
      }
    },
  });

  const focusInput = (index) => {
    if (index >= 0 && index < OTP_LENGTH) {
      inputRefs.current[index]?.focus();
      inputRefs.current[index]?.select();
    }
  };

  const handleChange = (index, value) => {
    // Keep only numbers
    const digits = value.replace(/\D/g, "");

    if (!digits) {
      formik.setFieldValue(`otp[${index}]`, "");
      return;
    }

    // Normal single-digit input
    formik.setFieldValue(`otp[${index}]`, digits[digits.length - 1]);

    // Move to next input
    if (index < OTP_LENGTH - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (index, event) => {
    const { key } = event;

    // Backspace
    if (key === "Backspace") {
      event.preventDefault();

      if (formik.values.otp[index]) {
        // Clear current digit first
        formik.setFieldValue(`otp[${index}]`, "");
      } else if (index > 0) {
        // If current is already empty, move backwards
        formik.setFieldValue(`otp[${index - 1}]`, "");
        focusInput(index - 1);
      }

      return;
    }

    // Delete
    if (key === "Delete") {
      event.preventDefault();

      formik.setFieldValue(`otp[${index}]`, "");

      return;
    }

    // Arrow navigation
    if (key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      focusInput(index - 1);
      return;
    }

    if (key === "ArrowRight" && index < OTP_LENGTH - 1) {
      event.preventDefault();
      focusInput(index + 1);
      return;
    }

    // Prevent non-numeric characters
    if (
      !/^\d$/.test(key) &&
      key !== "Tab" &&
      key !== "Enter" &&
      key !== "Escape" &&
      !event.ctrlKey &&
      !event.metaKey
    ) {
      event.preventDefault();
    }
  };

  const handlePaste = (event, index) => {
    event.preventDefault();

    const pastedData = event.clipboardData.getData("text").replace(/\D/g, "");

    if (!pastedData) {
      return;
    }

    const digits = pastedData.slice(0, OTP_LENGTH - index);

    const newOtp = [...formik.values.otp];

    digits.split("").forEach((digit, offset) => {
      newOtp[index + offset] = digit;
    });

    formik.setFieldValue("otp", newOtp);

    // Focus the input after the last pasted digit
    const nextIndex = Math.min(index + digits.length, OTP_LENGTH - 1);

    focusInput(nextIndex);
  };

  const handleFocus = (index) => {
    inputRefs.current[index]?.select();
  };

  const handleBeforeInput = (event) => {
    // Prevent non-numeric input from being inserted
    if (event.data && !/^\d+$/.test(event.data)) {
      event.preventDefault();
    }
  };

  const isComplete = formik.values.otp.every((digit) => digit !== "");

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full lg:w-[80%] max-w-[400px] flex flex-col items-start justify-center gap-6 py-20"
    >
      <img src={"/logo.png"} width={172} height={32} className="" alt="logo" />

      <h1 className="text-[28px] font-semibold leading-8 m-0">Verify OTP</h1>

      <p className="text-lg leading-6 secondary-text">
        Enter the 5-digit verification code we sent to your email address.
      </p>

      <div className="w-full flex flex-col items-start gap-2 mt-3">
        <label className="secondary-text">Verification Code</label>

        <div className="flex items-center justify-between gap-3 w-full">
          {formik.values.otp.map((digit, index) => (
            <input
              key={index}
              ref={(element) => {
                inputRefs.current[index] = element;
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              autoComplete={index === 0 ? "one-time-code" : "off"}
              value={digit}
              onChange={(event) => handleChange(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              onPaste={(event) => handlePaste(event, index)}
              onFocus={() => handleFocus(index)}
              onBeforeInput={handleBeforeInput}
              className="bg-[#232839] text-white text-center text-xl font-semibold py-3 w-full max-w-[70px] h-[55px] outline-none rounded-md border border-transparent focus:border-[#E7C9A5] transition-colors"
              aria-label={`OTP digit ${index + 1}`}
            />
          ))}
        </div>

        {formik.submitCount > 0 && !isComplete ? (
          <p className="text-sm text-red-600">
            Please enter the complete verification code.
          </p>
        ) : null}
      </div>

      <div className="w-full">
        <Button text={"Verify"} type={"submit"} loading={isLoading} />
      </div>

      <p className="secondary-text font-medium text-center mt-2 mx-auto">
        Didn't receive the code?{" "}
        <button
          type="button"
          className="orangeText"
          onClick={() => {
            // Add resend OTP logic here
          }}
        >
          Resend code
        </button>
      </p>

      <p className="secondary-text font-medium text-center mx-auto">
        Remember your password?{" "}
        <Link to={"/login"} className="orangeText">
          Login here
        </Link>
      </p>
    </form>
  );
};

export default OtpVerificationForm;
