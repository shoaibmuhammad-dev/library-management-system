import { useSearchParams } from "react-router-dom";
import { useGetRequestsQuery } from "../../services/requests/requestApi";
import ErrorPage from "../Global/ErrorPage";
import PageLoader from "../Global/PageLoader";
import RequestTable from "./RequestTable";
import Pagination from "../../components/Global/Pagination";
import ListPlaceholder from "./ListPlaceholder";

const BorrowRequestList = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading, isError, refetch } = useGetRequestsQuery({
    search: search,
    page: page,
    limit: 20,
    skip: 0,
    status,
  });

  const requests = data?.data;
  const pagination = data?.pagination;

  const isFiltered = search || status;

  if (isLoading) return <PageLoader />;

  if (isError) return <ErrorPage refetch={refetch} />;

  return (
    <div className="w-full bg-white rounded-xl p-6 min-h-screen">
      <div className="w-full flex items-center justify-between">
        <h2 className="section-heading">Borrow Book Requests</h2>
        <div className="flex items-center justify-between gap-4">
          {requests?.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="secondary-text text-sm">Oldest to Recent</span>
              <img
                src="/arrow-swap.png"
                alt="filter icon"
                className="w-[16px] h-[16px]"
              />
            </div>
          )}
        </div>
      </div>
      {requests?.length > 0 || isFiltered ? (
        <RequestTable requests={requests || []} />
      ) : (
        <ListPlaceholder />
      )}

      <Pagination pagination={pagination} />
    </div>
  );
};

export default BorrowRequestList;
