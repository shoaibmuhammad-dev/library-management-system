import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useGetUsersQuery,
  useUpdateUserStatusMutation,
} from "../../services/users/authApi";
import { formatDate } from "../../utils/formatDate";
import PageLoader from "../Global/PageLoader";
import ErrorPage from "../Global/ErrorPage";
import UserCard from "./UserCard";
import { enqueueSnackbar } from "notistack";
import Pagination from "../Global/Pagination";
import Actions from "./Actions";
import ConfirmationModal from "./ConfirmationModal";
import { getStatusStyle } from "../../utils/getStatusSatyle";

const UserList = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const page = Number(searchParams.get("page") || 1);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [confirmationAction, setConfirmationAction] = useState(null);
  const [showUserCard, setShowUSerCard] = useState(false);
  const [user, setUser] = useState(null);

  const [updateUserStatus, { isLoading: isBlocking }] =
    useUpdateUserStatusMutation();

  const handleOpenConfirmation = (action, selectedUser) => {
    setUser(selectedUser);
    setConfirmationAction(action);
    setOpenDropdown(null);
  };

  const handleCloseConfirmation = () => {
    setConfirmationAction(null);
    setUser(null);
  };

  const handleToggleDropdown = (userId) => {
    setOpenDropdown((prev) => (prev === userId ? null : userId));
  };

  const { data, isError, isLoading, refetch } = useGetUsersQuery(
    {
      search: searchTerm,
      status: "",
      limit: 12,
      page,
    },
    {
      refetchOnFocus: false,
      refetchOnReconnect: true,
    },
  );

  if (isLoading) return <PageLoader />;

  if (isError) return <ErrorPage refetch={refetch} />;

  const users = data?.data;
  const pagination = data?.pagination;

  const handleUpdateUserStatus = async (userId, status) => {
    if (!userId || isBlocking) return;

    try {
      await updateUserStatus({
        userId,
        status,
      }).unwrap();

      const messages = {
        blocked: "User account has been blocked successfully.",
        suspended: "User account has been suspended successfully.",
        accepted: "User account has been activated successfully.",
      };

      enqueueSnackbar(messages[status] || "User status updated successfully.", {
        variant: "success",
      });

      handleCloseConfirmation();
    } catch (error) {
      console.error("Error updating user status:", error);

      enqueueSnackbar(
        error?.data?.message || error?.error || "Failed to update user status.",
        {
          variant: "error",
        },
      );
    }
  };

  return (
    <div className="w-full bg-white min-h-screen rounded-xl p-6">
      <div className="w-full flex items-center justify-between">
        <h2 className="section-heading">
          All Users {`(${data && pagination?.total})`}
        </h2>
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
                  University ID
                </th>
                <th scope="col" className="px-6 py-4">
                  Status
                </th>
                <th scope="col" className="px-6 py-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users?.map((user, index) => {
                  const statusStyle = getStatusStyle(user?.status);
                  return (
                    <tr
                      className="bg-white border-b border-gray-200"
                      key={index}
                    >
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
                          className={`w-[35px] h-[35px] rounded-full object-cover`}
                        />
                        <div className="flex flex-col items-start gap-1">
                          <span className="leading-none">
                            {user?.firstName + " " + user?.lastName}
                          </span>
                          <span className="leading-none secondary-text font-normal">
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
                        {user?.role.charAt(0).toUpperCase() +
                          user?.role.slice(1)}
                      </td>

                      <td className="px-6 py-4">{user?.booksBorrowedCount}</td>

                      <td className="px-6 py-4">{user?.idNumber}</td>

                      <td className={`px-6 py-4`}>
                        <span
                          className={`${statusStyle} px-3 py-1.5 font-medium text-xs rounded-full`}
                        >
                          {user?.status.slice(0, 1).toUpperCase() +
                            user?.status.slice(1)}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center relative">
                        <Actions
                          openDropdown={openDropdown}
                          setOpenDropdown={setOpenDropdown}
                          user={user}
                          setUser={setUser}
                          setShowUSerCard={setShowUSerCard}
                          handleToggleDropdown={handleToggleDropdown}
                          onAction={handleOpenConfirmation}
                        />
                      </td>
                    </tr>
                  );
                })}
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

      <ConfirmationModal
        isOpen={Boolean(confirmationAction)}
        onClose={handleCloseConfirmation}
        onConfirm={() => {
          const statusMap = {
            block: "blocked",
            unblock: "accepted",
            suspend: "suspended",
            unsuspend: "accepted",
          };

          const newStatus = statusMap[confirmationAction];

          if (newStatus) {
            handleUpdateUserStatus(user?._id, newStatus);
          }
        }}
        isLoading={isBlocking}
        title={
          {
            block: "Block User",
            unblock: "Unblock User",
            suspend: "Suspend User",
            unsuspend: "Unsuspend User",
          }[confirmationAction]
        }
        description={
          {
            block: `Are you sure you want to block ${user?.firstName} ${user?.lastName}?`,
            unblock: `Are you sure you want to unblock ${user?.firstName} ${user?.lastName}?`,
            suspend: `Are you sure you want to suspend ${user?.firstName} ${user?.lastName}?`,
            unsuspend: `Are you sure you want to unsuspend ${user?.firstName} ${user?.lastName}?`,
          }[confirmationAction]
        }
        confirmText={
          {
            block: "Yes, Block",
            unblock: "Yes, Unblock",
            suspend: "Yes, Suspend",
            unsuspend: "Yes, Unsuspend",
          }[confirmationAction]
        }
        loadingText={
          {
            block: "Blocking...",
            unblock: "Unblocking...",
            suspend: "Suspending...",
            unsuspend: "Unsuspending...",
          }[confirmationAction]
        }
      />
    </div>
  );
};

export default UserList;
