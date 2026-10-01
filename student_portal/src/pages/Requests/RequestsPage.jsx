import { useState } from "react";
import RequestsTable from "./RequestsTable";
import { useGetRequestsQuery } from "../../services/requestApi";
import PageLoader from "../../components/common/PageLoader";
import Pagination from "../../components/common/Pagination";
import Tabs from "./Tabs";

const RequestsPage = () => {
  const [status, setStatus] = useState("all");
  const page = 1;
  const limit = 10;
  const search = "";

  const { data, isLoading, isFetching, isError } = useGetRequestsQuery(
    {
      page,
      limit,
      status: status === "all" ? "" : status,
      search,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  if (isError) return;

  const handleChangeStatus = (status) => {
    setStatus(status);
  };

  const requests = data?.data;
  const pagination = data?.pagination;

  return (
    <main className="w-full max-w-7xl mx-auto padding-x py-16 min-h-screen flex flex-col items-start justify-between">
      <div className="w-full relative">
        <div className="w-full flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold">My Requests</h1>
          <Tabs
            status={status}
            setStatus={setStatus}
            handleChangeTab={handleChangeStatus}
          />
        </div>

        {isLoading || isFetching ? (
          <PageLoader />
        ) : (
          <div className="w-full">
            {requests?.length > 0 ? (
              <RequestsTable requests={requests} />
            ) : (
              <div className="w-full text-center min-h-[60vh] flex items-center justify-center">
                <p className="">No requetss found!</p>
              </div>
            )}

            {pagination && pagination?.total > 10 && (
              <Pagination pagination={pagination} />
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default RequestsPage;
