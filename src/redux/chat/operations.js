import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/api.js";

// Upload File


// Get File


// Get Chats


// Get Sorted Chats


// Update Chat Status


// Get Chat Details


// Add Comment


// Get Chat Comments


// Get Message Templates

export const getTemplates = createAsyncThunk(
  "chat/getTemplates",
  async (_, thunkAPI) => {
    // const state = thunkAPI.getState();
    // const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(`/templates`, {
        headers: {
          // "X-Api-Key": "YA7NxysJ",
        //   "company-id": serviceId,
        },
      });
      console.log("getTemplates", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create Message Template

export const createTemplate = createAsyncThunk(
  "chat/createTemplate",
  async (templateData, thunkAPI) => {
    // const state = thunkAPI.getState();
    // const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.post(`/templates`, templateData, {
        headers: {
          // "X-Api-Key": "YA7NxysJ",
        //   "company-id": serviceId,
        },
      });
      console.log("createTemplate", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


