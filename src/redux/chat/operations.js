import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/api.js";

// Upload File


// Get File


// Get Chats

export const getChats = createAsyncThunk("chat/getChats", async (_, thunkAPI) => {
  // const state = thunkAPI.getState();
  // const serviceId = state.auth.userData.selectedServiceId;
  try {
    const response = await axiosInstance.get(`/chats`, {
      headers: {
        // "X-Api-Key": "YA7NxysJ",
        //   "company-id": serviceId,
      },
    });
    console.log("getChats", response.data);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});


// Get Sorted Chats

export const getSortedChats = createAsyncThunk(
  "chat/getSortedChats",
  async (sortData, thunkAPI) => {
    // const state = thunkAPI.getState();
    // const serviceId = state.auth.userData.selectedServiceId;
    try {
      const { sortBy, sortOrder } = sortData;
      // sortBy: date/priority/source
      // sortOrder: asc or desc
      const response = await axiosInstance.get(
        `/chats/sorted?sort_by=${sortBy}&order=${sortOrder}`,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            //   "company-id": serviceId,
          },
        }
      );
      console.log("getSortedChats", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


// Update Chat Status

export const updateChatStatus = createAsyncThunk(
  "chat/updateChatStatus",
  async (chatStatus, thunkAPI) => {
    // const state = thunkAPI.getState();
    // const serviceId = state.auth.userData.selectedServiceId;
    try {
      const { chat_id, status } = chatStatus;
      //statuses: new, in_progress, closed
      const response = await axiosInstance.patch(
        `/chats/${chat_id}/status?status=${status}`,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            // "company-id": serviceId,
          },
        }
      );
      console.log("updateChatStatus", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


// Get Chat Details

export const getChatDetails = createAsyncThunk(
  "chat/getChatDetails",
  async (chat_id, thunkAPI) => {
    // const state = thunkAPI.getState();
    // const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(`/chats/${chat_id}`, {
        headers: {
          // "X-Api-Key": "YA7NxysJ",
          //   "company-id": serviceId,
        },
      });
      console.log("getChatDetails", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

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


