import { useGetBorrowedBooksQuery } from "../../services/bookApi";
import BookCard from "./BookCard";

const BorrowdBookList = () => {
  const { data, isLoading, isError } = useGetBorrowedBooksQuery(undefined);
  if (isError) return;
  return (
    <div className="w-full">
      <h2 className="secondary-text font-semibold text-[32px]">
        Borrowed Books
      </h2>

      {data && data?.length > 0 ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 2xl:gap-10 mt-10 2xl:mt-14">
          {data?.map((book) => {
            return <BookCard book={book} />;
          })}
        </div>
      ) : (
        <div className="w-full pt-3">
          <p className="secondary-text">You have not borrowed a book yet.</p>
        </div>
      )}
    </div>
  );
};

export default BorrowdBookList;
