import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/api.js";

// Get all records of the service
export const getAllRecords = createAsyncThunk(
  "crm/getAllRecords",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(`/crm/get_records/`, {
        headers: {
          "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("response data", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get records of the service from a particular date till present date
export const getRecordsFromDate = createAsyncThunk(
  "crm/getRecordsFromDate",
  async (day, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(
        `/crm/get_records/?date=${day}`,
        {
          headers: {
            "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("response data", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//Create record
export const createRecord = createAsyncThunk(
  "crm/createRecord",
  async (recordData, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.post(
        `/crm/create_record/`,
        recordData,
        {
          headers: {
            "X-Api-Key": "YA7NxysJ",
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

//Get mechanics and posts for particular service
export const getMechsAndPosts = createAsyncThunk(
  "crm/getMechsAndPosts",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(
        `/crm/get_mechanics_and_posts/`,
        {
          headers: {
            "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("response data", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get planned visits for a particular day
export const getPlannedVisits = createAsyncThunk(
  "crm/getPlannedVisits",
  async (day, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(
        `/crm/get_planner/?date=${day}`,
        {
          headers: {
            "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("response data", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
