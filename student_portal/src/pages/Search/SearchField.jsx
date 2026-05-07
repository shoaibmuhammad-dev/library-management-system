import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const SearchField = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setValue(searchParams.get("q") || "");
  }, [searchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (value.trim()) params.set("q", value.trim());
      else params.delete("q");

      navigate(`${location.pathname}?${params.toString()}`);
    }, 500);

    return () => clearTimeout(handler);
  }, [value]);

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
    </div>
  );
};

export default SearchField;
