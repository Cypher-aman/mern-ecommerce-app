import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserInfo, fetchUserOrders, updateUser } from "./userAPI";

const initialState = {
  userOrders: null,
  userInfo: null,
  status: "idle",
  orderStatus: "idle",
};

export const fetchUserOrdersAsync = createAsyncThunk(
  "user/fetchUserOrders",
  async (userId) => {
    const response = await fetchUserOrders(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchUserInfoAsync = createAsyncThunk(
  "user/fetchUserInfo",
  async (userId) => {
    const response = await fetchUserInfo(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateUserInfoAsync = createAsyncThunk(
  "user/udateUserInfo",
  async (userId) => {
    const response = await updateUser(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.userInfo = null;
      state.userOrders = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      })
      .addCase(fetchUserInfoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserInfoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(updateUserInfoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserInfoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      });
  },
});

export const { resetUser } = userSlice.actions;

export const selectUserOrders = (state) => state.user.userOrders;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserStatus = (state) => state.user.status;
export const selectOrderStatus = (state) => state.user.orderStatus;

export default userSlice.reducer;
