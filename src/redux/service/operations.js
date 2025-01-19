import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/api.js";

// Get all services
export const getAllServices = createAsyncThunk(
  "service/getAllServices",
  async (_, thunkAPI) => {
    // const state = thunkAPI.getState();
    // const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(`/set/get_user_companies/`, {
        headers: {
          // "X-Api-Key": "YA7NxysJ",
          // "company-id": serviceId,
        },
      });
      console.log("response data", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get data of particular service
// export const getServiceData = createAsyncThunk(
//   "service/getServiceData",
//   async (service_id, thunkAPI) => {
//     const state = thunkAPI.getState();
//     const serviceId = state.auth.userData.selectedServiceId;
//     try {
//       const response = await axiosInstance.get(`/set/services/${service_id}/`, {
//         headers: {
//           // "X-Api-Key": "YA7NxysJ",
//           "company-id": serviceId,
//         },
//       });
//       console.log("response data", response.data);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// Create new service
export const createService = createAsyncThunk(
  "service/createService",
  async (serviceData, thunkAPI) => {
    // const state = thunkAPI.getState();
    // const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.post(
        `/set/create_company/`,
        serviceData,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
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
      const { service_id, ...serviceDataWithoutId } = serviceDataToUpdate;

      const response = await axiosInstance.post(
        `/set/update_service/`,
        serviceDataWithoutId,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": service_id,
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

// Upload logo

// Update logo