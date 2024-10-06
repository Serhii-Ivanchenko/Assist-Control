import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState.js";
import {
  getAllCars,
  getCarsByDate,
  getCarsByMonth,
  getCurrentCars,
} from "./operations.js";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const carsSlice = createSlice({
  name: "cars",
  initialState: initialState.cars,
  reducers: {
    changeActualDate: (state, action) => {
      state.date = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getAllCars.pending, handlePending)
      .addCase(getAllCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.all = action.payload;
      })
      .addCase(getAllCars.rejected, handleRejected)
      .addCase(getCurrentCars.pending, handlePending)
      .addCase(getCurrentCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.current = action.payload;
      })
      .addCase(getCurrentCars.rejected, handleRejected)
      .addCase(getCarsByDate.pending, handlePending)
      .addCase(getCarsByDate.fulfilled, (state, action) => {
        state.isLoading = false;
        //   state.date = action.payload.date;
        state.day = action.payload;
      })
      .addCase(getCarsByDate.rejected, handleRejected)
      .addCase(getCarsByMonth.pending, handlePending)
      .addCase(getCarsByMonth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.month = action.payload;
      })
      .addCase(getCarsByMonth.rejected, handleRejected),
});

export const { changeActualDate } = carsSlice.actions;
export default carsSlice.reducer;
