import BookCard from "../../components/common/BookCard";

const Listing = ({ books }) => {
  return (
    <section className="w-full relative padding-x py-10">
      <h2 className="secondary-text font-semibold text-[32px]">
        Popular Books
      </h2>

      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-10 mt-10 lg:mt-14 pb-10">
        {books?.map((book, index) => {
          return <BookCard book={book} key={index} />;
        })}
      </div>
    </section>
  );
};

export default Listing;
