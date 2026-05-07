import { useEffect, useRef } from "react";

const UserCard = ({ setShowUSerCard, user, setUser }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowUSerCard(false);
        setUser(null);
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowUSerCard(false);
        setUser(null);
      }
    };

    document.addEventListener("keydown", handleEsc);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [user]);

  return (
    <main
      // onClick={() => setShowUSerCard((prev) => !prev)}
      className="w-full h-screen fixed inset-0 z-50 bg-[rgba(0,0,0,0.4)] flex items-center justify-center px-5"
    >
      <div
        ref={modalRef}
        className="w-full max-w-[600px] bg-white rounded-xl py-6 px-6 min-h-[300px]"
      >
        <div className="w-full flex items-center gap-3">
          <div className="">
            <img src={"/logo.png"} className="max-w-[70px]" alt="logo" />
          </div>
          <div className="flex flex-col items-start">
            <h3 className="font-semibold text-2xl leading-none">
              JS Mastery University
            </h3>
            <p className="secondary-text text-sm">
              Empowering Dreams, Inspiring Features
            </p>
          </div>
        </div>

        <div className="w-full border my-4" />

        <div className="w-full flex items-center gap-5">
          <div className="">
            <div className="bg-gray-100 p-2 h-[140px]">
              <img
                src={"/student-profile-picture.jpg"}
                className="max-w-[100px] h-full object-cover"
                alt="logo"
              />
            </div>
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="w-full grid grid-cols-2">
              <p className="font-medium secondary-text leading-none text-sm">
                Name:
              </p>
              <p className="secondary-text text-sm leading-none">
                {user?.firstName} {user?.lastName}
              </p>
            </div>
            <div className="w-full grid grid-cols-2">
              <p className="font-medium secondary-text leading-none text-sm">
                Email:
              </p>
              <p className="secondary-text text-sm leading-none">
                {user?.email ? user?.email : "N/A"}
              </p>
            </div>
            <div className="w-full grid grid-cols-2">
              <p className="font-medium secondary-text leading-none text-sm">
                ID Number:
              </p>
              <p className="secondary-text text-sm leading-none">
                {user?.idNumber ? user?.idNumber : "N/A"}
              </p>
            </div>
            <div className="w-full grid grid-cols-2">
              <p className="font-medium secondary-text leading-none text-sm">
                Contact:
              </p>
              <p className="secondary-text text-sm leading-none">
                {user?.phoneNumber ? user?.phoneNumber : "N/A"}
              </p>
            </div>
            <div className="w-full grid grid-cols-2">
              <p className="font-medium secondary-text leading-none text-sm">
                Department:
              </p>
              <p className="secondary-text text-sm leading-none">
                {user?.department ? user?.department : "N/A"}
              </p>
            </div>
            <div className="w-full grid grid-cols-2">
              <p className="font-medium secondary-text leading-none text-sm">
                Date of Birth:
              </p>
              <p className="secondary-text text-sm leading-none">
                {user?.dateOfBirth ? user?.dateOfBirth : "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full border my-4" />

        <div className="w-full grid grid-cols-2">
          <p className="text-xs">
            <span className="font-medium">University No.</span>{" "}
            <span className="secondary-text font-medium">
              +1 (800) 456-7890
            </span>
          </p>

          <p className="text-xs">
            <span className="font-medium">Website: </span>{" "}
            <span className="secondary-text font-medium">
              shoaibmuhammad.vercel.app
            </span>
          </p>
        </div>
      </div>
    </main>
  );
};

export default UserCard;
