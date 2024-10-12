export const selectCurrentCars = (state) => state.cars.current;

export const selectDayCars = (state) => state.cars.day;

export const selectMonthCars = (state) => state.cars.month;

export const selectAllCars = (state) => state.cars.all;

export const selectLoading = (state) => state.cars.isLoading;

export const selectError = (state) => state.cars.error;

export const selectDate = (state) => state.cars.date;

export const selectPercent = (state) => state.cars.loadPercent;

export const selectCarsForHour = (state) => state.cars.forHour;

