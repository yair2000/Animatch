// eslint-disable-next-line no-unused-vars
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import { authAPI } from "../redux/services/authApi";
import { productAPI } from "../redux/services/productApi";
import { userAPI } from "../redux/services/userApi";
import { orderAPI } from "../redux/services/orderApi";

import cartReducer from "../redux/features/cartSlice";
import themeReducer from "../redux/features/themeSlice";
import userReducer from "../redux/features/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    cart: cartReducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [orderAPI.reducerPath]: orderAPI.reducer,
  },
  middleware: (getDefaultMiddleware)=>
  getDefaultMiddleware().concat([
    productAPI.middleware,
    authAPI.middleware,
    userAPI.middleware,
    orderAPI.middleware,
  ])
})