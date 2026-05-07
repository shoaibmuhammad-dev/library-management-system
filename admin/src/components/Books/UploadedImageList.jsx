const UploadedImageList = ({ images, onRemove }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="w-full flex items-center gap-5 flex-wrap mt-2">
      {images.map((file, index) => {
        const previewUrl = URL.createObjectURL(file);

        return (
          <div key={index} className="relative">
            <img
              src={previewUrl}
              alt="uploaded"
              className="w-16 h-16 object-cover rounded-md border"
            />

            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default UploadedImageList;
