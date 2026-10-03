import { useEffect, useRef, useState } from "react";
import { useUpdateRequestStatusMutation } from "../../services/requests/requestApi";
import { enqueueSnackbar } from "notistack";
import { getStatusStyle } from "../../utils/getStatusSatyle";
import PageLoader from "../Global/PageLoader";
import { createPortal } from "react-dom";
import { IoMdArrowDropdown } from "react-icons/io";

const REQUESTS_STATUS = [
  { title: "Pending", value: "pending" },
  { title: "Accept", value: "borrowed" },
  { title: "Returned", value: "returned" },
  { title: "Late Return", value: "late-return" },
  { title: "Reject", value: "rejected" },
];

const StatusDropdown = ({ defaultValue, requestId, currentStatus }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [updateStatus, { isLoading }] = useUpdateRequestStatusMutation();

  const handleToggleDropdown = () => {
    if (currentStatus === "cancelled") {
      enqueueSnackbar("This request has been cancelled by the student.", {
        variant: "error",
      });

      return;
    }

    setOpen((prev) => !prev);
  };

  const handleSelect = async (status) => {
    setOpen(false);

    try {
      await updateStatus({ requestId, status }).unwrap();
      enqueueSnackbar("Request status has been updated", {
        variant: "success",
      });

      console.log("Status updated");
    } catch (error) {}
  };

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

  const formattedStatus =
    defaultValue.charAt(0).toUpperCase() + defaultValue.slice(1);

  return (
    <>
      <div className="relative inline-block text-left">
        <button
          onClick={() => handleToggleDropdown()}
          className={`px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-0.5 ${getStatusStyle(
            defaultValue,
          )}`}
        >
          {formattedStatus === "Borrowed" ? "Accepted" : formattedStatus}{" "}
          <IoMdArrowDropdown size={18} />
        </button>

        {open && (
          <div
            ref={dropdownRef}
            className="absolute mt-2 w-32 bg-white border rounded-lg shadow-lg z-50 py-3"
          >
            {REQUESTS_STATUS.map((status) => (
              <div
                key={status.value}
                onClick={() => handleSelect(status.value)}
                className={`cursor-pointer px-3 py-2 text-xs bg-white`}
              >
                <span
                  className={`${getStatusStyle(status?.value)} px-2 py-1 rounded-full font-medium`}
                >
                  {status.title}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      {isLoading && <Loader />}
    </>
  );
};

export default StatusDropdown;

const Loader = () => {
  return createPortal(
    <main className="w-full min-h-screen z-50 absolute inset-0 bg-[rgba(0,0,0,0.2)]">
      <PageLoader />
    </main>,
    document.body,
  );
};
