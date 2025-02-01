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
  resetPasswordWithEmail,
  updateUserAvatar,
  updateUserData,
  validateEmail,
  changePassword,
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
  reducers: {
    setSelectedServiceId: (state, action) => {
      state.userData.selectedServiceId = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isLoggedIn = false;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
      })
      .addCase(validateEmail.pending, (state) => {
        state.isLoading = true;
        state.isLoggedIn = false;
      })
      .addCase(validateEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.apiKey = action.payload.api_key;
      })
      .addCase(validateEmail.rejected, (state) => {
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
        state.isLoggedIn = false;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.apiKey = action.payload.api_key;
      })
      .addCase(logIn.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
      })
      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, (state) => {
        return { ...initialState.auth, isLoggedIn: false };
      })
      .addCase(logOut.rejected, handleRejected)
      .addCase(getUserData.pending, handlePending)
      .addCase(getUserData.fulfilled, (state, action) => {
        state.userData = {
          ...state.userData, // Зберігаємо поточні значення
          ...action.payload, // Додаємо нові дані
        };
        state.userData.selectedServiceId = action.payload.services[0]?.id;
        state.isLoading = false;
      })
      .addCase(getUserData.rejected, handleRejected)
      .addCase(updateUserAvatar.pending, handlePending)
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.userData.avatar_url = action.payload.url;
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
        state.userData.selectedServiceId =
          action.payload.services?.[0]?.id || null;
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
        state.isLoggedIn = true;
        // state.isRefreshing = false;
      })
      .addCase(logInWithGoogle.rejected, handleRejected)
      .addCase(resetPasswordWithEmail.pending, (state) => {
        state.isLoading = true;
        state.isLoggedIn = false;
      })
      .addCase(resetPasswordWithEmail.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
      })
      .addCase(resetPasswordWithEmail.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
      })
      .addCase(changePassword.pending, handlePending)
      .addCase(changePassword.rejected, handleRejected)
      .addCase(changePassword.fulfilled, (state, action) => {
        // state.newPassword = action.payload.new_password;
        state.isLoading = false;
        state.error = null;
      }),
});

export const { setSelectedServiceId } = authSlice.actions;

export default authSlice.reducer;
