const InputField = ({
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
      <label className="block mb-2 text-base font-medium text-gray-900">
        {labelTitle}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onchange}
        placeholder={placeholder}
        disabled={isLoading ? isLoading : false}
        className={`bg-white border ${
          error ? "border-red-500" : "border-gray-300"
        } text-gray-900 text-base rounded-lg outline-none block w-full px-5 h-[56px]`}
      />

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
