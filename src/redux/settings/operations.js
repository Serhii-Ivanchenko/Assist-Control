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
export const getPosts = createAsyncThunk("settings/getPosts", async (_, thunkAPI) => {
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
});

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
      const response = await axiosInstance.patch(
        `/set/update_post/${postId}`,
        {
          headers: {
            "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("deletePost", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
