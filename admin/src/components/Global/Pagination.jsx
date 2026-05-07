import { useSearchParams } from "react-router-dom";

const Pagination = ({ pagination }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const totalPages = pagination?.totalPages || 1;
  const currentPage = Number(searchParams.get("page") || 1);

  const updatePageInUrl = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;

    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    setSearchParams(params);
  };

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(currentPage - 2, 1);
    let end = Math.min(start + maxVisible - 1, totalPages);

    if (end - start < maxVisible - 1) {
      start = Math.max(end - maxVisible + 1, 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = getPageNumbers();

  const baseBtn =
    "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200";

  return (
    <div className="w-full flex items-center justify-end">
      <ul className="flex items-center gap-1.5">
        {/* Previous */}
        <li>
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => updatePageInUrl(currentPage - 1)}
            className={`${baseBtn} ${
              currentPage === 1
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-gray-300 hover:bg-[var(--primary-bg)] hover:text-white"
            }`}
          >
            Previous
          </button>
        </li>

        {/* First page */}
        {pages[0] > 1 && (
          <>
            <li>
              <button
                onClick={() => updatePageInUrl(1)}
                className={`${baseBtn} bg-gray-300 hover:bg-[var(--primary-bg)] hover:text-white`}
              >
                1
              </button>
            </li>
            {pages[0] > 2 && <li className="px-2">...</li>}
          </>
        )}

        {/* Middle Pages */}
        {pages.map((page) => (
          <li key={page}>
            <button
              onClick={() => updatePageInUrl(page)}
              className={`${baseBtn} ${
                page === currentPage
                  ? "bg-[var(--primary-bg)] text-white"
                  : "bg-gray-300 hover:bg-[var(--primary-bg)] hover:text-white"
              }`}
            >
              {page}
            </button>
          </li>
        ))}

        {/* Last page */}
        {pages[pages.length - 1] < totalPages && (
          <>
            {pages[pages.length - 1] < totalPages - 1 && (
              <li className="px-2">...</li>
            )}
            <li>
              <button
                onClick={() => updatePageInUrl(totalPages)}
                className={`${baseBtn} bg-gray-300 hover:bg-[var(--primary-bg)] hover:text-white`}
              >
                {totalPages}
              </button>
            </li>
          </>
        )}

        {/* Next */}
        <li>
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => updatePageInUrl(currentPage + 1)}
            className={`${baseBtn} ${
              currentPage === totalPages
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-gray-300 hover:bg-[var(--primary-bg)] hover:text-white"
            }`}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
