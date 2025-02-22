export const selectCategories = (state) =>
  state.accounting.nodesAndPartsForDiagnostics;

export const selectCommercialOfferData = (state) =>
  state.accounting.commercialOfferData;

export const selectCommercialOffer = (state) =>
  state.accounting.commercialOffer;

export const selectCOLoading = (state) => state.accounting.isCOLoading;

export const selectDiagLoading = (state) => state.accounting.isDiagLoading;

export const selectCommercialOfferId = (state) =>
  state.accounting.commercialOfferId;

export const selectDiagnostic = (state) => state.accounting.diagnostic