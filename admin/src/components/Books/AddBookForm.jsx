import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { addBookFormValidationSchema } from "../../schemas/addBookFormValidationSchema";
import InputField from "../Global/InputField";
import SummaryField from "../Global/SummaryField";
import ImageUpload from "../Global/ImageUpload";
import BackButton from "../Global/BackButton";
import { useAddBookMutation } from "../../services/books/books.service";
import UploadedImageList from "./UploadedImageList";
import { enqueueSnackbar } from "notistack";
import Button from "../Global/Button";

const AddBookForm = () => {
  const navigate = useNavigate();
  const [addBook, { isLoading }] = useAddBookMutation();

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      genre: "",
      bookCount: "",
      bookCoverImage: "",
      bookImages: [],
      bookSummary: "",
    },
    validationSchema: addBookFormValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();

        formData.append("bookTitle", values.title);
        formData.append("author", values.author);
        formData.append("genre", values.genre);
        formData.append("totalBooks", values.bookCount);
        formData.append("bookSummary", values.bookSummary);
        formData.append("bookCoverImage", values.bookCoverImage[0]);

        values.bookImages.forEach((file) => {
          formData.append("bookImages", file);
        });

        const res = await addBook(formData).unwrap();
        // console.log("response >>> ", res);

        resetForm();
        enqueueSnackbar("Book added successfully!", { variant: "success" });
        if (res?.data?._id) {
          navigate(`/books/${res?.data?._id}`);
        }
      } catch (error) {}
    },
  });

  const handleNavigateBack = () => navigate(-1);

  const removeImage = (index) => {
    const updatedImages = [...formik.values.bookImages];
    updatedImages.splice(index, 1);

    formik.setFieldValue("bookImages", updatedImages);
  };

  return (
    <div className="w-full pb-5">
      <BackButton onclick={handleNavigateBack} />

      <form
        onSubmit={formik.handleSubmit}
        className="mt-6 w-full lg:w-[70%] flex flex-col items-start gap-5"
      >
        <div className="w-full grid grid-cols-2 gap-5">
          <InputField
            labelTitle="Book Title"
            placeholder="7 Habits Of Highly Effective People"
            name="title"
            value={formik.values.title}
            onchange={formik.handleChange}
            error={formik.touched.title && formik.errors.title}
          />

          <InputField
            labelTitle="Author"
            placeholder="Ethan Smith"
            name="author"
            value={formik.values.author}
            onchange={formik.handleChange}
            error={formik.touched.author && formik.errors.author}
          />
        </div>

        <div className="w-full grid grid-cols-2 gap-5">
          <InputField
            labelTitle="Genre"
            placeholder="Motivation"
            name="genre"
            value={formik.values.genre}
            onchange={formik.handleChange}
            error={formik.touched.genre && formik.errors.genre}
          />

          <InputField
            labelTitle="Total number of books"
            placeholder="100"
            name="bookCount"
            value={formik.values.bookCount}
            onchange={formik.handleChange}
            error={formik.touched.bookCount && formik.errors.bookCount}
          />
        </div>

        <div className="w-full">
          {/* cover image */}
          <ImageUpload
            label="Book Cover Image"
            multiple={false}
            onChange={(files) => formik.setFieldValue("bookCoverImage", files)}
            error={
              formik.touched.bookCoverImage && formik.errors.bookCoverImage
            }
          />
          {/* Uploaded Cover Image Preview */}
          <UploadedImageList
            images={formik.values.bookCoverImage}
            onRemove={removeImage}
          />
        </div>

        <div className="w-full">
          {/* Image Upload */}
          <ImageUpload
            label="Book Image (Optional)"
            onChange={(files) => formik.setFieldValue("bookImages", files)}
            error={formik.touched.bookImages && formik.errors.bookImages}
          />

          {/* Uploaded Image Preview List */}
          <UploadedImageList
            images={formik.values.bookImages}
            onRemove={removeImage}
          />
        </div>

        <SummaryField
          labelTitle="Book Summary"
          placeholder="Write summary here..."
          name="bookSummary"
          value={formik.values.bookSummary}
          onchange={formik.handleChange}
          error={formik.touched.bookSummary && formik.errors.bookSummary}
        />

        <Button text={`Add`} type={"submit"} loading={isLoading} />
      </form>
    </div>
  );
};

export default AddBookForm;
