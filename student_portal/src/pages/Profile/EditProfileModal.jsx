import { useFormik } from "formik";
import { DEPARTMENTS } from "../../constants/departments";
import { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import ProfilePhotoUploader from "./ProfilePhotoUploader";
import Button from "../../components/common/Button";
import { editProfileSchema } from "../../validationSchema/editProfileSchema";
import { IoClose } from "react-icons/io5";
import { useUpdateProfileMutation } from "../../services/authApi";
import { enqueueSnackbar } from "notistack";

const EditProfileModal = ({ toggleModal, data }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [file, setFile] = useState(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (dept) => {
    formik.setFieldValue("department", dept);
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      dateOfBirth: data?.dateOfBirth || "",
      phoneNumber: data?.phoneNumber || "",
      department: data?.department || "",
    },
    validationSchema: editProfileSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();

        // ✅ append text fields
        Object.keys(values).forEach((key) => {
          if (values[key]) {
            formData.append(key, values[key]);
          }
        });

        // ✅ append file
        if (file) {
          formData.append("profileImage", file);
        }

        await updateProfile(formData).unwrap();
        enqueueSnackbar("Profile has been updated successfully!", {
          variant: "success",
        });

        toggleModal(); // close modal
      } catch (err) {
        console.error(err);
      }
    },
  });
  return (
    <main className="w-full min-h-screen fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)] flex items-center justify-center padding-x">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-[566px] bg-[#232839] rounded-[10px] py-12 px-8 lg:px-12 space-y-4 max-h-[80vh] overflow-y-auto relative"
        style={{
          width: "100%",
          backgroundImage: `url("/book-details-bg.png")`,
          backgroundColor: `#090c15`,
        }}
      >
        <button
          type="button"
          onClick={toggleModal}
          className="w-6 h-6 rounded-full bg-gray-600 absolute top-6 right-6 z-20 flex items-center justify-center"
        >
          <IoClose className="text-gray-900 text-lg" />
        </button>
        <ProfilePhotoUploader
          preview={data?.profileImage}
          onFileSelect={(file) => setFile(file)}
        />
        {/* first name */}
        <div className="w-full flex flex-col items-start gap-1 mt-3">
          <label htmlFor="firstName" className="secondary-text">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-[#232839] p-3 secondary-text w-full outline-none rounded-md"
            placeholder="Dave"
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <p className="text-sm text-red-600">{formik.errors.firstName}</p>
          ) : null}
        </div>
        {/* last name */}
        <div className="w-full flex flex-col items-start gap-1 mt-3">
          <label htmlFor="lastName" className="secondary-text">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-[#232839] p-3 secondary-text w-full outline-none rounded-md"
            placeholder="Gray"
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <p className="text-sm text-red-600">{formik.errors.lastName}</p>
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

        <div className="w-full pt-3">
          <Button text={"Save"} type={"submit"} loading={isLoading} />
        </div>
      </form>
    </main>
  );
};

export default EditProfileModal;
