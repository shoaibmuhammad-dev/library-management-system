import StudentCard from "./StudentCard";
import { LiaUserEditSolid } from "react-icons/lia";

const UserInfo = ({ student, handleToggleEditProfileModal }) => {
  const accountStatus = student?.status;
  return (
    <div className="w-full max-w-[566px] bg-[#232839] rounded-[10px] p-8 flex flex-col items-start gap-5 sticky top-10">
      <div className="w-full flex items-start md:items-center gap-4 flex-col md:flex-row">
        <div className="w-[100px] h-[100px] relative">
          <img
            src={
              student?.profilePicture
                ? student?.profilePicture
                : "/user-profile-placeholder.jpg"
            }
            className="rounded-full max-w-[95px] max-h-[95px] object-cover"
            alt="user-profile-placeholder"
            width={95}
            height={95}
          />
          <button
            type="button"
            onClick={handleToggleEditProfileModal}
            className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center absolute bottom-2 right-2"
          >
            <LiaUserEditSolid color="#000" />
          </button>
        </div>
        <div className="flex flex-col items-start">
          <p
            className={`text-sm ${
              accountStatus === "pending"
                ? "text-orange-500"
                : accountStatus === "rejected"
                  ? "text-red-500"
                  : accountStatus === "accepted"
                    ? "text-green-500"
                    : "text-gray-400"
            }`}
          >
            {accountStatus === "accepted"
              ? "Verified"
              : accountStatus?.charAt(0).toUpperCase() +
                accountStatus?.slice(1)}
          </p>
          <p className="font-semibold">
            {student?.firstName} {student?.lastName}
          </p>
          <p className="text-gray-400">{student?.email}</p>
        </div>
      </div>
      <div className="w-full">
        <p className="text-gray-400 font-medium">University</p>
        <h2 className="font-semibold">XYZ Engineering University</h2>
      </div>
      <div className="w-full">
        <p className="text-gray-400 font-medium">Student ID</p>
        <h2 className="font-semibold">{student?.idNumber}</h2>
      </div>

      <StudentCard student={student} />
    </div>
  );
};

export default UserInfo;
