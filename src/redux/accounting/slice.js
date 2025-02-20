import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState.js";
import { getCommercialOfferData, getNodesAndParts } from "./operations.js";

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
      .addCase(getNodesAndParts.rejected, handleRejected)

      //! COMMERCIAL OFFER
      .addCase(getCommercialOfferData.pending, (state, action) => {
        state.isCOLoading = true;
        state.error = null;
      })
      .addCase(getCommercialOfferData.fulfilled, (state, action) => {
        state.isCOLoading = false;
        state.commercialOfferData = action.payload;
      })
      .addCase(getCommercialOfferData.rejected, handleRejected),
});

export default AccountingSlice.reducer;
