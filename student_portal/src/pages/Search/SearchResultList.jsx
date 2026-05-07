import { useSearchParams } from "react-router-dom";
import BookCard from "../../components/common/BookCard";
import Pagination from "../../components/common/Pagination";
import { useGetBooksQuery } from "../../services/bookApi";
import DepartmentFilter from "./DepartmentFilter";

const SearchResultList = () => {
  const page = 1;
  const limit = 10;
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const searchDepartment = searchParams.get("department") || "";

  const { data, isLoading, isError, error } = useGetBooksQuery(
    {
      page,
      limit,
      search: searchQuery,
      department: searchDepartment,
    },
    {
      // refetchOnFocus: true,
      // refetchOnMountOrArgChange: true,
    },
  );

  const books = data?.data?.books;
  const pagination = data?.data?.pagination;

  return (
    <section className="w-full relative padding-x py-10">
      <div className="w-full flex items-center justify-between gap-5 flex-wrap">
        {searchQuery ? (
          <h2 className="secondary-text font-semibold text-[32px]">
            Search Results
          </h2>
        ) : (
          <div></div>
        )}

        <DepartmentFilter />
      </div>

      {books?.length > 0 ? (
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-10 mt-10 lg:mt-14 pb-10">
          {books?.map((book, index) => {
            return <BookCard book={book} key={index} />;
          })}
        </div>
      ) : (
        <main className="w-full min-h-[60vh] pt-10 flex flex-col items-center justify-start gap-4 px-4">
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
      )}

      {books?.length > 11 && <Pagination />}
    </section>
  );
};

export default SearchResultList;
