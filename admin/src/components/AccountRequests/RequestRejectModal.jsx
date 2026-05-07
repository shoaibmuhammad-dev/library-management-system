import { IoClose } from "react-icons/io5";

const RequestRejectModal = ({ isOpen, onclick, onclose, isLoading }) => {
  return (
    isOpen && (
      <div
        className={`w-full h-screen z-[1000000] bg-[rgba(0,0,0,0.4)] flex items-center justify-center absolute inset-0`}
      >
        <div className="w-full max-w-[470px] rounded-xl px-10 py-6 relative bg-white flex flex-col items-center justify-center text-center gap-3">
          <button
            type="button"
            className="absolute top-5 right-5"
            onClick={() => onclose()}
          >
            <IoClose className="text-2xl" />
          </button>
          <div
            className={`w-[80px] h-[80px] rounded-full bg-[#4C7B62] flex items-center justify-center`}
            style={{ border: "10px solid #84ad97" }}
          >
            <img
              src="/info-circle.png"
              alt="info circle"
              className="w-[30px] h-[30px]"
            />
          </div>

          <h2 className="text-[20px] font-semibold leading-none mt-2">
            Approve Account Request
          </h2>
          <p className="secondary-text mb-2">
            Approve the student’s account request and grant access. A
            confirmation email will be sent upon approval.
          </p>

          <button
            type="button"
            onClick={() => onclick()}
            className="bg-[#4C7B62] text-white rounded-xl text-center w-full py-3 font-semibold"
          >
            {isLoading ? "Loading..." : "Approve & Send Confirmation"}
          </button>
        </div>
      </div>
    )
  );
};

export default RequestRejectModal;
