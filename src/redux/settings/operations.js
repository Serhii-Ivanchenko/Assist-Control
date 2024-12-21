import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/api.js";

// Get work schedule
export const getWorkSchedule = createAsyncThunk(
  "settings/getWorkSchedule",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(`/set/get_work_schedule/`, {
        headers: {
          "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("getWorkSchedule", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update work schedule
export const updateWorkSchedule = createAsyncThunk(
  "settings/updateWorkSchedule",
  async (workScheduleDataToUpdate, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.patch(
        `/set/set_work_schedule/`,
        workScheduleDataToUpdate,
        {
          headers: {
            "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("updateWorkSchedule", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get list of service posts
export const getPosts = createAsyncThunk(
  "settings/getPosts",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(`/set/get_posts/`, {
        headers: {
          "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("getPosts", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create new post
export const createPost = createAsyncThunk(
  "settings/createPost",
  async (postData, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.post(`/set/create_post/`, postData, {
        headers: {
          "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("createPost", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update post status
export const updatePostStatus = createAsyncThunk(
  "settings/updatePostStatus",
  async (newStatus, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const { postId, ...status } = newStatus;
      const response = await axiosInstance.patch(
        `/set/update_post_status/${postId}`,
        status,
        {
          headers: {
            "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("updatePostStatus", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update post data
export const updatePostData = createAsyncThunk(
  "settings/updatePostData",
  async (postDataToUpdate, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const { postId, ...dataToUpdate } = postDataToUpdate;
      const response = await axiosInstance.patch(
        `/set/update_post/${postId}`,
        dataToUpdate,
        {
          headers: {
            "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("updatePostData", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete post
export const deletePost = createAsyncThunk(
  "settings/deletePost",
  async (postId, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.delete(`/set/update_post/${postId}`, {
        headers: {
          "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("deletePost", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get categories and services for PricePart
export const getPrices = createAsyncThunk(
  "settings/getPrices",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(
        `/v1/categories_services/prices`,
        {
          headers: {
            "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("getPrices", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Edit prices
export const editPrices = createAsyncThunk(
  "settings/editPrices",
  async (newPrices, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const { service_id, ...prices } = newPrices;
      const response = await axiosInstance.patch(
        `/v1/services/${service_id}/prices`,
        prices,
        {
          headers: {
            "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("editPrices", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create category of services
export const createCategory = createAsyncThunk(
  "settings/createCategory",
  async (newCategory, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.post(
        `/v1/categories_services/`,
        newCategory,
        {
          headers: {
            "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("createCategory", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update category name
export const updateCategoryData = createAsyncThunk(
  "settings/updateCategoryData",
  async (categoryDataToUpdate, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const { categoryId, ...dataToUpdate } = categoryDataToUpdate;
      const response = await axiosInstance.patch(
        `/v1/categories_services/${categoryId}`,
        dataToUpdate,
        {
          headers: {
            "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("updateCategoryData", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create service
export const createService = createAsyncThunk(
  "settings/createService",
  async (newService, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;

    // const { categoryId, ...serviceName } = newService;

    try {
      const response = await axiosInstance.post(`/v1/services/`, newService, {
        headers: {
          "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("createService", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete service
export const deleteService = createAsyncThunk(
  "settings/deleteService",
  async (service_id, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.delete(
        `/v1/services/${service_id}`,
        {
          headers: {
            "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("deleteService", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);