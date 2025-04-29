import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/products/productSlice";
import sessionReducer from "./features/session/sessionSlice";
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

const sessionPersistConfig = {
  key: "session",
  storage,
  version: 1,
  whitelist: ["token", "user", "isAuthenticated"],
};

const persistedSessionReducer = persistReducer(sessionPersistConfig,sessionReducer);


export const store = configureStore({
  reducer: {
    products: productReducer,
    session: persistedSessionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);