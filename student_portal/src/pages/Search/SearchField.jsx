import { useEffect, useState } from "react";
import { IoClose, IoSearch } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";

const SearchField = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get("search") || "");
  const debouncedValue = useDebounce(value, 300);

  useEffect(() => {
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        if (debouncedValue) {
          params.set("search", debouncedValue);
        } else {
          params.delete("search");
        }
        return params;
      },
      { replace: true },
    );
  }, [debouncedValue]);

  const handleClear = () => {
    setValue("");

    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        params.delete("search");
      },
      {
        replace: true,
      },
    );
  };

  return (
    <div className="w-full lg:w-[80%] xl:w-[60%] mx-auto bg-[#232839] flex items-center gap-3 rounded-[10px] h-[68px] px-4 md:px-6 mt-5">
      <IoSearch className="orangeText text-2xl" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search any book here..."
        className="w-full bg-transparent h-full outline-none"
      />
      {debouncedValue && (
        <button type="button" onClick={handleClear} className="cursor-pointer">
          <IoClose className="w-full h-full orangeText text-xl" />
        </button>
      )}
    </div>
  );
};

export default SearchField;
