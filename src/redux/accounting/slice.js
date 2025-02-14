import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState.js";
import { getNodesAndParts } from "./operations.js";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const AccountingSlice = createSlice({
  name: "accounting",
  initialState: initialState.accounting,
  reducers: {},
  extraReducers: (builder) =>
    builder
      //! DIAGNOSTICS
      .addCase(getNodesAndParts.pending, handlePending)
      .addCase(getNodesAndParts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.nodesAndPartsForDiagnostics = action.payload;
      })
      .addCase(getNodesAndParts.rejected, handleRejected),
});

export default AccountingSlice.reducer;
