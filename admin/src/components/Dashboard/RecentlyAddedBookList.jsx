import { Link } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { IoCalendarOutline } from "react-icons/io5";
import { useGetBooksQuery } from "../../services/books/books.service";
import { formatDate } from "../../utils/formatDate";
import { GoDotFill } from "react-icons/go";

const RecentlyAddedBookList = () => {
  const { data, error, isError, isLoading, refetch } = useGetBooksQuery(
    { search: "", limit: 6 },
    {
      refetchOnFocus: true,
    },
  );

  if (isError || error) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[40vh] gap-7">
        <div className="text-center w-full">
          <p className="secondary-text text-sm mt-3">Something went wrong.</p>
        </div>
      </div>
    );
  }

  console.log("books >> ", data);

  return (
    <div className="w-full bg-white p-5 rounded-xl">
      <div className="w-full flex items-center justify-between mb-5">
        <h2 className="text-[20px] font-semibold">Recently Added Books</h2>
        <Link
          to={"/books?filter=recent"}
          className="text-[#25388C] bg-[#25388C]/10 text-sm font-semibold px-3 py-2 rounded-lg"
        >
          View all
        </Link>
      </div>

      <Link
        to={`/books/add-book`}
        className="w-full bg-[#F8F8FF] p-4 rounded-xl flex items-center justify-start gap-3"
      >
        <div className="rounded-full bg-white w-[48px] h-[48px] flex items-center justify-center">
          <GoPlus className="text-2xl" />
        </div>
        <span className="text-lg font-medium">Add New Book</span>
      </Link>

      {data && data?.data?.books?.length === 0 && (
        <div className="w-full flex flex-col items-center justify-center px-4 gap-5 min-h-[40vh]">
          <img
            src="/book-requests-placeholder.png"
            alt="book-requests-placeholder"
            width={193}
            height={144}
            className=""
          />

          <div className="w-full text-center px-4">
            <h3 className="font-semibold leading-none">No books added yet.</h3>
            <p className="text-sm secondary-text mt-3 lg:w-2/3 mx-auto">
              You haven’t added any books to your library. Start by adding your
              first book to see it listed here.
            </p>
          </div>
        </div>
      )}

      {data && data?.data?.books?.length > 0 && (
        <div className="w-full mt-5 flex flex-col items-start min-h-[60vh]">
          {data &&
            data?.data?.books?.map((book, i) => {
              return (
                <div
                  key={i}
                  className="w-full flex items-start justify-between bg-[#ffff] p-4 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={book?.bookImages[0]}
                      alt="inside-evil-book"
                      className="w-[55px] h-[76px] rounded-md"
                    />
                    <div className="flex flex-col items-start gap-1.5">
                      <Link to={`/books/${book?._id}`}>
                        <h3 className="font-semibold">{book?.bookTitle}</h3>
                      </Link>
                      <div className="flex items-center gap-2">
                        <p className="text-sm secondary-text">
                          By {book?.author}
                        </p>
                        <GoDotFill className="text-gray-300 text-sm" />

                        <p className="text-sm secondary-text">{book?.genre}</p>
                      </div>

                      <div className="w-full flex items-center gap-5">
                        <div className="flex items-center gap-1">
                          <IoCalendarOutline className="secondary-text text-[16px]" />
                          <p className="text-sm secondary-text">
                            {formatDate(book?.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default RecentlyAddedBookList;
