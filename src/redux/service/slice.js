import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState.js";
import { createService, getAllServices, getServiceData, updateService } from "./operations.js";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const serviceSlice = createSlice({
  name: "service",
  initialState: initialState.service,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getAllServices.pending, handlePending)
      .addCase(getAllServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(getAllServices.rejected, handleRejected)
      .addCase(getServiceData.pending, handlePending)
      .addCase(getServiceData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getServiceData.rejected, handleRejected)
      .addCase(createService.pending, handlePending)
      .addCase(createService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(createService.rejected, handleRejected)
      .addCase(updateService.pending, handlePending)
      .addCase(updateService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = { ...state.data, ...action.payload };
      })
      .addCase(updateService.rejected, handleRejected),
});

export default serviceSlice.reducer;
