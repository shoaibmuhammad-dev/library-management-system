import React from "react";
import Header from "./Header";
import Listing from "./Listing";
import { useGetBooksQuery } from "../../services/bookApi";
import PageLoader from "../../components/common/PageLoader";

const HomePage = () => {
  const page = 1;
  const limit = 10;
  const { data, isLoading, isError, error } = useGetBooksQuery(
    {
      page,
      limit,
      search: "",
    },
    {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    },
  );

  const books = data?.data?.books;
  const pagination = data?.data?.pagination;

  if (isLoading) return <PageLoader />;

  if (!books?.length) {
    return (
      <main className="w-full min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <img
          src="/no-books-placeholder.png"
          alt="no-books-placeholder"
          width={150}
          height={150}
        />
        <p className="text-[24px] font-semibold">We couldn't find any books!</p>
      </main>
    );
  }

  return (
    <React.Fragment>
      <Header books={books} />
      {books?.length > 0 && <Listing books={books} />}
    </React.Fragment>
  );
};

export default HomePage;
