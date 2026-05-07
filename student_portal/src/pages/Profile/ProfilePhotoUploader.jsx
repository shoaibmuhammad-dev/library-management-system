import { enqueueSnackbar } from "notistack";
import { useState } from "react";

const ProfilePhotoUploader = ({ onFileSelect, preview }) => {
  const [imagePreview, setImagePreview] = useState(preview || null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      enqueueSnackbar("Max 5MB", {
        variant: "error",
      });
    }

    onFileSelect(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex items-center justify-center w-full mx-auto">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center rounded-full w-[150px] h-[150px] border border-dashed border-gray-600 cursor-pointer bg-[#232839] overflow-hidden"
      >
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="profile"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <p className="text-xs text-center secondary-text">
            Click to upload <br /> profile picture
          </p>
        )}

        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default ProfilePhotoUploader;
