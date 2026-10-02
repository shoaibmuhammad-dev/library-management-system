import { useDispatch } from "react-redux";
import useOnline from "../../hooks/useOnline";
import { useGetProfileQuery } from "../../services/authApi";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { setUser } from "../../features/slices/userSlice";

const DashboardLayout = ({ children }) => {
  const isOnline = useOnline();
  const dispatch = useDispatch();

  const { data, isLoading, isError, error } = useGetProfileQuery(undefined, {
    refetchOnFocus: false,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    dispatch(setUser(data));
  }, [data]);

  return (
    <main className="w-full max-w-7xl mx-auto">
      <Navbar />
      {isOnline ? (
        children
      ) : (
        <main className="w-full max-w-7xl mx-auto flex items-center justify-center min-h-screen">
          <h1 className="secondary-text">No internet connection.</h1>
        </main>
      )}
    </main>
  );
};

export default DashboardLayout;
