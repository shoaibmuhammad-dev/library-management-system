import { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useSearchParams } from "react-router-dom";

const REQUESTS_STATUS = [
  { title: "All", value: "" },
  { title: "Pending", value: "pending" },
  { title: "Borrowed", value: "borrowed" },
  { title: "Returned", value: "returned" },
  { title: "Late Return", value: "late-return" },
];

const StatusFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedStatusValue = searchParams.get("status") || "";
  const [selectedStatus, setSelectedStatus] = useState(selectedStatusValue);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = async (status) => {
    setSelectedStatus(status);
    setOpen(false);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (selectedStatus?.trim() === "") {
        searchParams.delete("status");
        setSearchParams(searchParams);
      } else {
        setSearchParams({ status: selectedStatus });
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [selectedStatus]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className={`px-3 py-1 rounded-full text-xs text-[#3A354E] flex items-center gap-2`}
      >
        <span>Status</span>
        <IoMdArrowDropdown size={18} />
      </button>

      {open && (
        <div
          ref={dropdownRef}
          className="absolute mt-2 w-32 bg-white border rounded-lg shadow-lg z-50 py-3"
        >
          {REQUESTS_STATUS?.map((status) => (
            <div
              key={status.value}
              onClick={() => handleSelect(status.value)}
              className={`cursor-pointer px-3 py-2 text-xs bg-white`}
            >
              <span className={`px-2 py-1 rounded-full font-medium`}>
                {status.title}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusFilter;
