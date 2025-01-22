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
      // if (error.response) {
      //   console.error("❌ Сервер повернув помилку:", error.response.data);
      //   console.error("⚠️ Статус:", error.response.status);
      //   console.error("📄 Заголовки відповіді:", error.response.headers);
      //   console.error("📥 Тіло відповіді:", error.response.data);
      // } else if (error.request) {
      //   console.error("❌ Запит відправлено, але відповіді немає:", error.request);
      // } else {
      //   console.error("❌ Помилка при налаштуванні запиту:", error.message);
      // }
      return thunkAPI.rejectWithValue(error.response?.data || "Помилка сервера");
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
    console.log("Отримані дані для запиту:", returnedItemData);

    try {
      const { archive_id, status } = returnedItemData;
      const response = await axiosInstance.patch(
        `/crm/archive/return_archive/`,
        { archive_id, status },
        {
          headers: {
            "company-id": serviceId,
          },
        }
      );
      console.log("Відповідь сервера:", response.data);
      return response.data;
    } catch (error) {
      console.error("Помилка при запиті до сервера:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);