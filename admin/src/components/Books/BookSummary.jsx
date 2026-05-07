const BookSummary = ({ book }) => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-5 mt-7 bg-white rounded-xl p-5">
      <div className="col-span-1 lg:col-span-2">
        <h3 className="font-semibold mb-4">Summary</h3>
        <p className="secondary-text">{book?.bookSummary}</p>
      </div>
      {/* <div className="col-span-1 lg:col-span-1">
        <iframe
          width="390"
          height="215"
          className="rounded-3xl"
          src="https://www.youtube.com/embed/tgbNymZ7vqY"
        ></iframe>
      </div> */}
    </div>
  );
};

export default BookSummary;
