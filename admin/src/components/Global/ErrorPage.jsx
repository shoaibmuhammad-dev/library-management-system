const ErrorPage = ({ refetch }) => {
  return (
    <div className="w-full bg-white rounded-xl p-6">
      <div className="w-full flex flex-col items-center justify-center text-center min-h-screen px-4 gap-1">
        <p className="text-base text-gray-500">Something went wrong.</p>
        {refetch && (
          <button
            type="button"
            onClick={refetch}
            className="text-base underline font-medium"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
