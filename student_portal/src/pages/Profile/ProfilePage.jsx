import { useGetProfileQuery } from "../../services/authApi";
import BorrowdBookList from "./BorrowdBookList";
import UserInfo from "./UserInfo";
import PageLoader from "../../components/common/PageLoader";
import EditProfileModal from "./EditProfileModal";
import { useState } from "react";

const ProfilePage = () => {
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);

  const { data, isLoading, isError, error } = useGetProfileQuery(undefined, {
    refetchOnFocus: false,
    refetchOnReconnect: true,
  });

  if (isLoading) return <PageLoader />;

  if (isError || error) return;

  const handleToggleEditProfileModal = () => {
    setOpenEditProfileModal((prev) => !prev);
  };

  return (
    <div className="w-full py-10 md:py-20 padding-x">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 2xl:gap-x-20">
        <div className="w-full">
          <UserInfo
            student={data}
            handleToggleEditProfileModal={handleToggleEditProfileModal}
          />
        </div>
        <div className="w-full">
          <BorrowdBookList />
        </div>
      </div>

      {openEditProfileModal && (
        <EditProfileModal
          toggleModal={handleToggleEditProfileModal}
          data={data}
        />
      )}
    </div>
  );
};

export default ProfilePage;
