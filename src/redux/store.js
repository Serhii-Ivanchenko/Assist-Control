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
import crmReducer from './crm/slice.js'

const authPersistConfig = {
  key: "authSlice",
  storage,
  whitelist: ["apiKey"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const carsPersistConfig = {
  key: "carsSlice",
  storage,
  whitelist: ["visibility"],
};

const persistedCarsReducer = persistReducer(carsPersistConfig, carsReducer);

export const store = configureStore({
  reducer: {
    cars: persistedCarsReducer,
    auth: persistedAuthReducer,
    crm: crmReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
