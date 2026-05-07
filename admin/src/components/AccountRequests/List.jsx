import { useState } from "react";
import RequestAcceptModal from "./RequestAcceptModal";
import RequestRejectModal from "./RequestRejectModal";
import { formatDate } from "../../utils/formatDate";
import UserCard from "../Users/UserCard";
import { useUpdateUserStatusMutation } from "../../services/users/authApi";
import { enqueueSnackbar } from "notistack";

const List = ({ data, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [approveModal, setApproveModal] = useState(false);
  const [showUserCard, setShowUSerCard] = useState(false);
  const [user, setUser] = useState(null);
  const [updateUserStatus, { isLoading }] = useUpdateUserStatusMutation();
  const [userId, setUserId] = useState(null);
  const [status, setStatus] = useState(null);

  const toggleApproveMdal = () => {
    setApproveModal((prev) => !prev);
  };

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  // accept or reject user account
  const acceptRejectUserAccount = async () => {
    if (!userId || !status) return;

    try {
      await updateUserStatus({
        userId: userId,
        status,
      }).unwrap();

      refetch();
      setIsOpen(false);
      setApproveModal(false);

      const message =
        status === "accepted"
          ? "User account approved successfully."
          : "User account rejected successfully!";

      enqueueSnackbar(message, {
        variant: status === "accepted" ? "success" : "error",
      });
    } catch (error) {
      console.error("Failed to update user status", error);
    }
  };

  return (
    <>
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
                University ID No
              </th>
              <th scope="col" className="px-6 py-4">
                ID Card
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
            {data?.data?.map((user, index) => (
              <tr
                className="bg-white whitespace-nowrap border-b border-gray-200"
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
                    className={`w-[40px] h-[40px] rounded-full object-cover`}
                  />
                  <div className="flex flex-col items-start">
                    <span>{user?.firstName + " " + user?.lastName}</span>
                    <span className="secondary-text font-normal">
                      {user?.email}
                    </span>
                  </div>
                </th>
                <td className="px-6 py-4">{formatDate(user?.createdAt)}</td>
                <td className="px-6 py-4">{user?.idNumber}</td>
                {/* view card */}
                <td className="px-6 py-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowUSerCard((prev) => !prev);
                      setUser(user);
                    }}
                    className="text-blue-500 font-medium"
                  >
                    View Card
                  </button>
                </td>
                {/* status */}
                <td
                  className={`px-6 py-4 font-medium ${
                    user?.status === "pending"
                      ? "text-orange-500"
                      : "text-red-500"
                  }`}
                >
                  {user?.status.charAt(0).toUpperCase() + user?.status.slice(1)}
                </td>
                {/* actions */}
                <td className="pr-6 text-center space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      toggleApproveMdal();
                      setUserId(user?._id);
                      setStatus("accepted");
                    }}
                    className="text-xs text-[#027A48] font-semibold bg-[#027A48]/10 px-3 py-2 rounded-lg"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      toggleModal();
                      setUserId(user?._id);
                      setStatus("rejected");
                    }}
                    className="bg-red-100 font-semibold px-3 py-2 rounded-lg text-red-500 text-xs"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Deny account request modal */}
      <RequestAcceptModal
        isOpen={isOpen}
        onclick={acceptRejectUserAccount}
        onclose={toggleModal}
        isLoading={isLoading}
      />
      {/* Accept account request modal */}
      <RequestRejectModal
        isOpen={approveModal}
        onclick={acceptRejectUserAccount}
        onclose={toggleApproveMdal}
        isLoading={isLoading}
      />
      {showUserCard && (
        <UserCard setShowUSerCard={setShowUSerCard} user={user} />
      )}
    </>
  );
};

export default List;
