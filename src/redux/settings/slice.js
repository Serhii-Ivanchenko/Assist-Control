import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState.js";
import {
  createPost,
  deletePost,
  getPosts,
  getWorkSchedule,
  updatePostData,
  updatePostStatus,
  updateWorkSchedule,
} from "./operations.js";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: initialState.settings,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getWorkSchedule.pending, handlePending)
      .addCase(getWorkSchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.schedule = action.payload;
      })
      .addCase(getWorkSchedule.rejected, handleRejected)
      .addCase(updateWorkSchedule.pending, handlePending)
      .addCase(updateWorkSchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.schedule = { ...state.schedule, ...action.payload };
      })
      .addCase(updateWorkSchedule.rejected, handleRejected)
      .addCase(getPosts.pending, handlePending)
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, handleRejected)
      .addCase(createPost.pending, handlePending)
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, handleRejected)
      .addCase(updatePostStatus.pending, handlePending)
      .addCase(updatePostStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const postToEditIndex = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        state.posts[postToEditIndex].status = action.payload;
      })
      .addCase(updatePostStatus.rejected, handleRejected)
      .addCase(updatePostData.pending, handlePending)
      .addCase(updatePostData.fulfilled, (state, action) => {
        state.isLoading = false;
        const postToEditIndex = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        state.posts[postToEditIndex] = action.payload;
      })
      .addCase(updatePostData.rejected, handleRejected)
      .addCase(deletePost.pending, handlePending)
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;

        state.posts = state.posts.filter(
          (post) => post.id !== action.payload.id
        );
      })
      .addCase(deletePost.rejected, handleRejected),
});

export default settingsSlice.reducer;
