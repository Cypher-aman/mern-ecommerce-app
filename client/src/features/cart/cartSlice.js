import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  fetchCartItems,
  updateCartItem,
  deleteCartItem,
  resetCart,
} from "./cartAPI";

const initialState = {
  items: [],
  status: "idle",
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const response = await addToCart(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const deleteCartItemAsync = createAsyncThunk(
  "cart/deleteCartItem",
  async (itemId) => {
    const response = await deleteCartItem(itemId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateCartItemAsync = createAsyncThunk(
  "cart/updateCartItem",
  async (item) => {
    const response = await updateCartItem(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const resetCartAsync = createAsyncThunk(
  "cart/resetCart",
  async (userId) => {
    const response = await resetCart(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchCartItemsAsync = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId) => {
    const response = await fetchCartItems(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    emptyCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(fetchCartItemsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItemsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(updateCartItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartItemAsync.fulfilled, (state, action) => {
        const item = action.payload;
        state.status = "idle";
        const index = state.items.findIndex(
          (product) => product.id === item.id
        );
        state.items[index] = item;
      })
      .addCase(deleteCartItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
        const itemId = action.payload.itemId;
        state.status = "idle";
        state.items = state.items.filter((item) => item.id !== itemId);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = [];
      });
  },
});

export const { emptyCart } = cartSlice.actions;

export const selectItems = (state) => state.cart.items;

export default cartSlice.reducer;
