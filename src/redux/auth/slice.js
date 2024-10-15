import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState.js";
import {
  // getTariffData,
  getUserData,
  logIn,
  logInWithGoogle,
  logOut,
  refreshUser,
  register,
  updateUserAvatar,
  updateUserData,
  validateEmail,
} from "./operations.js";

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
  initialState: initialState.auth,
  extraReducers: (builder) =>
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = action.payload;
      })
      .addCase(validateEmail.pending, (state) => {
        state.isLoading = true;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(validateEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.error = null;
        state.apiKey = action.payload.api_key;
      })
      .addCase(validateEmail.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.apiKey = action.payload.api_key;
        state.error = null;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = action.payload.message;
      })
      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, (state) => {
        return { ...initialState.auth, isLoggedIn: false };
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
      // .addCase(getTariffData.pending, handlePending)
      // .addCase(getTariffData.fulfilled, (state, action) => {
      //   state.userData.tariff = action.payload;
      //   state.isLoading = false;
      // })
      // .addCase(getTariffData.rejected, handleRejected)
      // .addCase(refreshUser.pending, (state) => {
      //   state.isRefreshing = true;
      //   state.isLoading = true;
      //   state.error = null;
      // })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.userData = { ...state.userData, ...action.payload };
        state.isLoggedIn = true;
        state.isRefreshing = false; // Зупиняємо рефреш
        state.apiKey = action.payload.api_key; // Переконуємося, що ключ оновився
      })
      // .addCase(refreshUser.fulfilled, (state, action) => {
      //   state.userData = { ...state.userData, ...action.payload };
      //   state.isLoggedIn = true;
      //   state.isRefreshing = false;
      // })
      .addCase(refreshUser.rejected, (state, action) => {
        state.apiKey = null;
        state.isRefreshing = false;
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logInWithGoogle.pending, handlePending)
      .addCase(logInWithGoogle.fulfilled, (state, action) => {
        state.apiKey = action.payload.api_key;
        state.userData.name = action.payload.name;
        state.userData.email = action.payload.email;
      })
      .addCase(logInWithGoogle.rejected, handleRejected),
});

export default authSlice.reducer;
