import React from "react";
import { Link } from "react-router-dom";
import { useGetUsersQuery } from "../../services/users/authApi";

const AccountsRequestedList = () => {
  const { data, isError, isLoading, refetch } = useGetUsersQuery(
    {
      status: "pending",
      limit: 6,
    },
    {
      refetchOnFocus: true,
    },
  );

  if (isError) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[40vh] gap-7">
        <div className="text-center w-full">
          <p className="secondary-text text-sm mt-3">Something went wrong.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white p-5 rounded-xl">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-[20px] font-semibold">Account Requests</h2>
        <Link
          to={"/account-requests"}
          className="text-[#25388C] bg-[#25388C]/10 text-sm font-semibold px-3 py-2 rounded-lg"
        >
          View all
        </Link>
      </div>
      {data && data?.data?.length > 0 ? (
        <div className="w-full mt-5 min-h-[40vh] grid grid-cols-2 lg:grid-cols-3 gap-5">
          {data &&
            data?.data.map((user, i) => {
              return (
                <div
                  className="w-full bg-[#F8F8FF] flex flex-col items-center justify-center gap-2 text-center rounded-xl p-5 max-h-[140px]"
                  key={i}
                >
                  <img
                    src="/profile01.png"
                    alt="profile"
                    className="w-[48px] h-[48] rounded-full"
                  />

                  <div className="w-full">
                    <p className="font-medium leading-none">
                      {user?.firstName + " " + user?.lastName}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center min-h-[40vh] gap-7">
          <img
            src="/account-requests-placeholder.png"
            alt="account-requests-placeholder"
            width={193}
            height={144}
          />

          <div className="text-center w-full">
            <h3 className="font-semibold leading-none text-[#1E293B]">
              No Pending Account Requests
            </h3>
            <p className="secondary-text text-sm mt-3">
              There are currently no account requests awaiting approval.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountsRequestedList;
