import { useDispatch } from "react-redux";
import { logoutUser } from "../authSlice";
import { Navigate } from "react-router-dom";
import { resetUser } from "../../user/userSlice";
import { emptyCart } from "../../cart/cartSlice";

const Logout = function () {
  const dispatch = useDispatch();
  dispatch(logoutUser());
  dispatch(emptyCart());
  dispatch(resetUser());
  return <Navigate to="/login" />;
};

export default Logout;
