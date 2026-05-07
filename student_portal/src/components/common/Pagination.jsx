import { Link } from "react-router-dom";

const Pagination = () => {
  return (
    <div className="w-full my-5">
      <div aria-label="Page navigation example">
        <ul className="flex items-center justify-end w-full -space-x-px h-10 text-base">
          <li>
            <Link
              to={`#`}
              className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-[#232839] border-e-0 border-gray-300 rounded-s-lg"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </Link>
          </li>
          <li>
            <Link
              to={`#`}
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 orangeBg border-gray-300"
            >
              1
            </Link>
          </li>
          <li>
            <Link
              to={`#`}
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-[#232839] border-gray-300"
            >
              2
            </Link>
          </li>
          <li>
            <a
              to={`#`}
              aria-current="page"
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-[#232839] border-gray-300"
            >
              3
            </a>
          </li>
          <li>
            <Link
              to={`#`}
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-[#232839] border-gray-300"
            >
              4
            </Link>
          </li>
          <li>
            <Link
              to={`#`}
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-[#232839] border-gray-300"
            >
              5
            </Link>
          </li>
          <li>
            <Link
              to={`#`}
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-[#232839] border-gray-300 rounded-e-lg"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
