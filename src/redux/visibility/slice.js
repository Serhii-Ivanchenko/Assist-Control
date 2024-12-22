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
            status: true,
            info: true,
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
            paymentBtn: true,
            phoneNumber: true,
            status: true,
            info: true,
            createBtn: true,
            archive: true,
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
      },
})

export const { toggleVisibilityInvoices, toggleVisibilityCar, toggleVisibilityRecords, toggleVisibilitySuppliers,toggleVisibilityClientsInWork, toggleVisibilityAllClients } = visibilitySlice.actions;


export default visibilitySlice.reducer;
