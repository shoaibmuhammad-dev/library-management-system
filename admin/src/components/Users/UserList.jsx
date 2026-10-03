import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useDeleteUserAccountMutation,
  useGetUsersQuery,
  useUpdateUserStatusMutation,
} from "../../services/users/authApi";
import { formatDate } from "../../utils/formatDate";
import PageLoader from "../Global/PageLoader";
import ErrorPage from "../Global/ErrorPage";
import UserCard from "./UserCard";
import { enqueueSnackbar } from "notistack";
import Pagination from "../Global/Pagination";
import { HiDotsVertical } from "react-icons/hi";
import Actions from "./Actions";
import ConfirmationModal from "./ConfirmationModal";

const UserList = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const [deleteUserAccount] = useDeleteUserAccountMutation();
  const [deletingUser, setDeletingUser] = useState(false);
  const page = Number(searchParams.get("page") || 1);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [blockUserModal, setBlockUserModal] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(null);

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

  const handleBlockUser = async (userId) => {
    if (!userId) return;

    try {
      console.log("Blocking user:", userId);

      await updateUserStatus({ userId, status: "blocked" }).unwrap();

      enqueueSnackbar("User account has been blocked successfully.", {
        variant: "success",
      });

      handleCloseConfirmation();
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  const handleSuspendUser = async (userId) => {
    if (!userId) return;

    try {
      console.log("Suspending user:", userId);

      await updateUserStatus({ userId, status: "suspended" }).unwrap();

      enqueueSnackbar("User account has been suspended successfully.", {
        variant: "success",
      });

      handleCloseConfirmation();
    } catch (error) {
      console.error("Error suspending user:", error);
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
                      {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
                    </td>
                    <td className="px-6 py-4">{user?.booksBorrowedCount}</td>
                    <td className="px-6 py-4">{user?.idNumber}</td>

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

      <ConfirmationModal
        isOpen={Boolean(confirmationAction)}
        onClose={handleCloseConfirmation}
        onConfirm={() => {
          if (confirmationAction === "block") {
            handleBlockUser(user?._id);
          }

          if (confirmationAction === "suspend") {
            handleSuspendUser(user?._id);
          }
        }}
        isLoading={false}
        title={confirmationAction === "block" ? "Block User" : "Suspend User"}
        description={
          confirmationAction === "block"
            ? `Are you sure you want to block ${user?.firstName} ${user?.lastName}?`
            : `Are you sure you want to suspend ${user?.firstName} ${user?.lastName}?`
        }
        confirmText={
          confirmationAction === "block" ? "Yes, Block" : "Yes, Suspend"
        }
        loadingText={
          confirmationAction === "block" ? "Blocking..." : "Suspending..."
        }
      />

      {/* {deletingUser && <RequestLoader />} */}
    </div>
  );
};

export default UserList;
