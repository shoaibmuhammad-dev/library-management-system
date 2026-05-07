import BookInfo from "./BookInfo";
import BookSummary from "./BookSummary";
import { useNavigate, useParams } from "react-router-dom";
import { useGetBookByIdQuery } from "../../services/books/books.service";
import BackButton from "../../components/Global/BackButton";
import Loader from "../Global/Loader";
import { useEffect } from "react";

const BookDetails = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const { data, error, isError, isLoading, refetch } = useGetBookByIdQuery(
    bookId,
    {
      refetchOnFocus: false,
    }
  );

  useEffect(() => {
    refetch();
  }, []);

  const handleNavigateBack = () => navigate(-1);

  if (isLoading) return <Loader />;

  if (error || isError) {
    return (
      <div className="w-full h-screen flex justify-center text-center pt-10">
        <h2>Something went wrong.</h2>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen">
      <div className="w-full">
        <BackButton onclick={handleNavigateBack} />
      </div>

      <BookInfo book={data?.data} />
      <BookSummary book={data?.data} />
    </div>
  );
};

export default BookDetails;
