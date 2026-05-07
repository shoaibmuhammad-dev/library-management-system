import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GoTrash } from "react-icons/go";
import {
  useDeleteUserAccountMutation,
  useGetUsersQuery,
} from "../../services/users/authApi";
import { formatDate } from "../../utils/formatDate";
import PageLoader from "../Global/PageLoader";
import ErrorPage from "../Global/ErrorPage";
import UserCard from "./UserCard";
import { enqueueSnackbar } from "notistack";
import RequestLoader from "../Global/RequestLoader";
import Pagination from "../Global/Pagination";

const UserList = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const [deleteUserAccount] = useDeleteUserAccountMutation();
  const [deletingUser, setDeletingUser] = useState(false);
  const page = Number(searchParams.get("page") || 1);

  const { data, isError, isLoading, refetch } = useGetUsersQuery(
    {
      search: searchTerm,
      status: "accepted",
      limit: 12,
      page,
    },
    {
      refetchOnFocus: false,
      refetchOnReconnect: true,
    },
  );
  const [showUserCard, setShowUSerCard] = useState(false);
  const [user, setUser] = useState(null);

  if (isLoading) return <PageLoader />;

  if (isError) return <ErrorPage refetch={refetch} />;

  const users = data?.data;
  const pagination = data?.pagination;

  const deleteUser = async (userId) => {
    if (!userId) return;
    setDeletingUser(true);
    try {
      await deleteUserAccount({ userId }).unwrap();

      enqueueSnackbar("User account deleted successfully.", {
        variant: "success",
      });
      refetch();
    } catch (error) {
      console.log("err while deleting user account. ", error);
    } finally {
      setDeletingUser(false);
    }
  };

  return (
    <div className="w-full bg-white min-h-screen rounded-xl p-6">
      <div className="w-full flex items-center justify-between">
        <h2 className="section-heading">All Users</h2>
      </div>

      {users && users?.length > 0 ? (
        <div className="relative overflow-x-auto my-5 min-h-screen">
          <table className="w-full text-sm text-left rtl:text-righ">
            <thead className="text-sm whitespace-nowrap text-[#3A354E] bg-[#F8F8FF]">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Name
                </th>
                <th scope="col" className="px-6 py-4">
                  Date Joined
                </th>
                <th scope="col" className="px-6 py-4">
                  Role
                </th>
                <th scope="col" className="px-6 py-4">
                  Books Borrowed
                </th>
                <th scope="col" className="px-6 py-4">
                  ID
                </th>
                <th scope="col" className="px-6 py-4">
                  ID Card
                </th>
                <th scope="col" className="px-6 py-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users?.map((user, index) => (
                  <tr className="bg-white border-b border-gray-200" key={index}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap flex items-center gap-2"
                    >
                      <img
                        src={
                          user?.profilePicture
                            ? user?.profilePicture
                            : "/user-profile-picture-placeholder.png"
                        }
                        alt="profile01"
                        className={`w-[40px] h-[40px] rounded-full object-cover`}
                      />
                      <div className="flex flex-col items-start">
                        <span>{user?.firstName + " " + user?.lastName}</span>
                        <span className="secondary-text font-normal">
                          {user?.email}
                        </span>
                      </div>
                    </th>
                    <td className="px-6 py-4">
                      <span className="whitespace-nowrap">
                        {formatDate(user?.createdAt)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
                    </td>
                    <td className="px-6 py-4">{user?.booksBorrowedCount}</td>
                    <td className="px-6 py-4">{user?.idNumber}</td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => {
                          setShowUSerCard((prev) => !prev);
                          setUser(user);
                        }}
                        className="text-blue-500 font-medium whitespace-nowrap"
                      >
                        View Card
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        type="button"
                        onClick={() => deleteUser(user?._id)}
                        className="outline-none"
                      >
                        <GoTrash className="text-base text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
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
              No Uers Found!
            </h3>
            <p className="secondary-text text-sm mt-3">
              There are currently no users.
            </p>
          </div>
        </div>
      )}

      <Pagination pagination={pagination} />

      {showUserCard && (
        <UserCard
          setShowUSerCard={setShowUSerCard}
          user={user}
          setUser={setUser}
        />
      )}

      {deletingUser && <RequestLoader />}
    </div>
  );
};

export default UserList;
