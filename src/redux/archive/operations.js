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
          "X-Api-Key": "YA7NxysJ",
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
    // якщо будемо передавати в query - розкоментувати, а те, що в body - закоментувати:
    // const { carId, location, reasonAddId, comment } = itemData;

    try {
      // Якщо будемо передавати в body:
      const response = await axiosInstance.post(`/crm/in_archive/`, itemData, {
        headers: {
          "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      // Якщо будемо передавати в query:
      //   const response = await axiosInstance.post(
      //     `/crm/in_archive/?car_id=${carId}&location=${location}&reason_add_id=${reasonAddId}&comment=${comment}/`,
      //     {
      //       headers: {
      //         "X-Api-Key": "YA7NxysJ",
      //         "company-id": serviceId,
      //       },
      //     }
      //   );
      console.log("addItemToArchive", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Edit item in archive

// Return item from archive
