const ImageUpload = ({ onChange, error, label, multiple = true }) => {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    onChange(multiple ? files : files.slice(0, 1));
  };

  return (
    <div className="w-full">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>

      <label
        className={`flex flex-col items-center justify-center w-full h-[56px] bg-white border rounded-lg cursor-pointer ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <p className="text-sm secondary-text">
          <strong className="font-medium">Click to upload</strong>
        </p>

        <input
          type="file"
          className="hidden"
          multiple={multiple}
          onChange={handleFileChange}
        />
      </label>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default ImageUpload;
