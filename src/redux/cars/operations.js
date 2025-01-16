import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/api.js";

// Get all cars
export const getAllCars = createAsyncThunk(
  "cars/getAllCars",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(`/vc/data/`, {
        headers: {
          // "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
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
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(`/vc/current/cars/`, {
        headers: {
          // "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
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
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(
        `/vc/current/day/cars/?date=${day}`,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
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
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    // const { month, year } = date;
    try {
      const response = await axiosInstance.get(
        `/vc/current/month/cars/?date_str=${date}`,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get load in % for each day in a particular month
export const getCalendarByMonth = createAsyncThunk(
  "cars/getCalendarByMonth",
  async (date, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    // const { month, year } = date;
    try {
      const response = await axiosInstance.get(
        `/vc/get_monthly_load?date=${date}`,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get amount of cars per hour
export const getCarsForHour = createAsyncThunk(
  "cars/getCarsForHour",
  async (day, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(`/vc/get_busyness?date=${day}`, {
        headers: {
          // "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get load in % for one particular day
export const getPercentForHour = createAsyncThunk(
  "cars/getPercentForHour",
  async (day, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(`/vc/get_load_day?date=${day}`, {
        headers: {
          // "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get new cars in range of two particular dates
export const getNewCarsRange = createAsyncThunk(
  "cars/getNewCarsRange",
  async (date, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    const { dateBeginStr, dateEndStr } = date;
    try {
      const response = await axiosInstance.get(
        `/vc/get_new_cars_range?start_date=${dateBeginStr}&end_date=${dateEndStr}`,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
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

// Change car status
export const changeCarStatus = createAsyncThunk(
  "cars/changeCarStatus",
  async ({ carId, status }, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.post(`/vc/edit_status`, null, {
        params: {
          car_id: carId,
          status,
        },
        headers: {
          // "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("Status change response", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get all cars in time period
export const getPeriodCars = createAsyncThunk(
  "cars/getPeriodCars",
  async (date, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    const { startDate, endDate } = date;
    try {
      const response = await axiosInstance.get(
        `/vc/get_all_car/?start_date=${startDate}&end_date=${endDate}`,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
