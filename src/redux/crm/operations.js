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
          // "X-Api-Key": "YA7NxysJ",
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
export const getRecordsForDay = createAsyncThunk(
  "crm/getRecordsFromDate",
  async (day, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(
        `/crm/get_records/?start_date=${day}`,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      // console.log("getRecordsForDay", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get records of the service for a particular period
export const getRecordsForPeriod = createAsyncThunk(
  "crm/getRecordsForPeriod",
  async (dates, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    const { startDate, endDate } = dates;

    try {
      const response = await axiosInstance.get(
        `/crm/get_records/?start_date=${startDate}&end_date=${endDate}`,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("response data getRecordsForPeriod", response.data);

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
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("create record", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update record data
export const updateRecordData = createAsyncThunk(
  "crm/updateRecordData",
  async (recordDataToUpdate, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const { recordId, ...recordDataToUpdateWithoutId } = recordDataToUpdate;

      const response = await axiosInstance.patch(
        `/crm/update_record/${recordId}/`,
        recordDataToUpdateWithoutId,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log(response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//Get mechanics and posts for particular service
// export const getMechsAndPosts = createAsyncThunk(
//   "crm/getMechsAndPosts",
//   async (_, thunkAPI) => {
//     const state = thunkAPI.getState();
//     const serviceId = state.auth.userData.selectedServiceId;
//     try {
//       const response = await axiosInstance.get(
//         `/crm/get_mechanics_and_posts/`,
//         {
//           headers: {
//             // "X-Api-Key": "YA7NxysJ",
//             "company-id": serviceId,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

//Get booking data for particular service on a particular date (for ServiceBookingModal)
export const getServiceDataForBooking = createAsyncThunk(
  "crm/getServiceDataForBooking",
  async (day, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(
        `/crm/get_mechanics_and_posts/?date=${day}`,
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
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("getPlannedVisits", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get monthly load for calendar
export const getMonthlyLoad = createAsyncThunk(
  "crm/getMonthlyLoad",
  async (month, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(
        `/crm/get_calendar_load/?month_year=${month}`,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
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

// Change cat status in CRM page
export const changeCarStatusCRM = createAsyncThunk(
  "cars/changeCarStatusCRM",
  async ({ carId, status }, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.post(`/crm/edit_status`, null, {
        params: {
          car_id: carId,
          status,
        },
        headers: {
          // "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("changeCarStatusCRM", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
