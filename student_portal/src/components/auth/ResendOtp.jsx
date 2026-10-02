import { useEffect, useState } from "react";
import { useForgotPasswordMutation } from "../../services/authApi";
import Cookies from "js-cookie";
import { enqueueSnackbar } from "notistack";

const ResendOtp = () => {
  const [time, setTime] = useState(60);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  const handleResend = async () => {
    const email = Cookies.get("verification-email");
    try {
      const res = await forgotPassword({ email }).unwrap();
      if (res?.success) {
        setTime(60);
        enqueueSnackbar(res?.message || "OTP has been sent", {
          variant: "success",
        });
      }
    } catch (error) {
      console.log("error while resending OTP >> ", error);
    }
  };

  return (
    <p className="secondary-text font-medium text-center mt-2 mx-auto">
      Didn't receive the code?{" "}
      {time > 0 ? (
        <span>{time}s</span>
      ) : (
        <button type="button" className="orangeText" onClick={handleResend}>
          {isLoading ? "Resending..." : "Resend code"}
        </button>
      )}
    </p>
  );
};

export default ResendOtp;
