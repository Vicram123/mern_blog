import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "/src/redux/user/userSlice.js";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

// Combine your reducers (you can add more reducers later if necessary)
const rootReducer = combineReducers({
  user: userReducer,
});

// Persist config: you might want to change "key" if you have multiple persisted slices
const persistConfig = {
  key: "root", // You can change this to something more specific if needed
  storage,
  version: 1, // Versioning to help manage changes over time
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store, with optional Redux DevTools support
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // Disable serializableCheck if necessary
});

// Persistor instance for managing persistence behavior
export const persistor = persistStore(store);
