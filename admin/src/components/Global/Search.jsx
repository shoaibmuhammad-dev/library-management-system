import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import useOnline from "../../hooks/useOnline";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("search") || "";
  const [value, setValue] = useState(searchValue);
  const isOnline = useOnline();

  useEffect(() => {
    const delay = setTimeout(() => {
      if (value.trim() === "") {
        searchParams.delete("search");
        setSearchParams(searchParams);
      } else {
        setSearchParams({ search: value });
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [value]);

  return (
    <div className="flex gap-2 items-center justify-end h-12 rounded-xl border bg-white w-[35%] px-3.5">
      <IoSearchOutline className="text-xl secondary-text" />
      <input
        type="text"
        value={value}
        disabled={!isOnline}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search users, books by title, author, or genre."
        className="w-full h-full outline-none text-sm secondary-text disabled:cursor-not-allowed"
      />
      {value && (
        <button
          type="button"
          onClick={() => setValue("")}
          className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center"
        >
          <IoClose size={16} className="secondary-text" />
        </button>
      )}
    </div>
  );
};

export default Search;
