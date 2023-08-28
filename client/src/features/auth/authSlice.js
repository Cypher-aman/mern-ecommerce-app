import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkCredentials, createUser } from "./authAPI";

const userInfo = JSON.parse(localStorage.getItem("user"));

const initialState = {
  loggedInUser: userInfo || null,
  error: null,
  status: "idle",
};

export const createUserAsync = createAsyncThunk(
  "counter/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await createUser(userData);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const checkCredentialsAsync = createAsyncThunk(
  "auth/checkCredentials",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await checkCredentials(userData);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.loggedInUser = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(checkCredentialsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkCredentialsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(checkCredentialsAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = authSlice.actions;

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
