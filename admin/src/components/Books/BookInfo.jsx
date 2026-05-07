import { IoCalendarOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { formatDate } from "../../utils/formatDate";
import { Link } from "react-router-dom";

const BookInfo = ({ book }) => {
  return (
    <div className="w-full mt-5 flex items-start gap-5 bg-white p-5 rounded-xl">
      <div className="w-[240px] h-[230px] rounded-xl bg-gray-50 flex items-center justify-center">
        <img
          src={book?.bookCoverImage}
          alt="book"
          className="w-[125px] h-[174px] object-cover rounded-lg"
        />
      </div>

      <div className="flex flex-col items-start justify-between gap-4 w-full">
        <div className="w-full flex items-center gap-2">
          <p className="secondary-text text-sm lg:text-lg">Created at:</p>
          <div className="flex items-center gap-1">
            <IoCalendarOutline className="secondary-text text-base lg:text-xl" />
            <span className="secondary-text text-base lg:text-lg">
              {formatDate(book?.createdAt, { month: "long" })}
            </span>
          </div>
        </div>
        <h3 className="text-[24px] font-semibold">{book?.bookTitle}</h3>
        <h4 className="text-lg font-semibold">By {book?.author}</h4>
        <p className="secondary-text text-sm lg:text-base">{book?.genre}</p>

        <Link
          to={`/books/edit/${book?._id}`}
          className="primary-bg text-white py-2 text-sm flex items-center justify-center gap-2 font-bold rounded-lg w-full lg:w-[422px] h-[44px]"
        >
          <CiEdit className="text-xl" /> Edit Book
        </Link>
      </div>
    </div>
  );
};

export default BookInfo;
