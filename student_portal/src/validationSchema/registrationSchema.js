import * as Yup from "yup";

export const signupValidationSchema = Yup.object({
  firstName: Yup.string()
    .min(3, "First name must contain at least 3 characters")
    .max(15, "Name must be 15 characters or less")
    .required("First name is required"),

  lastName: Yup.string()
    .min(3, "Last name must contain at least 3 characters")
    .max(25, "Last name must be 15 characters or less")
    .required("Last name is required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  idNumber: Yup.string()
    .matches(/^\d{13}$/, "ID must be exactly 13 digits")
    .required("ID is required"),

  phoneNumber: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Phone number is required"),

  dateOfBirth: Yup.date()
    .max(new Date(), "Date of birth cannot be in the future")
    .required("Date of birth is required"),

  department: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Department is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])/,
      "Password must contain at least 1 uppercase, 1 lowercase, and 1 special character",
    )
    .required("Password is required"),
});
