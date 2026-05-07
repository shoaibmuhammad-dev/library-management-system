import { IoClose } from "react-icons/io5";

const DeleteBookModal = ({ isOpen, onclick, onclose, isLoading }) => {
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
            className={`w-[80px] h-[80px] rounded-full bg-[#F46F70] flex items-center justify-center`}
            style={{ border: "10px solid #fc8989" }}
          >
            <img
              src="/info-circle.png"
              alt="info circle"
              className="w-[30px] h-[30px]"
            />
          </div>

          <h2 className="text-[20px] font-semibold leading-none mt-2">
            Delete Book
          </h2>
          <p className="secondary-text mb-2">
            Are your sure you want to delete this book?
          </p>

          <button
            type="button"
            onClick={() => onclick()}
            className="bg-[#F46F70] text-white rounded-xl text-center w-full py-3 font-semibold outline-none"
          >
            {isLoading ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>
      </div>
    )
  );
};

export default DeleteBookModal;
