import { IoCalendarOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { shortDate } from "../../utils/shortDate";
import { useNavigate } from "react-router-dom";

const ListCard = ({ request }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex items-start justify-between bg-[#F8F8FF] p-4 rounded-xl">
      <div className="flex items-center gap-3">
        <img
          src={request?.book?.bookCoverImage}
          alt="inside-evil-book"
          className="w-[55px] h-[76px] object-cover rounded-md"
        />
        <div className="flex flex-col items-start gap-1.5">
          <h3 className="font-semibold">{request?.book?.bookTitle}</h3>
          <div className="flex items-center gap-5">
            <p className="text-sm secondary-text">By {request?.book?.author}</p>
            <p className="text-sm secondary-text">{request?.book?.genre}</p>
          </div>

          <div className="w-full flex items-center gap-5">
            <div className="flex items-center gap-1">
              <img
                src={
                  request?.user?.profilePicture
                    ? request?.user?.profilePicture
                    : "/profile-02.png"
                }
                alt={`${request?.user?.firstName} ${request?.user?.lastName} profile picture`}
                className="w-[18px] h-[18px] rounded-full object-cover"
              />
              <p className="text-sm secondary-text">{`${request?.user?.firstName} ${request?.user?.lastName}`}</p>
            </div>
            <div className="flex items-center gap-1">
              <IoCalendarOutline className="secondary-text text-[16px]" />
              <p className="text-sm secondary-text">
                {shortDate(request?.createdAt)}
              </p>
            </div>
            <span className="text-[10px] font-medium bg-orange-400 text-white px-2 py-1 rounded-full">
              {request?.status.slice(0, 1).toUpperCase() +
                request?.status.slice(1)}
            </span>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => navigate("/borrow-requests")}
        className="w-[32px] h-[32px] rounded-lg p-2 bg-white shadow"
      >
        <IoEyeOutline className="w-full h-full" />
      </button>
    </div>
  );
};

export default ListCard;
