import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/api.js";

// ! Diagnostics

// Get Nodes and Parts list
export const getNodesAndParts = createAsyncThunk(
  "accounting/getNodesAndParts",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const response = await axiosInstance.get(`/mb/categories_with_parts`, {
        headers: {
          // "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("getNodesAndParts", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);