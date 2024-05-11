import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth.slice"
import productSlice from "./slices/product.slice";
import cartSlice from "./slices/cart.slice";
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux"; 
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist'
import filterSlice from "./slices/filter.slice";
import orderSlice from "./slices/order.slice";

const reducers = combineReducers({
  auth: authSlice,
  product: productSlice,
  cart : cartSlice,
  filter: filterSlice,
  order: orderSlice
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['product', 'auth', 'cart', 'order']
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },})
});


