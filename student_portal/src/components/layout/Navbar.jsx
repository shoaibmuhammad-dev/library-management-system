import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { MdMenu } from "react-icons/md";
import { useState } from "react";
import Sidebar from "./Sidebar";
import LogoutModal from "./LogoutModal";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = useSelector((state) => state.user.user);

  const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleLogout = () => {
    Cookies.remove("studentToken");
    Cookies.remove("studentInfo");
    navigate("/login");
  };

  return (
    <header className="w-full py-7 padding-x">
      <nav className="w-full flex items-center justify-between">
        <Link to={"/"}>
          <img
            src={"/logo.png"}
            width={176}
            height={32}
            className=""
            alt="logo"
          />
        </Link>

        <ul className="hidden md:flex items-center gap-4 md:gap-7 lg:gap-10">
          <li>
            <Link to={"/"} className="text-base">
              Home
            </Link>
          </li>
          <li>
            <Link to={"/search"} className="text-base">
              Search
            </Link>
          </li>
          <li>
            <Link to={"/requests"} className="text-base">
              Requests
            </Link>
          </li>
          <li>
            <Link to={"/profile"} className="flex items-center gap-2 text-base">
              <div className="w-8 h-8 rounded-full bg-blue-300 flex items-center justify-center">
                {user?.profilePicture ? (
                  <img
                    src={user?.profilePicture}
                    alt={`${user?.firstName} ${user?.lastName} profile picture`}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="font-semibold text-sm">
                    {`${user?.firstName.slice(0, 1)}${user?.lastName.slice(0, 1)}`}
                  </span>
                )}
              </div>
              <span>{user ? `${user?.firstName} ${user?.lastName}` : ""}</span>
            </Link>
          </li>
          <li>
            <LogoutModal handleLogout={handleLogout} />
          </li>
        </ul>

        <button
          type="button"
          onClick={() => handleToggleSidebar()}
          className="md:hidden"
        >
          <MdMenu size={28} />
        </button>
      </nav>

      {/* sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        handleToggleSidebar={handleToggleSidebar}
        handleLogout={handleLogout}
      />
    </header>
  );
};

export default Navbar;
