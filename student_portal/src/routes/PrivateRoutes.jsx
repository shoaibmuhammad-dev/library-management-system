import { getToken } from "../utils/getToken";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const token = getToken();
  if (!token) return <Navigate to={`/login`} replace />;
  return <>{children}</>;
};

export default PrivateRoutes;
