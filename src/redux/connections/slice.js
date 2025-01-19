import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState.js";
import {
  getConnectionsList,
  getConnectionsStats,
  updateConnectionStatus,
} from "./operations.js";

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
      .addCase(getConnectionsStats.pending, handlePending)
      .addCase(getConnectionsStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(getConnectionsStats.rejected, handleRejected)

      .addCase(getConnectionsList.pending, handlePending)
      .addCase(getConnectionsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.connectionsList = action.payload;
      })
      .addCase(getConnectionsList.rejected, handleRejected)

      .addCase(updateConnectionStatus.pending, handlePending)
      .addCase(updateConnectionStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const connectionToEditIndex = state.archiveData.findIndex(
          (connection) =>
            connection.reference_id === action.payload.reference_id
        );

        if (connectionToEditIndex !== -1) {
          state.connectionsList[connectionToEditIndex].status =
            action.meta.arg.status;
        }
      })
      .addCase(updateConnectionStatus.rejected, handleRejected),
});

export default connectionsSlice.reducer;
