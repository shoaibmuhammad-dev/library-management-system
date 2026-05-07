import { TbLogout2 } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  const navigate = useNavigate();

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

        <ul className="flex items-center gap-10">
          <li>
            <Link to={"/"} className="text-lg">
              Home
            </Link>
          </li>
          <li>
            <Link to={"/search"} className="text-lg">
              Search
            </Link>
          </li>
          <li>
            <Link to={"/profile"} className="flex items-center gap-2 text-lg">
              <div className="w-8 h-8 rounded-full bg-blue-300 flex items-center justify-center">
                <span className="font-semibold text-sm">SM</span>
              </div>
              <span>Adrian</span>
            </Link>
          </li>
          <li>
            <button type="button" onClick={handleLogout}>
              <TbLogout2 className="text-red-600 text-xl" />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
