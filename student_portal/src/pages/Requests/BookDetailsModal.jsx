import { useState } from "react";
import Modal from "../../components/common/Modal";
import { GiCancel } from "react-icons/gi";
import { useCancelRequestMutation } from "../../services/requestApi";

const BookDetailsModal = ({ requestId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [cancelRequest, { isLoading: isCancelling }] =
    useCancelRequestMutation();

  const handleCancelRequest = async (requestId) => {
    try {
      await cancelRequest(requestId).unwrap();

      enqueueSnackbar("Request cancelled successfully!", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(error?.data?.message || "Failed to cancel request.", {
        variant: "error",
      });
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="text-red-500"
      >
        Cancel Request
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={null}
        size="lg"
      >
        <div className="text-white flex flex-col items-center gap-4 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center bg-[#090c15]">
            <GiCancel size={34} className="text-red-300" />
          </div>

          <h3 className="text-xl font-semibold">Cancel Request</h3>

          <p className="text-base text-gray-400 max-w-sm leading-[1.35]">
            Are you sure you want to cancel the request?
          </p>

          <div className="mt-1 flex justify-center gap-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-500 rounded-md px-7 py-2 font-semibold text-black text-sm lg:text-base"
            >
              No
            </button>

            <button
              type="button"
              onClick={() => handleCancelRequest(requestId)}
              className="orangeBg rounded-md px-7 py-2 font-semibold text-black text-sm lg:text-base disabled:opacity-65"
            >
              {isCancelling ? "Cancelling..." : "Yes"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BookDetailsModal;
