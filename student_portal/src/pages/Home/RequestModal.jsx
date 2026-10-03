import Modal from "../../components/common/Modal";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import { useRequestBookMutation } from "../../services/bookApi";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

const getLocalDate = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const RequestModal = ({ bookDetails, isModalOpen, setIsModalOpen }) => {
  const [dates, setDates] = useState({
    startDate: "",
    endDate: "",
  });

  const [requestBook, { isLoading }] = useRequestBookMutation();

  const today = getLocalDate();

  const handleDateChange = (e) => {
    const { name, value } = e.target;

    setDates((prev) => {
      const updatedDates = {
        ...prev,
        [name]: value,
      };

      // If start date is moved after the current return date,
      // clear the return date because it is no longer valid.
      if (
        name === "startDate" &&
        prev.endDate &&
        value &&
        prev.endDate < value
      ) {
        updatedDates.endDate = "";
      }

      return updatedDates;
    });
  };

  const validateDates = () => {
    const { startDate, endDate } = dates;

    // Required fields
    if (!startDate || !endDate) {
      enqueueSnackbar("Please select both start and return dates.", {
        variant: "warning",
      });

      return false;
    }

    // Start date cannot be before today
    if (startDate < today) {
      enqueueSnackbar("Start date cannot be a past date.", {
        variant: "warning",
      });

      return false;
    }

    // Return date cannot be before start date
    if (endDate < startDate) {
      enqueueSnackbar("Return date cannot be before the start date.", {
        variant: "warning",
      });

      return false;
    }

    // Make sure the dates are actually valid Date values
    const start = new Date(`${startDate}T00:00:00`);
    const end = new Date(`${endDate}T00:00:00`);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      enqueueSnackbar("Please select valid dates.", {
        variant: "warning",
      });

      return false;
    }

    return true;
  };

  const handleBorrowBookRequest = async () => {
    if (isLoading) return;

    const bookId = bookDetails?._id;

    if (!bookId) {
      enqueueSnackbar("Book information is missing.", {
        variant: "error",
      });

      return;
    }

    // Check availability before submitting
    if (!bookDetails?.availableBooks || bookDetails.availableBooks <= 0) {
      enqueueSnackbar("This book is currently unavailable.", {
        variant: "warning",
      });

      return;
    }

    if (!validateDates()) {
      return;
    }

    try {
      await requestBook({
        bookId,
        payload: {
          startDate: dates.startDate,
          endDate: dates.endDate,
        },
      }).unwrap();

      enqueueSnackbar("Borrow request submitted successfully!", {
        variant: "success",
      });

      setDates({
        startDate: "",
        endDate: "",
      });

      setIsModalOpen(false);
    } catch (error) {
      console.error("Borrow request error:", error);

      enqueueSnackbar(
        error?.data?.message ||
          error?.error ||
          "Failed to submit borrow request. Please try again.",
        {
          variant: "error",
        },
      );
    }
  };

  const handleClose = () => {
    if (isLoading) return;

    setDates({
      startDate: "",
      endDate: "",
    });

    setIsModalOpen(false);
  };

  return (
    <>
      <button
        type="button"
        disabled={
          !bookDetails?._id ||
          !bookDetails?.availableBooks ||
          bookDetails.availableBooks <= 0 ||
          isLoading
        }
        onClick={() => setIsModalOpen(true)}
        className="orangeBg rounded-md px-5 py-3 font-semibold text-black text-sm lg:text-lg mt-3 disabled:opacity-65"
      >
        Borrow Book Request
      </button>

      <Modal isOpen={isModalOpen} onClose={handleClose} title={null} size="lg">
        <div className="text-white flex flex-col items-center gap-4 text-center px-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center bg-[#090c15]">
            <VscGitPullRequestNewChanges size={34} className="text-gray-400" />
          </div>

          <h3 className="text-xl font-semibold">Request to Borrow Book</h3>

          <p className="text-gray-400 max-w-md">
            You are about to submit a request to borrow{" "}
            <span className="text-white font-semibold">
              "{bookDetails?.bookTitle || "this book"}"
            </span>
            . Your request will be sent to the library admin for approval.
          </p>

          <p className="text-base text-gray-400 max-w-sm leading-[1.35]">
            Please choose a start and return date and confirm that you want to
            submit this request.
          </p>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
            {/* Start Date */}
            <div className="w-full flex flex-col items-start gap-1">
              <label htmlFor="startDate" className="text-sm font-medium">
                Start Date
              </label>

              <input
                type="date"
                name="startDate"
                id="startDate"
                value={dates.startDate}
                onChange={handleDateChange}
                min={today}
                disabled={isLoading}
                className="w-full bg-[#090c15] p-3 rounded-md text-sm outline-none text-neutral-300 disabled:opacity-65"
              />
            </div>

            {/* Return Date */}
            <div className="w-full flex flex-col items-start gap-1">
              <label htmlFor="endDate" className="text-sm font-medium">
                Return Date
              </label>

              <input
                type="date"
                name="endDate"
                id="endDate"
                value={dates.endDate}
                onChange={handleDateChange}
                min={dates.startDate || today}
                disabled={!dates.startDate || isLoading}
                className="w-full bg-[#090c15] p-3 rounded-md text-sm outline-none text-neutral-300 disabled:opacity-65"
              />
            </div>
          </div>

          <div className="mt-1 flex justify-center gap-4">
            <button
              type="button"
              disabled={isLoading}
              className="bg-gray-500 rounded-md px-7 py-2 font-semibold text-black text-sm lg:text-base disabled:opacity-65"
              onClick={handleClose}
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={isLoading}
              onClick={handleBorrowBookRequest}
              className="orangeBg rounded-md px-7 py-2 font-semibold text-black text-sm lg:text-base disabled:opacity-65"
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RequestModal;
