const SummaryField = ({
  labelTitle,
  name,
  value,
  onchange,
  placeholder,
  error,
  isLoading,
}) => {
  return (
    <div className="w-full">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {labelTitle}
      </label>

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onchange}
        placeholder={placeholder}
        rows="7"
        disabled={isLoading ? isLoading : false}
        className={`bg-white border ${
          error ? "border-red-500" : "border-gray-300"
        } text-gray-900 text-sm rounded-lg block w-full p-3 resize-none`}
      ></textarea>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default SummaryField;
