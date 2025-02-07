import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/api.js";

// Get stats of connections
export const getStats = createAsyncThunk(
  "connections/getStats",
  async (period, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const { start_date, end_date, timePeriod } = period;
      const response = await axiosInstance.get(`/appl/contacts/summary`, {
        params: {
          date_filter: timePeriod,
          start_date,
          end_date,
        },
        headers: {
          // "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("getStats", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get list of connections
export const getConnectionsList = createAsyncThunk(
  "connections/getConnectionsList",
  async (queryParameters, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const { start_date, end_date, timePeriod, page, per_page } =
        queryParameters;

      const response = await axiosInstance.get(`/appl/contacts`, {
        params: {
          date_filter:timePeriod,
          start_date,
          end_date,
          page,
          per_page: per_page || 10,
        },

        headers: {
          // "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });

      console.log("getConnectionsList", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get list of problematic Contacts
export const getProblematicContacts = createAsyncThunk(
  "connections/getProblematicContacts",
  async (queryParameters, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const { start_date, end_date } = queryParameters;

      const response = await axiosInstance.get(`/appl/contacts/problematic`, {
        params: {
          start_date,
          end_date,
        },
        headers: {
          // "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("getProblematicContacts", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
