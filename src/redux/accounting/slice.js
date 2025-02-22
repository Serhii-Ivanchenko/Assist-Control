import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState.js";
import {
  createCommercialOffer,
  createDiagnostic,
  getClientsInWork,
  getCommercialOffer,
  getCommercialOfferData,
  getDiagnostic,
  getNodesAndParts,
} from "./operations.js";

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
      // ! Clients in work list
      .addCase(getClientsInWork.pending, handlePending)
      .addCase(getClientsInWork.fulfilled, (state, action) => {
        state.isLoading = false;
        state.clientsList = action.payload.cars;
      })
      .addCase(getClientsInWork.rejected, handleRejected)

      //! DIAGNOSTICS
      .addCase(getNodesAndParts.pending, handlePending)
      .addCase(getNodesAndParts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.nodesAndPartsForDiagnostics = action.payload;
      })
      .addCase(getNodesAndParts.rejected, handleRejected)

      .addCase(getDiagnostic.pending, (state, action) => {
        state.isDiagLoading = true;
        state.error = null;
      })
      .addCase(getDiagnostic.fulfilled, (state, action) => {
        state.isDiagLoading = false;
        state.diagnostic = action.payload;
      })
      .addCase(getDiagnostic.rejected, (state, action) => {
        state.isDiagLoading = false;
        state.error = action.payload;
      })

      .addCase(createDiagnostic.pending, handlePending)
      .addCase(createDiagnostic.fulfilled, (state, action) => {
        state.isDiagLoading = false;
        state.diagnosticId = action.payload.diagnostic_id;
      })
      .addCase(createDiagnostic.rejected, handleRejected)

      //! COMMERCIAL OFFER
      .addCase(getCommercialOfferData.pending, (state, action) => {
        state.isCOLoading = true;
        state.error = null;
      })
      .addCase(getCommercialOfferData.fulfilled, (state, action) => {
        state.isCOLoading = false;
        state.commercialOfferData = action.payload;
      })
      .addCase(getCommercialOfferData.rejected, (state, action) => {
        state.isCOLoading = false;
        state.error = action.payload;
      })

      .addCase(createCommercialOffer.pending, handlePending)
      .addCase(createCommercialOffer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.commercialOfferId = action.payload.commercial_id;
      })
      .addCase(createCommercialOffer.rejected, handleRejected)

      .addCase(getCommercialOffer.pending, (state, action) => {
        state.isCOLoading = true;
        state.error = null;
      })
      .addCase(getCommercialOffer.fulfilled, (state, action) => {
        state.isCOLoading = false;
        state.commercialOffer = action.payload;
      })
      .addCase(getCommercialOffer.rejected, (state, action) => {
        state.isCOLoading = false;
        state.error = action.payload;
      }),
});

export default AccountingSlice.reducer;
