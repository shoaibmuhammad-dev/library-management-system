import { useSearchParams } from "react-router-dom";

const BookCard = ({ book }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (book) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("book", JSON.stringify(book));
      return params;
    });
  };
  return (
    <div className="w-full relative mx-auto" onClick={() => handleClick(book)}>
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
      <p className="text-sm text-gray-400 font-medium">{book?.genre}</p>
    </div>
  );
};

export default BookCard;
