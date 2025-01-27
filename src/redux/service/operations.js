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
  async (payload, thunkAPI) => {
    // const state = thunkAPI.getState();
    // const serviceId = state.auth.userData.selectedServiceId;
    try {
      //   const base64Logo = await new Promise((resolve, reject) => {
      //     const reader = new FileReader();
      //     reader.onload = () => resolve(reader.result); // Повертає Base64
      //     reader.onerror = (error) => reject(error);
      //     reader.readAsDataURL(logo); // Читає файл як Base64
      //   });

      // Створюємо об'єкт для відправки
      // const payload = {
      //   ...serviceData, // Додаємо дані співробітника
      //   file: base64Logo, // Додаємо Base64-файли
      // };
      const response = await axiosInstance.post(
        `/set/create_company/`,
        payload,
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
  async ({ payload, companyId }, thunkAPI) => {
    // const state = thunkAPI.getState();
    // const serviceId = state.service.selectedServiceInSettingsId;

    try {
      // const { logo, ...serviceData } = serviceDataToUpdate;

      // const base64Logo = await new Promise((resolve, reject) => {
      //   const reader = new FileReader();
      //   reader.onload = () => resolve(reader.result); // Повертає Base64
      //   reader.onerror = (error) => reject(error);
      //   reader.readAsDataURL(logo); // Читає файл як Base64
      // });

      // // Створюємо об'єкт для відправки
      // const payload = {
      //   ...serviceData, // Додаємо дані співробітника
      //   file: base64Logo, // Додаємо Base64-файли
      // };

      const response = await axiosInstance.patch(
        `/set/update_company/?company_id=${companyId}`,
        payload,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            // "company-id": serviceId,
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
