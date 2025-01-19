import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/api.js";

// Get connections stats
export const getConnectionsStats = createAsyncThunk(
  "connections/getConnectionsStats",
  async (period, thunkAPI) => {
    // const state = thunkAPI.getState();
    // const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(
        `/contacts/summary?date_filter=${period}`,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            // "company-id": serviceId,
          },
        }
      );
      console.log("getConnectionsStats", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get connections list
export const getConnectionsList = createAsyncThunk(
  "connections/getConnectionsList",
  async (period, thunkAPI) => {
    // const state = thunkAPI.getState();
    // const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(
        `/contacts?date_filter=${period}`,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            // "company-id": serviceId,
          },
        }
      );
      console.log("getConnectionsList", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update status
export const updateConnectionStatus = createAsyncThunk(
  "connections/updateConnectionStatus",
  async (updatedInfo, thunkAPI) => {
    // const state = thunkAPI.getState();
    // const serviceId = state.auth.userData.selectedServiceId;
    try {
      const { reference_type, reference_id, newStatus } = updatedInfo;

      const response = await axiosInstance.patch(
        `/contacts/${reference_type}/${reference_id}/status`,
        newStatus,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            // "company-id": serviceId,
          },
        }
      );
      console.log("updateConnectionStatus", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
