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
      return thunkAPI.rejectWithValue(error.response?.data || "Помилка сервера");
    }
  }
);

// Edit item in archive
export const updateArchiveItem = createAsyncThunk(
  "archive/updateArchiveItem",
  async ({ archive_id,  reason_add }, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;

    console.log("Updating archive item", { archive_id, reason_add });
    
    try {
      const response = await axiosInstance.patch(
        `/crm/archive/update/?archive_id=${archive_id}`, 
        { reason_add },
        {
          headers: {
            "company-id": serviceId,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error occurred during request:", error);

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
    console.log("Отримані дані для запиту:", returnedItemData);

    try {
      const { archive_id, status } = returnedItemData;
      const response = await axiosInstance.patch(
        `/crm/archive/return_archive/`,
        null,
        {
          params: { archive_id, status },
          headers: {
            "company-id": serviceId,
          },
        }
       
      );
      return response.data;
    } catch (error) {
      console.error("Помилка при запиті до сервера:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);