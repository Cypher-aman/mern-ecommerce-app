import { Counter } from "./features/counter/Counter";
import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Protected from "./features/auth/components/Protected";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Cart from "./features/cart/Cart";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailPage from "./pages/ProductDetailPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { fetchCartItemsAsync } from "./features/cart/cartSlice";
import PageNotFound from "./pages/NotFound";
import OrderPlaced from "./pages/OrderPlaced";
import MyOrdersPage from "./pages/MyOrders";
import MyProfilePage from "./pages/MyProfilePage";
import { fetchUserInfoAsync, selectUserInfo } from "./features/user/userSlice";
import AdminProtected from "./features/auth/components/AdminProtected";
import AdminProductDetailPage from "./pages/AdminProductDetail";
import AdminProductListPage from "./pages/AdminProductList";
import ProductFormPage from "./pages/ProductFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import Logout from "./features/auth/components/Logout";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },
  {
    path: "/product-list",
    element: (
      <AdminProtected>
        <AdminProductDetailPage />
      </AdminProtected>
    ),
  },
  {
    path: "/product-form",
    element: (
      <AdminProtected>
        <ProductFormPage />
      </AdminProtected>
    ),
  },
  {
    path: "/product-form/edit/:id",
    element: (
      <AdminProtected>
        <ProductFormPage />
      </AdminProtected>
    ),
  },
  {
    path: "/orders",
    element: (
      <AdminProtected>
        <AdminOrdersPage />
      </AdminProtected>
    ),
  },
  {
    path: "/admin",
    element: (
      <AdminProtected>
        <AdminProductListPage />
      </AdminProtected>
    ),
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout></Checkout>
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage></ProductDetailPage>
      </Protected>
    ),
  },
  {
    path: "/cart/:id",
    element: (
      <Protected>
        <Cart></Cart>
      </Protected>
    ),
  },
  {
    path: "/order-placed/:id",
    element: (
      <Protected>
        <OrderPlaced></OrderPlaced>
      </Protected>
    ),
  },
  {
    path: "/my-orders",
    element: (
      <Protected>
        <MyOrdersPage></MyOrdersPage>
      </Protected>
    ),
  },
  {
    path: "/logout",
    element: (
      <Protected>
        <Logout></Logout>
      </Protected>
    ),
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <MyProfilePage></MyProfilePage>
      </Protected>
    ),
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);

function App() {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  useEffect(() => {
    if (user) {
      dispatch(fetchCartItemsAsync(user.id));
      dispatch(fetchUserInfoAsync(user.id));


    }
  }, [user]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
