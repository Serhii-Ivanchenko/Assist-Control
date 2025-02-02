import { createSlice } from "@reduxjs/toolkit";

const visibilitySlice = createSlice({
  name: "visibility",
  initialState: {
    visibilityInvoices: {
      diagnostics: true,
      agreed: true,
      reserved: true,
      received: true,
      soldOut: true,
      returned: true,
      moved: true,
      revaluation: true,
      inventory: true,
      writeOff: true,
    },
    visibilityArchive: {
      photo: true,
      carNum: true,
      time: true,
      name: true,
      status: true,
      reasonRegistration : true,
      reasonArchived : true,
    },
    visibilityCar: {
      prePayment: true,
      name: true,
      rating: true,
      carNum: true,
      carModelYear: true,
      vin: true,
      mileage: true,
      time: true,
      photo: true,
      totalPrice: true,
      phoneNumber: true,
      
    },
    visibilityCarRecomendations: {
      name: true,
      phoneNumber: true,
      carModelYear: true,
      timeForTO: true,
      rating: true,
      photo: true,
      carNum: true,
      mileage: true,
      KP: true,
      totalPrice: true,
    },
    visibilityRecords: {
      name: true,
      rating: true,
      carNum: true,
      carModelYear: true,
      vin: true,
      mileage: true,
      time: true,
      photo: true,
      totalPrice: true,
      prePayment: true,
      phoneNumber: true,
    },
    visibilitySuppliers: {
      date: true,
      quantity: true,
      article: true,
      brand: true,
      nomenclature: true,
      purchasePrice: true,
      purchaseAmount: true,
      saleAmount: true,
      profit: true,
      percent: true,
    },
    visibilityClientsInWork: {
      photo: true,
      appeal: true,
      diagnostics: true,
      KP: true,
      prePayment: true,
      order: true,
      provider: true,
      repair: true,
      totalAmount: true,
    },
    visibilityAllClients: {
      rating: true,
      appeal: true,
      repair: true,
      averageCheck: true,
      paydesk: true,
      workPayment: true,
      salaryMechanics: true,
      spareParts: true,
      markUp: true,
      salaryManager: true,
      salaryAdmin: true,
      coefficient: true,
      NG: true,
      profit: true,
      percent: true,
    },
  },
  reducers: {
    toggleVisibilityInvoices: (state, action) => {
      const { key } = action.payload;
      state.visibilityInvoices[key] = !state.visibilityInvoices[key];
    },
    toggleVisibilityCar: (state, action) => {
      const { key } = action.payload;
      state.visibilityCar[key] = !state.visibilityCar[key];
    },
    toggleVisibilityRecords: (state, action) => {
      const { key } = action.payload;
      state.visibilityRecords[key] = !state.visibilityRecords[key];
    },
    toggleVisibilitySuppliers: (state, action) => {
      const { key } = action.payload;
      state.visibilitySuppliers[key] = !state.visibilitySuppliers[key];
    },
    toggleVisibilityClientsInWork: (state, action) => {
      const { key } = action.payload;
      state.visibilityClientsInWork[key] = !state.visibilityClientsInWork[key];
    },
    toggleVisibilityAllClients: (state, action) => {
      const { key } = action.payload;
      state.visibilityAllClients[key] = !state.visibilityAllClients[key];
    },
    toggleVisibilityArchive: (state, action) => {
      const { key } = action.payload;
      state.visibilityArchive[key] = !state.visibilityArchive[key];
    },
    toggleVisibilityRecomendations: (state, action) => {
      const { key } = action.payload;
      state.visibilityCarRecomendations[key] = !state.visibilityCarRecomendations[key];
    },
  },
});

export const {
  toggleVisibilityInvoices,
  toggleVisibilityCar,
  toggleVisibilityRecords,
  toggleVisibilitySuppliers,
  toggleVisibilityClientsInWork,
  toggleVisibilityAllClients,
  toggleVisibilityArchive,
  toggleVisibilityRecomendations
} = visibilitySlice.actions;

export default visibilitySlice.reducer;
