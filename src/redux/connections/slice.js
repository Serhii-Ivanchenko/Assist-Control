import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState.js";
import {
  getConnectionsList,
  getProblematicContacts,
  getStats,
} from "./operations.js";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;

  state.error = action.payload || "Error";
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
        const { items, ...paginationData } = action.payload;
        state.connectionsList = items;
        state.connectionsListPaginationData = paginationData;
      })
      .addCase(getConnectionsList.rejected, handleRejected)

      .addCase(getProblematicContacts.pending, handlePending)
      .addCase(getProblematicContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.problematicContacts = action.payload;
      })
      .addCase(getProblematicContacts.rejected, handleRejected),
});

export default connectionsSlice.reducer;
