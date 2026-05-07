import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = Cookies.get("adminToken");
  if (token) {
    return <Navigate to={"/"} replace />;
  }

  return children;
};

export default PublicRoute;
