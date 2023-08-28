import NavBar from "../features/navbar/Navbar";
import ProductDetail from "../features/product-list/components/ProductDetail";
import UserOrders from "../features/user/components/UserOrders";
function MyOrdersPage() {
  return (
    <div>
      <NavBar>
        <UserOrders></UserOrders>
      </NavBar>
    </div>
  );
}

export default MyOrdersPage;
