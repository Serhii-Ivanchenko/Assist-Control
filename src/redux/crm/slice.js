import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState.js";
import { createRecord, getAllRecords, getMechsAndPosts, getPlannedVisits, getRecordsFromDate } from "./operations.js";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const crmSlice = createSlice({
  name: "crm",
  initialState: initialState.crm,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getAllRecords.pending, handlePending)
      .addCase(getAllRecords.fulfilled, (state, action) => {
        state.isLoading = false;
        state.records = action.payload.records;
      })
      .addCase(getAllRecords.rejected, handleRejected)
      .addCase(getRecordsFromDate.pending, handlePending)
      .addCase(getRecordsFromDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.records = action.payload.records;
      })
      .addCase(getRecordsFromDate.rejected, handleRejected)
      .addCase(createRecord.pending, handlePending)
      .addCase(createRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.records.push(action.payload.record);
      })
      .addCase(createRecord.rejected, handleRejected)
      .addCase(getMechsAndPosts.pending, handlePending)
      .addCase(getMechsAndPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.serviceData.mechanics = action.payload.mechanics;
        state.serviceData.posts = action.payload.posts;
      })
      .addCase(getMechsAndPosts.rejected, handleRejected)
      .addCase(getPlannedVisits.pending, handlePending)
      .addCase(getPlannedVisits.fulfilled, (state, action) => {
        state.isLoading = false;
        state.visits = action.payload.planner;
      })
      .addCase(getPlannedVisits.rejected, handleRejected),
});

export default crmSlice.reducer;
