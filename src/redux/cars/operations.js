import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/api.js";

// Get all cars
export const getAllCars = createAsyncThunk(
  "cars/getAllCars",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/v1/data/`, {
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

// Get current cars
export const getCurrentCars = createAsyncThunk(
  "cars/getCurrentCars",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/v1/current/cars/`, {
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

// Get cars for particular day
export const getCarsByDate = createAsyncThunk(
  "cars/getCarsByDate",
  async (day, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/v1/current/day/cars/?date=${day}/`,
        {
          headers: {
            "X-Api-Key": "YA7NxysJ",
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get cars for particular month
export const getCarsByMonth = createAsyncThunk(
  "cars/getCarsByMonth",
  async (date, thunkAPI) => {
    const { month, year } = date;
    try {
      const response = await axiosInstance.get(
        `/v1/current/month/cars/?month=${month}&year=${year} `,
        {
          headers: {
            "X-Api-Key": "YA7NxysJ",
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get new cars
