import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUserInfo } from "../../user/userSlice";

const AdminProtected = ({ children }) => {
  const user = useSelector(selectUserInfo);

  if (!user) {
    return <Navigate to="/login" />;
  }
  if (user && user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminProtected;
