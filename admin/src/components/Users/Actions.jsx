import { HiDotsVertical } from "react-icons/hi";

const Actions = ({
  openDropdown,
  setOpenDropdown,
  user,
  setUser,
  setShowUSerCard,
  handleToggleDropdown,
  onAction,
}) => {
  return (
    <>
      <button
        type="button"
        onClick={() => handleToggleDropdown(user?._id)}
        className="outline-none"
      >
        <HiDotsVertical className="text-lg text-gray-700" />
      </button>

      {openDropdown === user?._id && (
        <div className="min-w-24 bg-white border rounded-md flex flex-col items-start absolute right-14 top-10 z-10 shadow-md">
          {/* View */}
          <button
            type="button"
            onClick={() => {
              setShowUSerCard(true);
              setUser(user);
              setOpenDropdown(null);
            }}
            className="px-4 py-2 hover:bg-gray-100 w-full text-start"
          >
            View
          </button>

          {/* Block / Unblock */}
          <button
            type="button"
            onClick={() => {
              if (user?.status === "blocked") {
                onAction("unblock", user);
              } else {
                onAction("block", user);
              }
            }}
            className="px-4 py-2 hover:bg-gray-100 w-full text-start"
          >
            {user?.status === "blocked" ? "Unblock" : "Block"}
          </button>

          {/* Suspend / Unsuspend */}
          <button
            type="button"
            onClick={() => {
              if (user?.status === "suspended") {
                onAction("unsuspend", user);
              } else {
                onAction("suspend", user);
              }
            }}
            className="px-4 py-2 hover:bg-gray-100 w-full text-start"
          >
            {user?.status === "suspended" ? "Unsuspend" : "Suspend"}
          </button>
        </div>
      )}
    </>
  );
};

export default Actions;
