import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState.js";
import { getTariffData, getUserData, logOut, refreshUser, updateUserAvatar, updateUserData } from "./operations.js";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState.user,
  extraReducers: (builder) =>
    builder
      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, (state) => {
        return initialState.user;
      })
      .addCase(logOut.rejected, handleRejected)
      .addCase(getUserData.pending, handlePending)
      .addCase(getUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isLoading = false;
      })
      .addCase(getUserData.rejected, handleRejected)
      .addCase(updateUserAvatar.pending, handlePending)
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.userData.avatarUrl = action.payload.avatar_url;
        state.isLoading = false;
      })
      .addCase(updateUserAvatar.rejected, handleRejected)
      .addCase(updateUserData.pending, handlePending)
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.userData = {
          ...state.userData,
          ...action.payload.data,
        };
        state.isLoading = false;
      })
      .addCase(updateUserData.rejected, handleRejected)
      .addCase(getTariffData.pending, handlePending)
      .addCase(getTariffData.fulfilled, (state, action) => {
        state.userData.tariff = action.payload;
        state.isLoading = false;
      })
      .addCase(getTariffData.rejected, handleRejected)
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.userData = { ...state.userData, ...action.payload };
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.apiKey = null;
        state.isRefreshing = false;
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export default authSlice.reducer;