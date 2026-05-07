import { IoBookOutline } from "react-icons/io5";
import { IoCalendarClearOutline } from "react-icons/io5";
import { formateDate } from "../../utils/formateDate";

const BookCard = ({ book }) => {
  return (
    <div
      key={book?._id}
      className="w-full relative bg-[#12141D] flex flex-col items-start gap-2 p-4 rounded-[10px]"
    >
      <div className="w-full rounded-[10px] p-4 bg-[#090c15]">
        <img
          src={book?.book?.bookCoverImage}
          width={144}
          height={199}
          alt="dan-brown-book-image"
          className="object-contain lg:w-[179px] mx-auto 2xl:w-[159px]"
        />
      </div>
      <h3 className="font-semibold mt-3 mb-1">
        {book?.book?.bookTitle} - By {book?.book?.author}
      </h3>
      <p className="text-sm text-gray-400 font-medium">Thriller / Mystery</p>
      {book?.status === "pending" ? (
        "Request is pending"
      ) : (
        <p className="text-sm text-gray-400 font-medium flex items-center gap-1">
          <IoBookOutline />
          <span>Borrowed on {formateDate(book?.borrowedDate)}</span>
        </p>
      )}
      {/* <p className="text-sm text-gray-400 font-medium flex items-center gap-1">
        <IoCalendarClearOutline />
        <span>04 days left to due</span>
      </p> */}
    </div>
  );
};

export default BookCard;
