const ListPlaceholder = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center px-4 gap-5 min-h-[80vh]">
      <img
        src="/book-requests-placeholder.png"
        alt="book-requests-placeholder"
        width={193}
        height={144}
        className=""
      />

      <div className="w-full text-center">
        <h3 className="font-semibold leading-none">No Pending Requests</h3>
        <p className="text-sm secondary-text mt-3">
          There are no borrow book requests awaiting your review at this time.
        </p>
      </div>
    </div>
  );
};

export default ListPlaceholder;
