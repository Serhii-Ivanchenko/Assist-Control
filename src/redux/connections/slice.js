import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState.js";
import { getConnectionsList, getStats } from "./operations.js";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const connectionsSlice = createSlice({
  name: "connections",
  initialState: initialState.connections,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getStats.pending, handlePending)
      .addCase(getStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(getStats.rejected, handleRejected)
      .addCase(getConnectionsList.pending, handlePending)
      .addCase(getConnectionsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.connectionsList = action.payload.items;
      })
      .addCase(getConnectionsList.rejected, handleRejected),
});

export default connectionsSlice.reducer;
