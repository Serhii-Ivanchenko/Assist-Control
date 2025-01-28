import { configureStore } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import carsReducer from "./cars/slice";
import authReducer from "./auth/slice";
import crmReducer from "./crm/slice.js";
import serviceReducer from "./service/slice.js";
import settingsReducer from "./settings/slice.js";
import warehouseReducer from "./warehouse/slice.js";
import visibilityReducer from "./visibility/slice.js";
import clientsReducer from "./client/slice.js";
import archiveReducer from "./archive/slice.js";
import chatReducer from "./chat/slice.js";
import connectionsReducer from "./connections/slice.js";

const authPersistConfig = {
  key: "authSlice",
  storage,
  whitelist: ["apiKey"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const visibilityPersistConfig = {
  key: "visibilitySlice",
  storage,
  whitelist: [
    "visibilityInvoices",
    "visibilitySuppliers",
    "visibilityClientsInWork",
    "visibilityAllClients",
    "visibilityCar",
    "visibilityRecords",
  ],
};

const persistedVisibilityReducer = persistReducer(
  visibilityPersistConfig,
  visibilityReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    cars: carsReducer,
    crm: crmReducer,
    service: serviceReducer,
    settings: settingsReducer,
    warehouse: warehouseReducer,
    visibility: persistedVisibilityReducer,
    clients: clientsReducer,
    archive: archiveReducer,
    chat: chatReducer,
    connections: connectionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
