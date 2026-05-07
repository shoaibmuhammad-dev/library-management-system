import { useEffect, useRef, useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import Button from "../common/Button";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useSignupMutation } from "../../services/authApi";
import { signupValidationSchema } from "../../validationSchema/registrationSchema";
import { FiChevronDown } from "react-icons/fi";
import { DEPARTMENTS } from "../../constants/departments";
import { enqueueSnackbar } from "notistack";

const RegistrationForm = () => {
  const [showPass, setShowPass] = useState(false);
  const router = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const togglePassword = () => {
    setShowPass((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      idNumber: "",
      password: "",
      dateOfBirth: "",
      department: "",
      phoneNumber: "",
      profilePicture: "",
    },
    validationSchema: signupValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await signup({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          idNumber: values.idNumber,
          phoneNumber: values.phoneNumber,
          dateOfBirth: values.dateOfBirth,
          department: values.department,
          role: "student",
        }).unwrap();
        enqueueSnackbar("Account created successfully!", {
          variant: "success",
        });
        Cookies.set("studentToken", response?.token);
        Cookies.set("studentInfo", JSON.stringify(response?.data));
        resetForm();
        router("/");
      } catch (error) {}
    },
  });

  const handleSelect = (value) => {
    formik.setFieldValue("department", value);
    setOpen(false);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full flex flex-col items-start justify-center gap-6 md:w-[80%] max-w-[600px]"
    >
      <img src={"/logo.png"} width={172} height={32} className="" alt="logo" />
      <h1 className="text-[28px] font-semibold leading-8 m-0">
        Create Your Library Account
      </h1>
      <p className="text-lg leading-6 secondary-text">
        Please complete all fields and upload a valid university ID to gain
        access to the library
      </p>

      {/* Name */}
      <div className="w-full flex flex-col items-start gap-1 mt-3">
        <label htmlFor="firstName" className="secondary-text">
          First name
        </label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="bg-[#232839] p-3 secondary-text w-full outline-none rounded-md"
          placeholder="Ethan"
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <p className="text-red-600 text-sm">{formik.errors.firstName}</p>
        ) : null}
      </div>
      {/* last name */}
      <div className="w-full flex flex-col items-start gap-1 mt-3">
        <label htmlFor="lastName" className="secondary-text">
          Last name
        </label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="bg-[#232839] p-3 secondary-text w-full outline-none rounded-md"
          placeholder="Smith"
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <p className="text-red-600 text-sm">{formik.errors.lastName}</p>
        ) : null}
      </div>
      {/* Email */}
      <div className="w-full flex flex-col items-start gap-1">
        <label htmlFor="email" className="secondary-text">
          Email address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="bg-[#232839] p-3 secondary-text w-full outline-none rounded-md"
          placeholder="ethansmith@gmail.com"
        />
        {formik.touched.email && formik.errors.email ? (
          <p className="text-red-600 text-sm">{formik.errors.email}</p>
        ) : null}
      </div>
      {/* ID number */}
      <div className="w-full flex flex-col items-start gap-1">
        <label htmlFor="idNumber" className="secondary-text">
          University ID Number
        </label>
        <input
          type="number"
          name="idNumber"
          id="idNumber"
          value={formik.values.idNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="bg-[#232839] p-3 secondary-text w-full outline-none rounded-md"
          placeholder="eg: 394365762"
        />
        {formik.touched.idNumber && formik.errors.idNumber ? (
          <p className="text-red-600 text-sm">{formik.errors.idNumber}</p>
        ) : null}
      </div>
      {/* Date of birth */}
      <div className="w-full flex flex-col items-start gap-1">
        <label htmlFor="dateOfBirth" className="secondary-text">
          Date Of Birth
        </label>
        <input
          type="date"
          name="dateOfBirth"
          id="dateOfBirth"
          value={formik.values.dateOfBirth}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="bg-[#232839] p-3 secondary-text w-full outline-none rounded-md"
          placeholder="eg: 394365762"
        />
        {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
          <p className="text-red-600 text-sm">{formik.errors.dateOfBirth}</p>
        ) : null}
      </div>
      {/* phone number */}
      <div className="w-full flex flex-col items-start gap-1">
        <label htmlFor="phoneNumber" className="secondary-text">
          Contact No.
        </label>
        <input
          type="number"
          name="phoneNumber"
          id="phoneNumber"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="bg-[#232839] p-3 secondary-text w-full outline-none rounded-md"
          placeholder="eg: 394365762"
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
          <p className="text-red-600 text-sm">{formik.errors.phoneNumber}</p>
        ) : null}
      </div>
      {/* Department */}
      <div className="w-full flex flex-col gap-1 relative" ref={dropdownRef}>
        <label className="secondary-text">Department</label>

        {/* Input / Trigger */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="bg-[#232839] p-3 secondary-text w-full rounded-md flex items-center justify-between outline-none"
        >
          <span>{formik.values.department || "Select a department"}</span>
          <FiChevronDown
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute top-full mt-1 w-full bg-[#232839] rounded-md shadow-lg max-h-[200px] overflow-y-auto z-50">
            {DEPARTMENTS?.map((dept) => (
              <button
                key={dept}
                type="button"
                onClick={() => handleSelect(dept)}
                className={`w-full text-left px-4 py-2 secondary-text hover:bg-[#2f3550] transition-colors ${
                  formik.values.department === dept ? "bg-[#2f3550]" : ""
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        )}

        {/* Error */}
        {formik.touched.department && formik.errors.department && (
          <p className="text-red-600 text-sm">{formik.errors.department}</p>
        )}
      </div>
      {/* Password */}
      <div className="w-full flex flex-col items-start gap-1">
        <label htmlFor="password" className="secondary-text">
          Password
        </label>
        <div className="w-full bg-[#232839] p-3 flex items-center justify-between gap-1.5 rounded-md">
          <input
            type={showPass ? "text" : "password"}
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="secondary-text w-full outline-none bg-transparent"
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
          <p className="text-red-600 text-sm">{formik.errors.password}</p>
        ) : null}
      </div>

      <div className="w-full mt-2">
        <Button text={"Register"} type={"submit"} loading={isLoading} />
      </div>

      <p className="secondary-text font-medium text-center mt-2 mx-auto">
        Already have an account?{" "}
        <Link to={"/login"} className="orangeText">
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegistrationForm;
