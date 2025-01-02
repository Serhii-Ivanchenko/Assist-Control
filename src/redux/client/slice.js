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
  reducers: {},
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

export default clientsSlice.reducer;
