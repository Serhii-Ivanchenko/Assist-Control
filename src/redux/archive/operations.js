import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/api.js";

//Get all archive data
export const getAllArchiveData = createAsyncThunk(
  "archive/getAllArchiveData",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(`/crm/get_all_archive_info/`, {
        headers: {
          // "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("getAllArchiveData", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Add item to archive
export const addItemToArchive = createAsyncThunk(
  "archive/addItemToArchive",
  async (itemData, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
   
    try {
      const response = await axiosInstance.post(`/crm/in_archive/`, itemData, {
        headers: {
          // "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("addItemToArchive", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Edit item in archive
export const updateArchiveItem = createAsyncThunk(
  "archive/updateArchiveItem",
  async (updatedInfo, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.patch(
        `/crm/archive/update/`,
        updatedInfo,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("updateArchiveItem", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Return item from archive
export const returnArchiveItem = createAsyncThunk(
  "archive/returnArchiveItem",
  async (returnedItemData, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const { archive_id , newStatus} = returnedItemData;
      const response = await axiosInstance.patch(
        `/crm/archive/return_archive/?archive_id=${archive_id}&status=${newStatus}`,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("returnArchiveItem", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);