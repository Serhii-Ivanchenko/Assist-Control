import qs from "qs";
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
      const response = await axiosInstance.post(
        "/v1/register",
        qs.stringify(userData)
      );
      setAuthHeader(response.data.api_key);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.detail);
    }
  }
);

//User login
export const logIn = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/v1/authenticate",
        qs.stringify(userData),
        {
          withCredentials: true,
        }
      );
      setAuthHeader(response.data.api_key);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.detail);
    }
  }
);

//User logout
