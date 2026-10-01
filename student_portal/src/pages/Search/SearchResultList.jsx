import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/common/Pagination";
import { useGetBooksQuery } from "../../services/bookApi";
import DepartmentFilter from "./DepartmentFilter";
import PageLoader from "../../components/common/PageLoader";
import BookModal from "./BookModal";
import { useState } from "react";

const SearchResultList = () => {
  const limit = 12;
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchDepartment = searchParams.get("department") || "";
  const searchQuery = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;

  const handleClick = (book) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("book", JSON.stringify(book));
      return params;
    });
    setOpenDetailsModal(true);
  };

  const { data, isLoading, isFetching, isError, error } = useGetBooksQuery(
    {
      page,
      limit,
      search: searchQuery,
      department: searchDepartment,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const books = data?.data?.books;
  const pagination = data?.data?.pagination;

  return (
    <section className="w-full relative padding-x py-10">
      <div className="w-full flex items-center justify-between gap-5 flex-wrap">
        <DepartmentFilter />
      </div>

      {isLoading || isFetching ? (
        <PageLoader />
      ) : (
        <>
          {!books?.length ? (
            <main className="w-full py-20 flex flex-col items-center justify-center gap-4 px-4">
              <img
                src="/no-books-placeholder.png"
                alt="no-books-placeholder"
                width={150}
                height={150}
              />
              <p className="text-[24px] font-semibold">
                We couldn't find any books!
              </p>
            </main>
          ) : (
            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-10 mt-10 lg:mt-14 pb-10">
              {books?.map((book, index) => {
                return (
                  <div
                    key={book?._id}
                    className="w-full relative mx-auto cursor-pointer"
                    onClick={() => handleClick(book)}
                  >
                    <div className="w-full max-w-[80%] h-[150px]">
                      <img
                        src={book?.bookCoverImage}
                        alt={`${book?.bookTitle} cover`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <h3 className="font-semibold mt-3 mb-1 leading-[1.2]">
                      {book?.bookTitle} - By {book?.author}
                    </h3>
                    <p className="text-sm text-gray-400 font-medium">
                      {book?.genre}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {pagination && pagination?.totalPages > 1 && (
        <Pagination pagination={pagination} />
      )}

      {openDetailsModal && (
        <BookModal
          isModalOpen={openDetailsModal}
          setIsModalOpen={setOpenDetailsModal}
        />
      )}
    </section>
  );
};

export default SearchResultList;
