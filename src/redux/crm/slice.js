import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState.js";
import {
  changeCarStatusCRM,
  createRecord,
  getAllRecords,
  getMonthlyLoad,
  getPlannedVisits,
  getRecordsForDay,
  getRecordsForPeriod,
  getServiceDataForBooking,
  updateRecordData,
} from "./operations.js";

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
  reducers: {
    updateDates(state, action) {
      state.dates = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getAllRecords.pending, handlePending)
      .addCase(getAllRecords.fulfilled, (state, action) => {
        state.isLoading = false;
        state.records = action.payload.records;
      })
      .addCase(getAllRecords.rejected, handleRejected)
      .addCase(getRecordsForDay.pending, handlePending)
      .addCase(getRecordsForDay.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dayRecords = action.payload.records;
      })
      .addCase(getRecordsForDay.rejected, handleRejected)
      .addCase(getRecordsForPeriod.pending, handlePending)
      .addCase(getRecordsForPeriod.fulfilled, (state, action) => {
        state.isLoading = false;
        state.periodRecords = action.payload.records;
      })
      .addCase(getRecordsForPeriod.rejected, handleRejected)
      .addCase(createRecord.pending, handlePending)
      .addCase(createRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.records.push(action.payload.record);
      })
      .addCase(createRecord.rejected, handleRejected)
      .addCase(updateRecordData.pending, handlePending)
      .addCase(updateRecordData.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log(action.payload.id);

        const recordToEditIndex = state.records.findIndex(
          (record) => record.car_id === action.payload.car_id
        );
        state.records[recordToEditIndex] = action.payload;
      })
      .addCase(updateRecordData.rejected, handleRejected)
      .addCase(getServiceDataForBooking.pending, handlePending)
      .addCase(getServiceDataForBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.serviceData.mechanics = action.payload.mechanics;
        state.serviceData.posts = action.payload.posts;
        state.serviceData.services = action.payload.services;
        state.serviceData.workingHours = action.payload.working_hours;
        state.serviceData.availability = action.payload.availability;
      })
      .addCase(getServiceDataForBooking.rejected, handleRejected)
      .addCase(getPlannedVisits.pending, handlePending)
      .addCase(getPlannedVisits.fulfilled, (state, action) => {
        state.isLoading = false;
        state.visits = action.payload.planner;
      })
      .addCase(getPlannedVisits.rejected, handleRejected)
      .addCase(getMonthlyLoad.pending, handlePending)
      .addCase(getMonthlyLoad.fulfilled, (state, action) => {
        state.isLoading = false;
        state.load = action.payload.load;
      })
      .addCase(getMonthlyLoad.rejected, handleRejected)

      .addCase(changeCarStatusCRM.pending, handlePending)
      .addCase(changeCarStatusCRM.fulfilled, (state, action) => {
        state.isLoading = false;
        const { car_id, newStatus } = action.payload;
        const carIndex = state.periodRecords.findIndex(
          (car) => car.car_id === car_id
        );
        if (carIndex !== -1) {
          state.current[carIndex].status = newStatus;
        }
      })
      .addCase(changeCarStatusCRM.rejected, handleRejected),
});

export const { updateDates } = crmSlice.actions;



export default crmSlice.reducer;
