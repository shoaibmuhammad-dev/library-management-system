import { useEffect, useRef, useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import Sidebar from "./Sidebar";
import { useGetProfileQuery } from "../../services/users/authApi";
import Cookies from "js-cookie";
import { data } from "react-router-dom";
import { setError, setLoading, setUser } from "../../features/slices/userSlice";
import { useDispatch } from "react-redux";
import Search from "./Search";
import useOnline from "../../hooks/useOnline";

const Layout = ({ page }) => {
  const sidebarRef = useRef(null);
  const dispatch = useDispatch();
  const [isOpen, setisOpen] = useState(false);
  const toggleModal = () => {
    setisOpen(!isOpen);
  };

  const isOnline = useOnline();

  const token = Cookies.get("adminToken");

  const {
    data: profile,
    isLoading,
    error,
  } = useGetProfileQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (isLoading) dispatch(setLoading(true));
    else dispatch(setLoading(false));

    if (profile) dispatch(setUser(profile));
    if (error) dispatch(setError(error));
  }, [data, isLoading, error]);

  return (
    <div className="w-screen h-screen flex justify-start items-start">
      <div
        onClick={toggleModal}
        className={`w-screen h-screen fixed top-0 left-0 transition-all duration-500  ${
          isOpen ? " lg:translate-x-0" : "-translate-x-full lg:translate-x-0"
        } lg:static  z-[2000] lg:z-auto px-3 lg:w-60 xl:w-72 flex flex-col gap-3 items-center justify-start py-0 lg:h-full `}
      >
        <div
          ref={sidebarRef}
          className={`fixed top-0 left-0 transition-all duration-200  ${
            isOpen ? " lg:translate-x-0" : "-translate-x-full lg:translate-x-0"
          } lg:static w-[60%] md:w-[30%] z-[2000] lg:z-auto lg:w-60 xl:w-72 flex flex-col gap-3 items-center justify-start py-0 h-full bg-white border-r border-gray-200 `}
        >
          <Sidebar />
        </div>
      </div>

      <div className="w-full lg:w-[calc(100%-15rem)] xl:w-[calc(100%-18rem)] h-full  overflow-y-auto overflow-x-hidden">
        <div className="sticky top-0 left-0 w-full h-24 bg-gray-50 flex items-center justify-between px-4 z-20">
          <button
            onClick={() => setisOpen((prev) => !prev)}
            className="lg:hidden block"
          >
            <HiOutlineMenuAlt2 className="text-2xl" />
          </button>
          <div className="">
            <p className="text-2xl font-semibold mb-1.5">
              Welcome {profile && profile?.name}
            </p>
            <p className="secondary-text">
              Monitor all of your projects and tasks here
            </p>
          </div>
          <Search />
        </div>

        <div className="w-full p-4 bg-gray-50">
          {!isOnline ? (
            <main className="w-full min-h-screen flex items-center justify-center px-4 gap-4 flex-col">
              <p className="">No internet connection.</p>
            </main>
          ) : (
            page
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
