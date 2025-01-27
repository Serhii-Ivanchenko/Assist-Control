import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState.js";
import { createService, getAllServices, updateService } from "./operations.js";

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
  reducers: {
    setSelectedServiceInSettingsId: (state, action) => {
      state.selectedServiceInSettingsId = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getAllServices.pending, handlePending)
      .addCase(getAllServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.services = action.payload.companies;
        // state.selectedServiceInSettingsId = action.payload.companies[0].id;
      })
      .addCase(getAllServices.rejected, handleRejected)
      // .addCase(getServiceData.pending, handlePending)
      // .addCase(getServiceData.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.data = action.payload;
      // })
      // .addCase(getServiceData.rejected, handleRejected)
      .addCase(createService.pending, handlePending)
      .addCase(createService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.services.push(action.meta.arg);
      })
      .addCase(createService.rejected, handleRejected)
      .addCase(updateService.pending, handlePending)
      .addCase(updateService.fulfilled, (state, action) => {
        state.isLoading = false;
        const serviceToEditIndex = state.services.findIndex(
          (service) => service.id === action.payload.data.id
        );
        state.services[serviceToEditIndex] = {
          ...state.services[serviceToEditIndex], // Залишаємо старі дані
          ...action.payload.data, // Додаємо дані, які відправляли
        };
      })
      .addCase(updateService.rejected, handleRejected),
});

export const { setSelectedServiceInSettingsId } = serviceSlice.actions;

export default serviceSlice.reducer;
