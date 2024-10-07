import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/api.js";

// Get all cars
export const getAllCars = createAsyncThunk(
  "cars/getAllCars",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/v1/data/`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get current cars
export const getCurrentCars = createAsyncThunk(
  "cars/getCurrentCars",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/data/current_cars`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get cars for particular day
export const getCarsByDate = createAsyncThunk(
  "cars/getCarsByDate",
  async (day, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/data/${day}/current_cars`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get cars for particular month
export const getCarsByMonth = createAsyncThunk(
  "cars/getCarsByMonth",
  async (month, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/data/${month}/current_cars`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get new cars
