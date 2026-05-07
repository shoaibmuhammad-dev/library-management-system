import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { addBookFormValidationSchema } from "../../schemas/addBookFormValidationSchema";
import InputField from "../Global/InputField";
import SummaryField from "../Global/SummaryField";
import BackButton from "../Global/BackButton";
import { enqueueSnackbar } from "notistack";
import Button from "../Global/Button";
import { IoClose } from "react-icons/io5";
import {
  useEditBookMutation,
  useGetBookByIdQuery,
} from "../../services/books/books.service";
import PageLoader from "../Global/PageLoader";

const EditBookForm = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const {
    data,
    error,
    isError,
    isLoading: bookIsPending,
    refetch,
  } = useGetBookByIdQuery(bookId, {
    refetchOnFocus: false,
  });

  const [editBook, { isLoading }] = useEditBookMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: data?.data?.bookTitle || "",
      author: data?.data?.author || "",
      genre: data?.data?.genre || "",
      bookCount: data?.data?.totalBooks || "",
      bookImages: data?.data?.bookImages || [],
      bookSummary: data?.data?.bookSummary || "",
      bookCoverImage: data?.data?.bookCoverImage
        ? [data.data.bookCoverImage]
        : [],
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

        // cover image
        if (values.bookCoverImage[0] instanceof File) {
          formData.append("bookCoverImage", values.bookCoverImage[0]);
        }

        const existingImages = [];

        values.bookImages.forEach((img) => {
          if (img instanceof File) {
            formData.append("bookImages", img); // new upload
          } else {
            existingImages.push(img); // keep existing
          }
        });

        // send existing images list
        formData.append("existingBookImages", JSON.stringify(existingImages));

        const res = await editBook({ data: formData, bookId }).unwrap();

        resetForm();
        enqueueSnackbar("Book updated successfully!", { variant: "success" });
        navigate(`/books/${res?.data?._id}`);
      } catch (error) {
        console.log("err while editing book >>>> ", error);
      }
    },
  });

  // Handle cover image change
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    formik.setFieldValue("bookCoverImage", [file]);
  };

  // Handle multiple book images upload
  const handleBookImagesChange = (e) => {
    const files = Array.from(e.target.files);

    const existingImagesCount = formik.values.bookImages.length;
    const remainingSlots = 5 - existingImagesCount;

    if (remainingSlots <= 0) {
      enqueueSnackbar("You can upload maximum 5 images", {
        variant: "warning",
      });
      return;
    }

    const filesToAdd = files.slice(0, remainingSlots);

    formik.setFieldValue("bookImages", [
      ...formik.values.bookImages,
      ...filesToAdd,
    ]);
  };

  // Remove book image (existing or new)
  const handleRemoveBookImage = (index) => {
    const updatedImages = [...formik.values.bookImages];
    updatedImages.splice(index, 1);

    formik.setFieldValue("bookImages", updatedImages);
  };

  const handleNavigateBack = () => navigate(-1);

  if (bookIsPending) {
    return <PageLoader />;
  }

  if (error || isError) {
    return (
      <div className="w-full h-screen bg-white rounded-xl screen flex justify-center items-center text-center pt-10">
        <h2 className="secondary-text">{error?.data?.error}</h2>
      </div>
    );
  }

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
            isLoading={isLoading}
          />

          <InputField
            labelTitle="Total number of books"
            placeholder="100"
            name="bookCount"
            value={formik.values.bookCount}
            onchange={formik.handleChange}
            isLoading={isLoading}
            error={formik.touched.bookCount && formik.errors.bookCount}
          />
        </div>

        <div className="w-full">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Cover Image
          </label>

          <label
            isLoading={isLoading}
            className="flex flex-col items-center justify-center w-full h-[56px] bg-white border rounded-lg cursor-pointer border-gray-300"
          >
            <p className="text-sm secondary-text">
              <strong className="font-medium">Click to upload new cover</strong>
            </p>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              isLoading={isLoading}
              onChange={handleCoverImageChange}
            />
          </label>

          {formik.values.bookCoverImage?.length > 0 && (
            <img
              src={
                formik.values.bookCoverImage[0] instanceof File
                  ? URL.createObjectURL(formik.values.bookCoverImage[0])
                  : formik.values.bookCoverImage[0]
              }
              alt="Book cover"
              className="object-cover h-[86px] rounded mt-3"
            />
          )}
        </div>

        <div className="w-full">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Book Images (max 5)
          </label>

          <label
            isLoading={isLoading}
            className="flex flex-col items-center justify-center w-full h-[56px] bg-white border rounded-lg cursor-pointer border-gray-300"
          >
            <p className="text-sm secondary-text">
              <strong className="font-medium">Click to upload</strong>
            </p>

            <input
              type="file"
              accept="image/*"
              multiple
              isLoading={isLoading}
              className="hidden"
              onChange={handleBookImagesChange}
            />
          </label>

          {formik.values.bookImages.length > 0 && (
            <div className="w-full flex gap-4 mt-3 flex-wrap">
              {formik.values.bookImages.map((img, index) => (
                <div className="relative" key={index}>
                  <img
                    src={img instanceof File ? URL.createObjectURL(img) : img}
                    alt={`Book image ${index + 1}`}
                    className="object-cover h-[86px] rounded"
                  />

                  <button
                    type="button"
                    isLoading={isLoading}
                    onClick={() => handleRemoveBookImage(index)}
                    className="w-5 h-5 bg-gray-300 rounded-full absolute -top-2 -right-2 z-10 flex items-center justify-center"
                  >
                    <IoClose className="text-gray-700" size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <SummaryField
          labelTitle="Book Summary"
          placeholder="Write summary here..."
          name="bookSummary"
          value={formik.values.bookSummary}
          onchange={formik.handleChange}
          error={formik.touched.bookSummary && formik.errors.bookSummary}
          isLoading={isLoading}
        />

        <Button text={`Save`} type={"submit"} loading={isLoading} />
      </form>
    </div>
  );
};

export default EditBookForm;
