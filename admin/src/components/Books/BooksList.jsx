import { GoTrash } from "react-icons/go";
import { RiEditLine } from "react-icons/ri";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from "../../services/books/books.service";
import PageLoader from "../Global/PageLoader";
import { formatDate } from "../../utils/formatDate";
import ErrorPage from "../Global/ErrorPage";
import { enqueueSnackbar } from "notistack";
import RequestLoader from "../Global/RequestLoader";
import { useState } from "react";
import DeleteBookModal from "./DeleteBookModal";
import Pagination from "../../components/Global/Pagination";

const BooksList = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;
  const navigate = useNavigate();
  const [openDeleteBookModal, setOpenDeleteBookModal] = useState(false);
  const [bookId, setBookId] = useState(null);

  const { data, error, isLoading, refetch } = useGetBooksQuery(
    { search: searchTerm, limit: 12, page },
    {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    },
  );
  const pagination = data?.data?.pagination;
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  const handleDeleteBook = async () => {
    if (!bookId) return;
    try {
      await deleteBook(bookId).unwrap();
      enqueueSnackbar("Book deleted successfully!", { variant: "success" });
      refetch();
      setOpenDeleteBookModal(false);
      setBookId(null);
    } catch (error) {}
  };

  if (error) return <ErrorPage />;

  if (isDeleting) return <RequestLoader />;

  return (
    <div className="w-full bg-white rounded-xl p-6 min-h-screen">
      <div className="w-full flex items-center justify-between">
        <h2 className="section-heading">All Books</h2>
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/books/add-book"
            className="text-sm font-medium text-white primary-bg px-3 py-2 rounded-lg"
          >
            + Add New Book
          </Link>
        </div>
      </div>

      {isLoading ? (
        <PageLoader />
      ) : (
        <>
          {data?.data?.books?.length > 0 ? (
            <div className="relative overflow-x-auto my-5 min-h-screen">
              <table className="w-full text-sm text-left rtl:text-righ">
                <thead className="text-sm text-[#3A354E] bg-[#F8F8FF]">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Author
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Genre
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Date Created
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.books?.map((book, index) => (
                    <tr
                      className="bg-white border-b border-gray-200"
                      key={index}
                    >
                      <td
                        scope="row"
                        onClick={() => navigate(`/books/${book?._id}`)}
                        className="px-6 py-4 font-medium whitespace-nowrap flex items-center gap-2 max-w-[300px] cursor-pointer"
                      >
                        <img
                          src={book?.bookCoverImage}
                          alt="book01"
                          className="max-w-[29px] object-contain rounded"
                        />
                        <span className="text-wrap">{book?.bookTitle}</span>
                      </td>
                      <td className="px-6 py-4">{book?.author}</td>
                      <td className="px-6 py-4">{book?.genre}</td>
                      <td className="px-6 py-4">
                        {formatDate(book?.createdAt, { month: "long" })}
                      </td>
                      <td className="px-6 text-center flex gap-3">
                        <button
                          type="button"
                          onClick={() => navigate(`/books/edit/${book?._id}`)}
                        >
                          <RiEditLine className="text-[17px] text-blue-500 lg:text-xl" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setOpenDeleteBookModal(true);
                            setBookId(book?._id);
                          }}
                        >
                          <GoTrash className="text-base text-red-500 lg:text-lg" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center justify-center px-4 gap-5 min-h-[80vh]">
              <img
                src="/book-requests-placeholder.png"
                alt="book-requests-placeholder"
                width={193}
                height={144}
                className=""
              />

              <div className="w-full text-center px-4">
                <h3 className="font-semibold leading-none">
                  No books added yet.
                </h3>
                <p className="text-sm secondary-text mt-3 lg:w-2/3 mx-auto">
                  You haven’t added any books to your library. Start by adding
                  your first book to see it listed here.
                </p>
              </div>
            </div>
          )}
        </>
      )}

      <Pagination pagination={pagination} />

      <DeleteBookModal
        isOpen={openDeleteBookModal}
        onclick={handleDeleteBook}
        isLoading={isDeleting}
        onclose={() => setOpenDeleteBookModal(false)}
      />
    </div>
  );
};

export default BooksList;
