import * as Yup from "yup";

export const addBookFormValidationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .matches(/^[a-zA-Z0-9\s]+$/, "Please enter a valid title.")
    .min(3, "Title must contain at least 3 characters.")
    .max(50, "Title must be less than 50 characters.")
    .required("Title is required."),
  author: Yup.string()
    .trim()
    .matches(/^[a-zA-Z.\s]+$/, "Please enter a valid name.")
    .min(3, "Author name must contain at least 3 characters.")
    .max(30, "Author name must be less than 30 characters.")
    .required("Author name is required."),
  genre: Yup.string()
    .min(3, "Genre must contain at least 3 characters.")
    .max(50, "Genre must be less than 50 characters.")
    .required("Genre is required."),
  bookCount: Yup.number()
    .min(0, "Book count not be less than 0.")
    .max(1500, "Book count must be less than 1500.")
    .required("Book count is required.")
    .typeError("Book count must be a number."),
  bookCoverImage: Yup.array()
    .required("Cover image is required.")
    .min(1, "Please upload a cover image.")
    .max(1, "You can add only 1 cover image."),
  bookImages: Yup.array()
    .min(1, "Upload at least one image.")
    .max(5, "You can upload upto 5 images.")
    .required("Book image is required."),
  bookSummary: Yup.string()
    .min(30, "Book summary must be at least 30 characters.")
    .max(2000, "Book summary must be less than 2000 characters.")
    .required("Book summary is required."),
});
