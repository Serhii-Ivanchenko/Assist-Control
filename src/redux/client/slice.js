import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState.js";
import { getClientInfo } from "./operations.js";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const clientsSlice = createSlice({
  name: "clients",
  initialState: initialState.clients,
  reducers: {
    clearClientInfo:(state) =>{
        state.clientInfo.client = null;
        state.clientInfo.car = null;
      state.clientInfo.service_history = [];
      state.error = null; 
      state.loading = false; 
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(getClientInfo.pending, handlePending)
      .addCase(getClientInfo.fulfilled, (state, action) => {
        state.isLoading = false;

        state.clientInfo.client = action.payload.client;
        state.clientInfo.car = action.payload.car;
        state.clientInfo.service_history = action.payload.service_history;
      })
      .addCase(getClientInfo.rejected, handleRejected),
});

export const { clearClientInfo } = clientsSlice.actions;
export default clientsSlice.reducer;
