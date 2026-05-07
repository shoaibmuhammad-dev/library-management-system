import { getToken } from "../utils/getToken";
import { Navigate } from "react-router-dom";

const PublicRoutes = ({ children }) => {
  const token = getToken();
  if (token) return <Navigate to={`/`} replace />;
  return <>{children}</>;
};

export default PublicRoutes;
