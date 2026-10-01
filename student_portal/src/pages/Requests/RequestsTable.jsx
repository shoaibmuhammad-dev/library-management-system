import { formateDate } from "../../utils/formateDate";
import getStatusStyles from "../../utils/getStatusStyles";
import BookDetailsModal from "./BookDetailsModal";

const RequestsTable = ({ requests }) => {
  return (
    <div className="w-full overflow-x-auto mt-8">
      <table className="w-full min-w-[700px] text-left text-sm">
        <thead className="blueBg text-gray-100 rounded-lg">
          <tr>
            <th className="px-6 py-4 font-semibold">Book</th>
            <th className="px-6 py-4 font-semibold">Date Requested</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold">Updated At</th>
            <th className="px-6 py-4 font-semibold">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-700">
          {requests?.map((req) => {
            const status = getStatusStyles(req.status);
            return (
              <tr key={req._id} className="">
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-200">
                  <div className="inline-flex items-center gap-2">
                    <img
                      src={req?.book?.bookCoverImage}
                      alt={`${req?.book?.bookTitle} cover image`}
                      className="max-w-[40px] rounded"
                    />
                    <span>{req?.book?.bookTitle}</span>
                  </div>
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-gray-200">
                  {formateDate(req?.createdAt)}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${status.className}`}
                  >
                    {status.label}
                  </span>
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-gray-200">
                  {formateDate(req?.createdAt)}
                </td>

                <td className="px-6 py-4">
                  {req?.status === "pending" ? (
                    <BookDetailsModal requestId={req?._id} />
                  ) : (
                    "___"
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RequestsTable;
