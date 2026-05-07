import * as Yup from "yup";

export const editProfileSchema = Yup.object({
  firstName: Yup.string()
    .min(3, "First name must contain at least 3 characters")
    .max(15, "Name must be 15 characters or less")
    .required("First name is required"),

  lastName: Yup.string()
    .min(3, "Last name must contain at least 3 characters")
    .max(25, "Last name must be 15 characters or less")
    .required("Last name is required"),

  phoneNumber: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Phone number is required"),

  dateOfBirth: Yup.date()
    .max(new Date(), "Date of birth cannot be in the future")
    .required("Date of birth is required"),

  department: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Department is required"),
});
