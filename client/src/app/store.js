import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/product-list/productSlice";
import authSlice from "../features/auth/authSlice";
import cartSlice from "../features/cart/cartSlice";
import orderSlice from "../features/order/orderSlice";
import userSlice from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    product: productSlice,
    auth: authSlice,
    cart: cartSlice,
    order: orderSlice,
    user: userSlice,
  },
});
