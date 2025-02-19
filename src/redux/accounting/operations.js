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

// ! Commercial Offer

// Get data for Commercial Offer Modal
export const getCommercialOfferData = createAsyncThunk(
  "accounting/getCommercialOfferData",
  async (diagnostic_id, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const response = await axiosInstance.get(
        // `/dia/get_found_parts_by_diagnostic/${diagnostic_id}`,
        `/dia/get_found_parts_by_diagnostic/67b5cba169bee23d3bbcbd1d`,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("getCommercialOfferData", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);