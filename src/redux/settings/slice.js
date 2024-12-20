import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState.js";
import {
  createCategory,
  createPost,
  createService,
  deletePost,
  deleteService,
  editPrices,
  getPosts,
  getPrices,
  getWorkSchedule,
  updateCategoryData,
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
      .addCase(deletePost.rejected, handleRejected)
      .addCase(getPrices.pending, handlePending)
      .addCase(getPrices.fulfilled, (state, action) => {
        state.isLoading = false;

        state.prices = action.payload;
      })
      .addCase(getPrices.rejected, handleRejected)
      .addCase(editPrices.pending, handlePending)
      .addCase(editPrices.fulfilled, (state, action) => {
        state.isLoading = false;
        const pricesToEditIndex = state.posts.findIndex(
          (service) => service.id === action.payload.id
        );
        state.prices[pricesToEditIndex].prices = action.payload;
      })
      .addCase(editPrices.rejected, handleRejected)
      .addCase(createCategory.pending, handlePending)
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.prices.push(action.payload);
      })
      .addCase(createCategory.rejected, handleRejected)
      .addCase(updateCategoryData.pending, handlePending)
      .addCase(updateCategoryData.fulfilled, (state, action) => {
        state.isLoading = false;
        const categoryToEditIndex = state.prices.findIndex(
          (category) => category.id === action.payload.id
        );
        state.prices[categoryToEditIndex].category = action.payload;
      })
      .addCase(updateCategoryData.rejected, handleRejected)
      .addCase(createService.pending, handlePending)
      .addCase(createService.fulfilled, (state, action) => {
        state.isLoading = false;

        const categoryToAddNewService = state.prices.findIndex(
          (category) => category.id === action.payload.id
        );
        state.prices[categoryToAddNewService].items.push(action.payload);
      })
      .addCase(createService.rejected, handleRejected)
      .addCase(deleteService.pending, handlePending)
      .addCase(deleteService.fulfilled, (state, action) => {
        state.isLoading = false;

        state.prices = state.prices.items.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(deleteService.rejected, handleRejected),
});

export default settingsSlice.reducer;
