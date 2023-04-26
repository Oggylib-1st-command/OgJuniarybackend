import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../components/useAuth";
import Cookies from "js-cookie";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();
  const cookie = Cookies.get("profile");

  if (!user & !cookie) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export { RequireAuth };
