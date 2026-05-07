import { formatDate } from "../../utils/formatDate";
import StatusDropdown from "./StatusDropdown";
import StatusFilter from "./StatusFilter";

const RequestTable = ({ requests }) => {
  return (
    <div className="relative overflow-visible my-5 min-h-screen">
      <table className="w-full text-sm text-left rtl:text-righ">
        <thead className="text-xs text-[#3A354E] bg-[#F8F8FF]">
          <tr>
            <th scope="col" className="px-6 py-4">
              Book
            </th>
            <th scope="col" className="px-6 py-4">
              User Requested
            </th>
            <th scope="col" className="px-6 py-4">
              <StatusFilter />
            </th>
            <th scope="col" className="px-6 py-4">
              Request Date
            </th>
            <th scope="col" className="px-6 py-4">
              Borrowed Date
            </th>
            <th scope="col" className="px-6 py-4">
              Return Date
            </th>
          </tr>
        </thead>
        <tbody>
          {requests?.length > 0 ? (
            requests.map((req, index) => (
              <tr className="bg-white border-b border-gray-200" key={index}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap flex items-center gap-2"
                >
                  <img
                    src={req?.book?.bookCoverImage}
                    alt="book01"
                    className="w-auto max-h-[40px]"
                  />
                  <div>
                    <span>{req?.book?.bookTitle}</span>
                  </div>
                </th>

                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {req?.user?.firstName + " " + req?.user?.lastName}
                    </span>
                    <span className="secondary-text">{req?.user?.email}</span>
                  </div>
                </td>

                <td className="px-6 py-4 relative">
                  <StatusDropdown
                    requestId={req?._id}
                    defaultValue={req?.status}
                  />
                </td>

                <td className="px-6 py-4">
                  {req?.createdAt ? formatDate(req?.createdAt) : "N/A"}
                </td>

                <td className="px-6 py-4">
                  {req?.borrowedDate ? formatDate(req?.borrowedDate) : "N/A"}
                </td>

                <td className="px-6 py-4">
                  {req?.returnDate ? formatDate(req?.returnDate) : "N/A"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="text-center py-12 text-gray-500 font-medium"
              >
                No matching requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RequestTable;
