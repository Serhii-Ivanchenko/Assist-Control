import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setAuthHeader,
  clearAuthHeader,
  axiosInstance,
} from "../../services/api.js";
import axios from "axios";

//User registration
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/v1/register/", userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.status);
    }
  }
);

// Validate email
export const validateEmail = createAsyncThunk(
  "auth/validateEmail",
  async (apiKey, thunkAPI) => {
    try {
      const response = await axios.get("/v1/validate-email", {
        params: {
          api_key: apiKey,
        },
      });
      console.log(response);
      // setAuthHeader(response.data.api_key);
      // return response.data;
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
      const response = await axiosInstance.post("/v1/authenticate/", userData, {
        withCredentials: true,
      });
      // setAuthHeader(response.data.api_key);
      // return response.data;
      console.log(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//User logout
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.post("/v1/logout/");
    clearAuthHeader();
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.status);
  }
});

//Get user data
export const getUserData = createAsyncThunk(
  "auth/getUserData",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/v1/user_info/", {
        headers: {
          "X-Api-Key": "YA7NxysJ",
        },
      });
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
        "/v1/update_photo/",
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
        `/v1/user_info/`,
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
      const response = await axiosInstance.get("/v1/plan_status/");
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
      const reduxState = thunkAPI.getState();
      const apiKey = reduxState.user.apiKey;

      setAuthHeader(apiKey);

      const response = await axiosInstance.get("/v1/user_info/");

      return response.data;
    } catch (error) {
      clearAuthHeader();
      console.error("Error refreshing user:", error);
      return thunkAPI.rejectWithValue(error.response.status);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const reduxState = thunkAPI.getState();
      const savedToken = reduxState.user.token;
      return savedToken !== null;
    },
  }
);
