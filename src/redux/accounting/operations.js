import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/api.js";

// ! Diagnostics

// Get Nodes and Parts list
export const getNodesAndParts = createAsyncThunk(
  "accounting/getNodesAndParts",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
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

// Get particular diagnostic
export const getDiagnostic = createAsyncThunk(
  "accounting/getDiagnostic",
  async (diagnostic_id, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(
        `/dia/get_diagnostic/${diagnostic_id}`,
        // `/dia/get_diagnostic/67b777dca876c8394c69cba0`,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("getDiagnostic", response.data);

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
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(
        `/dia/get_found_parts_by_diagnostic/${diagnostic_id}`,
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

// Create Commercial Offer
export const createCommercialOffer = createAsyncThunk(
  "accounting/createCommercialOffer",
  async (data, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const { diagnostic_id, commercialOfferData } = data;

      const response = await axiosInstance.post(
        `/dia/create_commercial_offer/`,
        commercialOfferData,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "diagnostic-id": diagnostic_id,
            "company-id": serviceId,
          },
        }
      );
      console.log("createCommercialOffer", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get Commercial Offer
export const getCommercialOffer = createAsyncThunk(
  "accounting/getCommercialOffer",
  async (commercialOfferId, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(
        `/dia/get_commercial_offer/${commercialOfferId}`,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("getCommercialOffer", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);