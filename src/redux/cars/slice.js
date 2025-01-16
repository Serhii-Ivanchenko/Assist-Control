import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState.js";
import {
  getAllCars,
  getCarsByDate,
  getCarsByMonth,
  getCurrentCars,
  getCarsForHour,
  getCalendarByMonth,
  getNewCarsRange,
  getPercentForHour,
  changeCarStatus,
  getPeriodCars,
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
  initialState: {
    ...initialState.cars,
    },
  reducers: {
    changeActualDate: (state, action) => {
      state.date = action.payload;
      // state.loadPercent = action.payload.percent;
    },
    changeActualPercent: (state, action) => {
      state.loadPercent = action.payload;
      // state.loadPercent = action.payload.percent;
    },
    setQueryMonth: (state, action) => {
      state.queryMonth = action.payload;
    }
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
        state.current = action.payload.cars;
      })
      .addCase(getCurrentCars.rejected, handleRejected)
      .addCase(getCarsByDate.pending, (state) => {
        state.isLoadingCarsByDay = true;
        state.error = null;
      })
      .addCase(getCarsByDate.fulfilled, (state, action) => {
        state.isLoadingCarsByDay = false;
        //   state.date = action.payload.date;
        state.day = action.payload.cars;
      })
      .addCase(getCarsByDate.rejected, (state, action) => {
        state.isLoadingCarsByDay = false;
        state.error = action.payload;
      })
      .addCase(getCarsByMonth.pending, handlePending)
      .addCase(getCarsByMonth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.month = action.payload.cars;
      })
      .addCase(getCarsByMonth.rejected, handleRejected)
      .addCase(getCarsForHour.pending, handlePending)
      .addCase(getCarsForHour.fulfilled, (state, action) => {
        state.isLoading = false;
        //   state.date = action.payload.date;
        state.forHours = action.payload.hourly_car_count;
        state.workHours = action.payload.working_hours;
      })
      .addCase(getCarsForHour.rejected, handleRejected)
      .addCase(getPercentForHour.pending, handlePending)
      .addCase(getPercentForHour.fulfilled, (state, action) => {
        state.isLoading = false;
        state.loadPercent = action.payload;
      })
      .addCase(getPercentForHour.rejected, handleRejected)
      .addCase(getCalendarByMonth.pending, (state) => {
        state.isLoadingForCalendar = true;
        state.error = null;
      })
      .addCase(getCalendarByMonth.fulfilled, (state, action) => {
        state.isLoadingForCalendar = false;
        state.monthlyLoad = action.payload;
      })
      .addCase(getCalendarByMonth.rejected, (state, action) => {
        state.isLoadingForCalendar = false;
        state.error = action.payload;
      })
      .addCase(getNewCarsRange.pending, handlePending)
      .addCase(getNewCarsRange.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newCars = action.payload;
      })
      .addCase(getNewCarsRange.rejected, handleRejected)
      .addCase(changeCarStatus.pending, handlePending)
      .addCase(changeCarStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const { car_id, newStatus } = action.payload;
        const carIndex = state.current.findIndex(
          (car) => car.car_id === car_id
        );
        if (carIndex !== -1) {
          state.current[carIndex].status = newStatus;
        }
      })
      .addCase(changeCarStatus.rejected, handleRejected)
      .addCase(getPeriodCars.pending, handlePending)
      .addCase(getPeriodCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.periodCars = action.payload.cars;
      })
      .addCase(getPeriodCars.rejected, handleRejected),
});

export const { changeActualDate } = carsSlice.actions;
export const { changeActualPercent } = carsSlice.actions;
export const { setQueryMonth } = carsSlice.actions;

export default carsSlice.reducer;
