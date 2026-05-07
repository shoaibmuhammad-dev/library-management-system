import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiHome } from "react-icons/ci";
import { LuUsersRound } from "react-icons/lu";
import { GoBook } from "react-icons/go";
import { FaPushed } from "react-icons/fa6";
import { LuUserRound } from "react-icons/lu";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const links = [
  {
    title: "Home",
    icon: <CiHome className="text-lg" />,
    path: "/",
  },
  {
    title: "All Users",
    icon: <LuUsersRound className="text-lg" />,
    path: "/users",
  },
  {
    title: "All Books",
    icon: <GoBook className="text-lg" />,
    path: "/books",
  },
  {
    title: "Borrow Requests",
    icon: <FaPushed className="text-lg" />,
    path: "/borrow-requests",
  },
  {
    title: "Account Requests",
    icon: <LuUserRound className="text-lg" />,
    path: "/account-requests",
  },
];

const Sidebar = () => {
  const path = useLocation();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("adminData");
    Cookies.remove("adminToken");
    navigate("/login");
  };
  return (
    <div className="py-4 w-full h-full px-5 flex flex-col items-start gap-8 relative">
      <div className="w-full flex items-center gap-1">
        <img
          src="/logo.png"
          alt="bookwise logo"
          className="w-[37px] h-[37px]"
        />
        <span className="primary-text text-2xl font-semibold">
          <strong>BookWise</strong>
        </span>
      </div>
      <div className="w-full border border-dashed" />
      <ul className="w-full">
        {links?.map((link, index) => {
          return (
            <li
              key={index}
              className={`w-full py-3 rounded-xl px-4 mb-1 hover:bg-[--primary-bg] hover:text-white transition-all duration-200 ${
                path?.pathname === link?.path
                  ? "primary-bg text-white"
                  : " bg-white text-black"
              }`}
            >
              <Link
                to={link?.path}
                className={`font-medium flex items-center gap-2 outline-none`}
              >
                <span>{link?.icon}</span>
                {link?.title}
              </Link>
            </li>
          );
        })}
      </ul>

      {user && user?.user && (
        <div className="w-[90%] border rounded-full p-2 flex items-center justify-between absolute bottom-6 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1">
            <img
              src="/profile-02.png"
              alt="profile"
              className="w-[44px] h-[44px] block rounded-full object-cover"
            />
            <div className="flex flex-col items-start gap-[-4px]">
              <p className="font-medium text-sm">{user?.user?.name}</p>
              <p className="text-xs secondary-text">{user?.user?.email}</p>
            </div>
          </div>
          <button type="button" onClick={() => handleLogout()}>
            <img
              src="/logout-icon.png"
              alt="logout icon"
              className="w-[24px] h-[24px]"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
