import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = Cookies.get("adminToken");
  if (!token) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

export default PrivateRoute;
