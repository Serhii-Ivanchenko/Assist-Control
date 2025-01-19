import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setAuthHeader,
  clearAuthHeader,
  axiosInstance,
} from "../../services/api.js";


//User registration
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/register/", userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Validate email
export const validateEmail = createAsyncThunk(
  "auth/validateEmail",
  async (api_key, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/auth/validate-email/", {
        headers: {
          "X-Api-Key": api_key,
        },
      });
      setAuthHeader(response.data.api_key);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//User login
export const logIn = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/auth/authenticate/",
        userData
      );
      setAuthHeader(response.data.api_key);
      localStorage.setItem("X-Api-Key", response.data.api_key);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//User logout
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get("/auth/logout/");
    clearAuthHeader();
    localStorage.removeItem("X-Api-Key");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.status);
  }
});

// Send reset email
export const sendRestEmail = createAsyncThunk(
  "auth/sendResetEmail",
  async (userEmail, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/auth/send-reset-email/",
        {},
        {
          params: {
            email: userEmail,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Reset Password with email
export const resetPasswordWithEmail = createAsyncThunk(
  "auth/resetPasswordWithEmail",
  async ({ api_key, password }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/auth/change_password_with_mail/",
        { new_password: password },
        {
          headers: {
            "X-Api-Key": api_key,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//Get user data
export const getUserData = createAsyncThunk(
  "auth/getUserData",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/auth/user_info/");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update user avatar
export const updateUserAvatar = createAsyncThunk(
  "auth/updateAvatar",
  async (newAvatar, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("file", newAvatar);

      const response = await axiosInstance.patch(
        "/auth/update_photo/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update user data
export const updateUserData = createAsyncThunk(
  "auth/updateUserData",
  async (userDataToUpdate, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `/auth/user_info/`,
        userDataToUpdate
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//Get tariff info
export const getTariffData = createAsyncThunk(
  "auth/getTariffInfo",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/auth/plan_status/");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Refresh
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const apiKey = localStorage.getItem("X-Api-Key"); // Беремо токен з localStorage

      if (!apiKey) {
        return thunkAPI.rejectWithValue("Token not found");
      }

      setAuthHeader(apiKey); // Встановлюємо токен у заголовок

      const response = await axiosInstance.get("/auth/user_info/");
      return { ...response.data, api_key: apiKey };
    } catch (error) {
      clearAuthHeader();
      localStorage.removeItem("X-Api-Key"); // Видаляємо токен при помилці
      return thunkAPI.rejectWithValue(error.response.status);
    }
  }
);

// Google Authentication
export const logInWithGoogle = createAsyncThunk(
  "auth/logInWithGoogle",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/auth/authenticate_in_google/",
        data
      );
      const { api_key, name, email } = response.data;
      setAuthHeader(api_key);
      localStorage.setItem("X-Api-Key", api_key);
      return { api_key, name, email };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Change password
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({old_password, new_password}, thunkAPI) => {
    try {
      const response = await axiosInstance.put("/auth/change_password/", null, {
        params: { old_password, new_password },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
)