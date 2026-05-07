import List from "./List";
import { useSearchParams } from "react-router-dom";
import { useGetUsersQuery } from "../../services/users/authApi";
import PageLoader from "../Global/PageLoader";
import ErrorPage from "../Global/ErrorPage";
import { useState } from "react";
import Pagination from "../Global/Pagination";

const AccountRequestList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const status = searchParams.get("status") || "pending";
  const { data, isError, isLoading, refetch } = useGetUsersQuery(
    {
      search: searchTerm,
      status,
      limit: 10,
    },
    {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    },
  );

  const pagination = data?.pagination;

  const updateStatusInUrl = (status) => {
    const params = new URLSearchParams(searchParams);
    params.set("status", status);
    setSearchParams(params);
  };

  if (isLoading) return <PageLoader />;

  if (isError) return <ErrorPage />;
  return (
    <div className="w-full bg-white rounded-xl p-6">
      <div className="w-full flex items-center justify-between">
        <h2 className="section-heading">Account Registration Requests</h2>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => updateStatusInUrl("pending")}
              className="text-xs text-white bg-orange-500 rounded-md text-center w-full py-2 px-5 font-semibold"
            >
              Pending
            </button>

            <button
              type="button"
              onClick={() => updateStatusInUrl("rejected")}
              className="text-xs text-white bg-[#F46F70] rounded-md text-center w-full py-2 px-5 font-semibold"
            >
              Rejected
            </button>
          </div>
        </div>
      </div>

      {data && data?.data?.length > 0 ? (
        <List data={data} refetch={refetch} />
      ) : (
        <div className="w-full flex flex-col items-center justify-center min-h-[90vh] gap-7">
          <img
            src="/account-requests-placeholder.png"
            alt="account-requests-placeholder"
            width={193}
            height={144}
          />

          <div className="text-center w-full">
            <h3 className="font-semibold leading-none text-[#1E293B]">
              No {status.charAt(0).toUpperCase() + status.slice(1)} Account
              Requests
            </h3>
            <p className="secondary-text text-sm mt-3">
              There are currently no account requests awaiting approval.
            </p>
          </div>
        </div>
      )}

      <Pagination pagination={pagination} />
    </div>
  );
};

export default AccountRequestList;
