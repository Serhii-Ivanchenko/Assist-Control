import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/api.js";

// Get data od particular service
export const getServiceData = createAsyncThunk(
  "service/getServiceData",
  async (_, thunkAPI) => {
    // const state = thunkAPI.getState();
    // const serviceId = state.auth.userData.selectedServiceId;
    try {
      //   const response = await axiosInstance.get(`/crm/get_records/`, {
      //     headers: {
      //       "X-Api-Key": "YA7NxysJ",
      //       "company-id": serviceId,
      //     },
      //   });
      //   console.log("response data", response.data);
      //   return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create new service
export const createService = createAsyncThunk(
  "service/createService",
  async (serviceData, thunkAPI) => {
    // const state = thunkAPI.getState();
    // const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.post(
        `/set/create_service/`,
        serviceData,
        {
          headers: {
            "X-Api-Key": "YA7NxysJ",
            // "company-id": serviceId,
          },
        }
      );
      console.log("create service", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update service data
export const updateService = createAsyncThunk(
  "service/updateService",
  async (serviceDataToUpdate, thunkAPI) => {
    // const state = thunkAPI.getState();
    // const serviceId = state.auth.userData.selectedServiceId;
    try {
      const { serviceId, ...serviceDataWithoutId } = serviceDataToUpdate;

      const response = await axiosInstance.post(
        `/set/update_service/${serviceId}`,
        serviceDataWithoutId,
        {
          headers: {
            "X-Api-Key": "YA7NxysJ",
            // "company-id": serviceId,
          },
        }
      );
      console.log("updateService", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
