export const selectCategories = (state) =>
  state.accounting.nodesAndPartsForDiagnostics;

export const selectCommercialOfferData = (state) =>
  state.accounting.commercialOfferData;

export const selectCOLoading = (state) => state.accounting.isCOLoading;
