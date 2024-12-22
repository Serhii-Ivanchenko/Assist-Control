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
            writeOff: true
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
            percent: true
          },
          visibilityClientsInWork: {
            photo: true,
            carModelYear: true,
            appeal: true,
            diagnostics: true,
            KP: true,
            prePayment: true,
            order: true,
            provider: true,
            repair: true,
            totaAmount: true,
            notification: true
          },
          visibilityAllClients: {
            photo: true,
            name: true,
            rating: true,
            appeal: true,
            repair: true,
            averageCheck: true,
            diagnostics: true,
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
      },
})

export const { toggleVisibilityInvoices, toggleVisibilitySuppliers,toggleVisibilityClientsInWork, toggleVisibilityAllClients } = visibilitySlice.actions;


export default visibilitySlice.reducer;
